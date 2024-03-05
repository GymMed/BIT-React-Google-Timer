import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Button from "../General/Button";
import { STATUSES_ENUM } from "../../utils/statusesManager";
import Main from "./Pages/Main/Main";
import Stopwatch from "./Pages/Stopwatch/Stopwatch";
import HourglassIcon from "../../assets/hourglass.svg?react";
import StopwatchIcon from "../../assets/stopwatch.svg?react";
import Body from "./Body/Body";
import { PAGES_ENUM } from "../../utils/pagesManager";
import {
    capStopwatchObjectToValidTime,
    getMinutesAsTimestamp,
    getSecondsAsTimestamp,
} from "../../utils/timeManager";

function Timer() {
    const [timerFrom, setTimerFrom] = useState(
        getMinutesAsTimestamp(5) + getSecondsAsTimestamp(1)
    );
    const [timerStart, setTimerStart] = useState(timerFrom);
    const [timerResult, setTimerResult] = useState(getMinutesAsTimestamp(5));
    const [stopwatchTime, setStopwatchTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        millisecondsTens: 0,
    });

    const [navLinks, setNavLinks] = useState([
        {
            icon: <HourglassIcon />,
            text: "TIMER",
            active: true,
            started: false,
            pageType: PAGES_ENUM.Timer,
            // ...getNewDynamicLinkData(PAGES_ENUM.Timer),
        },
        {
            icon: <StopwatchIcon />,
            text: "STOPWATCH",
            active: false,
            started: false,
            pageType: PAGES_ENUM.Stopwatch,
            // ...getNewDynamicLinkData(PAGES_ENUM.Stopwatch),
        },
    ]);

    const handleTimerStart = useCallback(() => {
        const timestampToReach = new Date().getTime() + timerStart;

        const intervalId = setInterval(() => {
            const currentDateTimestamp = new Date().getTime();

            if (timestampToReach > currentDateTimestamp) {
                setTimerResult(timestampToReach - currentDateTimestamp);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        timerIntervalRef.current = intervalId;
    }, [timerStart]);

    const handleTimerStop = useCallback(() => {
        clearInterval(timerIntervalRef.current);
        setTimerStart(timerResult);
    }, [timerResult]);

    const handleOnRestartTimer = useCallback(() => {
        const currentLink = getActiveLink();

        if (!currentLink) return;

        if (currentLink.started) {
            handleOnClickLinkStart();
        }

        setTimerStart(timerFrom);
        setTimerResult(timerFrom - 1000);
    }, [timerFrom]);

    const getNewDynamicLinkData = useCallback(
        (pageEnum) => {
            switch (pageEnum) {
                case PAGES_ENUM.Timer: {
                    return {
                        onStart: handleTimerStart,
                        onStop: handleTimerStop,
                        onRestart: handleOnRestartTimer,
                        content: (
                            <Main
                                activeLink={getActiveLink()}
                                runningTime={timerResult}
                                setRunningTime={setTimerResult}
                                setTimerFrom={setTimerFrom}
                                stopTimer={handleOnClickTimer}
                            />
                        ),
                    };
                }
                case PAGES_ENUM.Stopwatch:
                default: {
                    return {
                        onStart: handleStopwatchStart,
                        onStop: handleStopwatchStop,
                        onRestart: handleOnRestartStopwatch,
                        content: <Stopwatch runningTime={stopwatchTime} />,
                    };
                }
            }
        },
        [
            timerResult,
            stopwatchTime,
            handleTimerStart,
            handleTimerStop,
            handleOnRestartTimer,
            getActiveLink,
        ]
    );

    const previousNavLinksRef = useRef(0);
    const stopwatchIntervalRef = useRef(0);
    const timerIntervalRef = useRef(0);

    useEffect(() => {
        if (previousNavLinksRef.current) {
            navLinks.forEach((link, key) => {
                if (link.started !== previousNavLinksRef.current[key].started) {
                    if (link.started) link.onStart();
                    else link.onStop();
                }
            });
        }

        previousNavLinksRef.current = navLinks;
    }, [navLinks]);

    useEffect(() => {
        setNavLinks(
            navLinks.map((link) => {
                return { ...link, ...getNewDynamicLinkData(link.pageType) };
            })
        );
    }, [stopwatchTime, timerResult]);

    useEffect(() => {
        setTimerStart(timerFrom);
    }, [timerFrom]);

    const handleOnClickLinkStart = useCallback(() => {
        setNavLinks(
            navLinks.map((link) => {
                if (
                    link &&
                    link.active &&
                    Object.prototype.hasOwnProperty.call(link, "started")
                ) {
                    return {
                        ...link,
                        started: !link.started,
                        ...getNewDynamicLinkData(link.pageType),
                    };
                }
                return {
                    ...link,
                    ...getNewDynamicLinkData(link.pageType),
                };
            })
        );
    }, [navLinks, getNewDynamicLinkData]);

    function handleStopwatchStart() {
        const intervalId = setInterval(() => {
            setStopwatchTime((previousStopwatchTime) => {
                let newMillisecondsTens =
                    previousStopwatchTime.millisecondsTens + 1;

                let newStopwatchTime = capStopwatchObjectToValidTime({
                    ...previousStopwatchTime,
                    millisecondsTens: newMillisecondsTens,
                });

                return {
                    ...newStopwatchTime,
                };
            });
        }, 10);

        stopwatchIntervalRef.current = intervalId;
    }

    function handleStopwatchStop() {
        clearInterval(stopwatchIntervalRef.current);
    }

    function getActiveLink() {
        const currentLink = navLinks.find((link) => {
            if (link && link.active) {
                return link;
            }
        });

        return currentLink;
    }

    function getActivateButtonText() {
        const currentLink = getActiveLink();

        if (!currentLink) return "ERROR";

        if (currentLink.started) return "STOP";
        return "START";
    }

    function getCurrentContent() {
        const currentLink = getActiveLink();
        const errorMessage =
            "We encountered an error. Try restarting page or come back later, have a good day!";

        if (!currentLink) return errorMessage;

        if (!currentLink.content) return errorMessage;
        return currentLink.content;
    }

    function handleOnRestartStopwatch() {
        const currentLink = getActiveLink();

        if (!currentLink) return;

        if (currentLink.started) {
            handleOnClickLinkStart();
        }
        // handleStopwatchStop();
        setStopwatchTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
            millisecondsTens: 0,
        });
    }

    function handleOnClickTimer() {
        const currentLink = getActiveLink();

        if (!currentLink) return;

        if (currentLink.started) {
            handleOnClickLinkStart();
            return;
        }
    }

    function handleOnClickLinkRestart() {
        setNavLinks((previousNavLink) =>
            previousNavLink.map((link) => {
                if (
                    link &&
                    link.active &&
                    Object.prototype.hasOwnProperty.call(link, "onRestart")
                ) {
                    link.onRestart();
                    return {
                        ...link,
                        ...getNewDynamicLinkData(link.pageType),
                    };
                }
                return {
                    ...link,
                    ...getNewDynamicLinkData(link.pageType),
                };
            })
        );
    }

    return (
        <div className="rounded-xl border border-gray-300 shadow">
            <Header
                navLinks={navLinks}
                setNavLinks={setNavLinks}
                getDynamicInfo={getNewDynamicLinkData}
            />
            <Body>{getCurrentContent()}</Body>
            <Footer activeLink={getActiveLink()} runningTime={timerStart}>
                <Button
                    text={getActivateButtonText()}
                    status={STATUSES_ENUM.Information}
                    onClick={() => {
                        handleOnClickLinkStart();
                    }}
                />
                <Button
                    text="RESET"
                    status={STATUSES_ENUM.Transparent}
                    onClick={() => {
                        handleOnClickLinkRestart();
                    }}
                />
            </Footer>
        </div>
    );
}

export default Timer;

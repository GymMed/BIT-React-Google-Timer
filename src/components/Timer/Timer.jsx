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

// used for dynamic data, needed for updating useState
// variable that depends on other useState
const PAGES_ENUM = {
    Timer: 0,
    Stopwatch: 1,
};

function Timer() {
    const [timerFrom, setTimerFrom] = useState(5 * 60 * 1000 + 1000);
    const [timerStart, setTimerStart] = useState(timerFrom);
    const [timerResult, setTimerResult] = useState(5 * 60 * 1000);
    const [stopwatchTime, setStopwatchTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        millisecondsTens: 0,
    });

    const handleTimerStart = useCallback(() => {
        const timestampToReach = new Date().getTime() + timerStart;

        const intervalId = setInterval(() => {
            const currentDateTimestamp = new Date().getTime();

            if (timestampToReach > currentDateTimestamp) {
                setTimerResult(timestampToReach - currentDateTimestamp);
            } else {
                console.log("bubu");
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
                                timerFrom={timerFrom}
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
            timerFrom,
            stopwatchTime,
            handleTimerStart,
            handleTimerStop,
            handleOnRestartTimer,
        ]
    );

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
        console.log(
            "nu ka tu cia",
            navLinks,
            getNewDynamicLinkData(PAGES_ENUM.Timer)
        );
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
                    console.log("puka", getNewDynamicLinkData(link.pageType));
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
                let newSeconds = previousStopwatchTime.seconds;
                let newMinutes = previousStopwatchTime.minutes;
                let newHours = previousStopwatchTime.hours;

                if (newMillisecondsTens > 99) {
                    newMillisecondsTens = 0;
                    newSeconds += 1;

                    if (newSeconds > 59) {
                        newSeconds = 0;
                        newMinutes += 1;

                        if (newMinutes > 59) {
                            newMinutes = 0;
                            newHours += 1;
                        }
                    }
                }

                return {
                    ...previousStopwatchTime,
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds,
                    millisecondsTens: newMillisecondsTens,
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
        console.log("offed timer", currentLink.started, currentLink);
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
            <Footer>
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

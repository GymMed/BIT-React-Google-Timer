import PropTypes from "prop-types";
import DoubleDigits from "../../../General/DoubleDigits";
import { useEffect, useRef, useState } from "react";
import DoubleDigitsInputView from "../../../General/DoubleDigitsInputView";
import {
    capTimeObjectToValidTime,
    getSecondsAsTimestamp,
    getTimeObjectAsTimestamp,
} from "../../../../utils/timeManager";

const TIMER_MODES_ENUM = {
    Show: 0,
    Edit: 1,
    Length: 2,
};

function showTime(timeObject) {
    return (
        <div className="flex gap-5 border-b border-gray-300 px-3 pt-1 pb-5">
            {timeObject.hours > 0 ? (
                <DoubleDigits digits={timeObject.hours} postfix={"h"} />
            ) : (
                ""
            )}
            {timeObject.hours > 0 || timeObject.minutes > 0 ? (
                <DoubleDigits digits={timeObject.minutes} postfix={"m"} />
            ) : (
                ""
            )}
            {timeObject.hours > 0 ||
            timeObject.minutes > 0 ||
            timeObject.seconds > 0 ? (
                <DoubleDigits digits={timeObject.seconds} postfix={"s"} />
            ) : (
                ""
            )}
        </div>
    );
}

function showEdit(timeObject, usedOriginal) {
    console.log(
        "used",
        usedOriginal,
        !usedOriginal && (timeObject.hours > 0 || timeObject.minutes > 9)
    );
    return (
        <div className="flex gap-5 border-b-2 border-blue-500 px-3 pt-1 pb-5">
            <DoubleDigitsInputView
                digits={timeObject.hours}
                postfix={"h"}
                isForcedInActive={usedOriginal}
                isActive={timeObject.hours > 9}
            />
            <DoubleDigitsInputView
                digits={timeObject.minutes}
                postfix={"m"}
                isForcedInActive={usedOriginal}
                isActive={timeObject.hours > 0 || timeObject.minutes > 9}
            />
            <DoubleDigitsInputView
                digits={timeObject.seconds}
                postfix={"s"}
                isForcedInActive={usedOriginal}
                isActive={
                    timeObject.hours > 0 ||
                    timeObject.minutes > 0 ||
                    timeObject.seconds > 9
                }
            />
        </div>
    );
}

export default function TimeShower({ timeObject, setTimerFrom }) {
    const [mode, setMode] = useState(TIMER_MODES_ENUM.Show);
    const [savedTimeObject, setSavedTimeObject] = useState(timeObject);
    const [usedOriginalTimeObject, setUsedOriginalTimeObject] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        setSavedTimeObject(timeObject);
    }, [timeObject]);

    function getTemplateBaseOnMode(mode, timeObject) {
        switch (mode) {
            case TIMER_MODES_ENUM.Edit: {
                return showEdit(timeObject, usedOriginalTimeObject);
            }
            case TIMER_MODES_ENUM.Show:
            default: {
                return showTime(timeObject);
            }
        }
    }

    function handlerClickComponent() {
        if (mode >= TIMER_MODES_ENUM.Length - 1) {
            setMode(TIMER_MODES_ENUM.Show);
        } else {
            setMode(mode + 1);
            inputRef.current.focus();
            setUsedOriginalTimeObject(true);
        }
    }

    function handleOnInput(event) {
        const value = event.target.value.slice(-6).padStart(6, "0");

        const seconds = value.substring(4, 6);
        const minutes = value.substring(2, 4);
        const hours = value.substring(0, 2);

        setUsedOriginalTimeObject(false);
        setSavedTimeObject({
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
        });
    }

    function handleOnBlur(event) {
        if (mode !== TIMER_MODES_ENUM.Edit) return;

        const fixedTimeObject = capTimeObjectToValidTime(savedTimeObject);
        const newTime = getTimeObjectAsTimestamp(fixedTimeObject);
        setSavedTimeObject(fixedTimeObject);
        //add 1 second for interval delay
        setTimerFrom(newTime + getSecondsAsTimestamp(1));
        event.target.value = "";
        setMode(TIMER_MODES_ENUM.Show);
    }

    return (
        <div onClick={handlerClickComponent} className="relative">
            {getTemplateBaseOnMode(mode, savedTimeObject)}
            <input
                ref={inputRef}
                className="absolute opacity-0 text-right w-full h-full -z-10 p-2 border bg-pink-200 block rounded pt-1 pb-5 px-3 text-6xl"
                type="tel"
                name="time"
                id="time"
                pattern="\d*"
                onInput={handleOnInput}
                onBlur={handleOnBlur}
            />
        </div>
    );
}

TimeShower.propTypes = {
    timeObject: PropTypes.object,
    setTimerFrom: PropTypes.func,
};

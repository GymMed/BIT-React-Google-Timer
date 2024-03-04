import PropTypes from "prop-types";
import DoubleDigits from "../../../General/DoubleDigits";
import { useRef, useState } from "react";
import DoubleDigitsInputView from "../../../General/DoubleDigitsInputView";

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

function showEdit(timeObject) {
    return (
        <div className="flex gap-5 border-b-2 border-blue-500 px-3 pt-1 pb-5">
            <DoubleDigitsInputView
                digits={timeObject.hours}
                postfix={"h"}
                isActive={timeObject.hours > 9}
            />
            <DoubleDigitsInputView
                digits={timeObject.minutes}
                postfix={"m"}
                isActive={timeObject.hours > 0 || timeObject.minutes > 9}
            />
            <DoubleDigitsInputView
                digits={timeObject.seconds}
                postfix={"s"}
                isActive={
                    timeObject.hours > 0 ||
                    timeObject.minutes > 0 ||
                    timeObject.seconds > 9
                }
            />
        </div>
    );
}

export default function TimeShower({
    timeObject,
    timerHasStarted,
    setTimerFrom,
}) {
    const [mode, setMode] = useState(
        timerHasStarted ? TIMER_MODES_ENUM.Show : TIMER_MODES_ENUM.Edit
    );
    const inputRef = useRef(null);

    function getTemplateBaseOnMode(mode) {
        // if (timerHasStarted) {
        //     setMode(TIMER_MODES_ENUM.Show);
        //     return showTime(timeObject);
        // }

        switch (mode) {
            case TIMER_MODES_ENUM.Edit: {
                return showEdit(timeObject);
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
        }
    }

    function handleOnInput(event) {
        // if (event.target.value.length > 6)
        //     event.target.value = event.target.value.slice(-6);
        //     event.target.value = event.target.value.substring(0, 6);
        const value = event.target.value.slice(-6);

        // const newDateObject = {hours: }
        console.log(value);

        // setTimerFrom();
    }

    return (
        <div onClick={handlerClickComponent} className="relative">
            {getTemplateBaseOnMode(mode)}
            <input
                ref={inputRef}
                className="absolute text-right w-full h-full -z-10 p-2 border bg-pink-200 block rounded pt-1 pb-5 px-3 text-6xl"
                type="tel"
                name="time"
                id="time"
                pattern="\d*"
                onInput={handleOnInput}
            />
        </div>
    );
}

TimeShower.propTypes = {
    timeObject: PropTypes.object,
    timerHasStarted: PropTypes.bool,
    setTimerStart: PropTypes.func,
};

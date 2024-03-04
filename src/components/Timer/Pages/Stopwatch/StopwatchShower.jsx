import Proptypes from "prop-types";
import DoubleDigits from "../../../General/DoubleDigits";
import DoubleDigitsMini from "../../../General/DoubleDigitsMini";

export default function StopwatchShower({ stopwatchObject }) {
    return (
        <div className="flex items-end gap-4">
            {stopwatchObject.hours > 0 ? (
                <DoubleDigits digits={stopwatchObject.hours} postfix={"h"} />
            ) : (
                ""
            )}
            {stopwatchObject.minutes > 0 ? (
                <DoubleDigits digits={stopwatchObject.minutes} postfix={"m"} />
            ) : (
                ""
            )}
            <DoubleDigits
                digits={stopwatchObject.seconds}
                postfix={"s"}
                showSingleZero={
                    stopwatchObject.hours > 0 || stopwatchObject.minutes > 0
                        ? false
                        : true
                }
            />
            <DoubleDigitsMini digits={stopwatchObject.millisecondsTens} />
        </div>
    );
}

StopwatchShower.propTypes = {
    stopwatchObject: Proptypes.object,
};

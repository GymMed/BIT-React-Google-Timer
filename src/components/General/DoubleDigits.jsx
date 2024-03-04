import Proptypes from "prop-types";

export default function DoubleDigits({
    digits,
    postfix,
    showSingleZero = false,
}) {
    function getDigit() {
        if (digits === 0) {
            if (showSingleZero) {
                return "0";
            }
            return "00";
        }

        return digits;
    }

    return (
        <div className="min-w">
            <span className="text-6xl">{getDigit()}</span>
            <span className="text-3xl">{postfix}</span>
        </div>
    );
}

DoubleDigits.propTypes = {
    digits: Proptypes.number,
    postfix: Proptypes.string,
    showSingleZero: Proptypes.bool,
};

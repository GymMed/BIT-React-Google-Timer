import Proptypes from "prop-types";

export default function DoubleDigitsInputView({
    digits,
    postfix,
    isActive = false,
}) {
    function getActivityClasses(activity) {
        if (!activity) return "text-gray-300";
        return "";
    }

    const digitsAsString = digits.toString().padStart(2, "0");
    const firstDigitActivity = isActive || digits > 9;
    const secondDigitActivity = isActive || digits > 0;

    return (
        <div className="min-w">
            <span className="text-6xl">
                <span className={getActivityClasses(firstDigitActivity) + ""}>
                    {digits < 10 ? 0 : digitsAsString[0]}
                </span>
                <span className={getActivityClasses(secondDigitActivity) + ""}>
                    {digitsAsString[1]}
                </span>
            </span>
            <span
                className={
                    getActivityClasses(isActive || digits > 0) + " text-3xl"
                }
            >
                {postfix}
            </span>
        </div>
    );
}

DoubleDigitsInputView.propTypes = {
    digits: Proptypes.number,
    postfix: Proptypes.string,
    isActive: Proptypes.bool,
};

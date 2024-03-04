import PropTypes from "prop-types";
import { STATUSES_ENUM } from "../../utils/statusesManager";

function getColorsByStatus(status) {
    const standartClasses = "text-white bg-gradient-to-br border-transparent ";
    switch (status) {
        case STATUSES_ENUM.Success:
            return (
                standartClasses +
                "from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 focus:ring-green-600"
            );
        case STATUSES_ENUM.Error:
            return (
                standartClasses +
                "from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 focus:ring-red-600"
            );
        case STATUSES_ENUM.Warning:
            return (
                standartClasses +
                "from-yellow-500 to-yellow-700 hover:from-yellow-700 hover:to-yellow-900 focus:ring-yellow-600"
            );
        case STATUSES_ENUM.Information:
            return (
                standartClasses +
                "from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 focus:ring-blue-600"
            );
        case STATUSES_ENUM.Transparent:
            return "text-blue-500 bg-transparent border-gray-300 hover:border-0 hover:bg-gray-200 focus:ring-gray-300";
        default:
            return (
                standartClasses +
                "from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 focus:ring-green-600"
            );
    }
}

export default function Button({ text, onClick = () => {}, status }) {
    return (
        <button
            type="button"
            className={
                getColorsByStatus(status) +
                " tracking-wider border rounded-sm font-semibold text-xs focus:ring focus:ring-offset-2"
            }
            onClick={() => onClick()}
        >
            <div className="py-1.5 px-4 hover:scale-105">{text}</div>
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    status: PropTypes.number,
};

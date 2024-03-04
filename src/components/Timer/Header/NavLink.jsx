import PropTypes from "prop-types";

function NavLink({ icon, text, active, onClick }) {
    function getActivityClasses(active) {
        if (!active) {
            return "cursor-pointer text-gray-500 hover:text-black ";
        }
        return "text-blue-500 cursor-auto border-b-2 border-blue-500 ";
    }

    return (
        <div
            className={
                getActivityClasses(active) +
                "w-96 flex gap-1.5 items-center justify-center text-sm p-3"
            }
            onClick={onClick}
        >
            <div>{icon}</div>
            <div>{text}</div>
        </div>
    );
}

NavLink.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

export default NavLink;

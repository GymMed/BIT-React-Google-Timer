import PropTypes from "prop-types";

export default function Body({ children }) {
    return (
        <div className="flex border-t border-gray-300 justify-start items-center p-10">
            {children}
        </div>
    );
}

Body.propTypes = {
    children: PropTypes.node,
};

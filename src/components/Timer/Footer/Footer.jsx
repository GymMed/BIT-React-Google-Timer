import PropTypes from "prop-types";

function Footer({ children }) {
    return (
        <footer className="p-5 flex gap-5 border-t border-t-gray-300">
            {children}
        </footer>
    );
}

Footer.propTypes = {
    children: PropTypes.node,
};

export default Footer;

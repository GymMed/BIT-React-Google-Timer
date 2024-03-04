import PropTypes from "prop-types";
import NavLink from "./NavLink";

function Header({ navLinks, setNavLinks, getDynamicInfo }) {
    function onClickHandler(index) {
        if (navLinks[index]?.active) {
            return;
        }

        setNavLinks(
            navLinks.map((link, key) => {
                if (link.active) {
                    return {
                        ...link,
                        active: false,
                        ...getDynamicInfo(link.pageType),
                    };
                }

                if (key === index) {
                    return {
                        ...link,
                        active: true,
                        ...getDynamicInfo(link.pageType),
                    };
                }

                return { ...link, ...getDynamicInfo(link.pageType) };
            })
        );
    }

    return (
        <nav className="flex">
            {navLinks.map((link, index) => {
                return (
                    <NavLink
                        key={index}
                        icon={link.icon}
                        text={link.text}
                        active={link.active}
                        onClick={() => onClickHandler(index)}
                    />
                );
            })}
        </nav>
    );
}

Header.propTypes = {
    navLinks: PropTypes.array,
    setNavLinks: PropTypes.func,
    getDynamicInfo: PropTypes.func,
};

export default Header;

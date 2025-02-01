import header from "./styles/header.module.css";
import Logo from "./Logo";
import Buttons from "./Buttons";
function Header() {
    return (
        <div className={header.header}>
            <Logo />
            <ul className={header.navLinks}>
                <li className={header.navItem}>Home</li>
                <li className={header.navItem}>About Us</li>
                <li className={header.navItem}>Blogs</li>
                <li className={header.navItem}>Services</li>
            </ul>
            <Buttons text="Contact Us" />
        </div>
    );
}

export default Header;

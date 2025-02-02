import header from "./styles/header.module.css";
import Logo from "./Logo";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
function Header() {
    return (
        <div className={header.header}>
            <Link to="/">
                <Logo />
            </Link>
            <ul className={header.navLinks}>
                <li className={header.navItem}>
                    <Link to="/">Home</Link>
                </li>
                <li className={header.navItem}>
                    <Link to="/about">About Us</Link>
                </li>
                <li className={header.navItem}>
                    <Link to="/blogs">Blogs</Link>
                </li>
                <li className={header.navItem}>
                    <Link to="/services">Services</Link>
                </li>
            </ul>
            <Buttons text="Contact Us" />
        </div>
    );
}

export default Header;

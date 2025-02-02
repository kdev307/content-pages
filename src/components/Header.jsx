import header from "./styles/header.module.css";
import Logo from "./Logo";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { Close, Menu, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchFeatureCards } from "../contentful";

function Header() {
    const [services, setServices] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const getFeatureCards = async () => {
        try {
            const data = await fetchFeatureCards();
            if (!data) return;

            const { items } = data;
            const serviceNames = items.map((item) => item.fields.featureTitle);
            setServices(serviceNames);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    useEffect(() => {
        getFeatureCards();
    }, []);

    return (
        <div className={header.header}>
            <div className={header.mainNav}>
                <Link to="/">
                    <Logo />
                </Link>
                <nav
                    className={`${header.navLinks} ${
                        menuOpen ? header.active : ""
                    }`}
                >
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
                        <li
                            className={header.navItem}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <Link to="/services">Services</Link>
                            {showDropdown && (
                                <ul className={header.dropdown}>
                                    {services.map((service, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/services/${service
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`}
                                            >
                                                {service}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                    <Search style={{ fontSize: "2.4rem" }} />
                </nav>
            </div>
            <nav className={header.navBtn}>
                {menuOpen ? (
                    <Close
                        style={{ fontSize: "2.4rem" }}
                        className={header.btn}
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                ) : (
                    <Menu
                        style={{ fontSize: "2.4rem" }}
                        className={header.btn}
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                )}

                <Buttons text="Contact Us" />
            </nav>
        </div>
    );
}

export default Header;

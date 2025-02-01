import { Layers } from "@mui/icons-material";
import logo from "./styles/logo.module.css";

function Logo() {
    return (
        <div className={logo.container}>
            <Layers style={{ fontSize: "6rem", color: `var(--text-accent)` }} />
            <h1 className={logo.text}>TechStack</h1>
        </div>
    );
}

export default Logo;

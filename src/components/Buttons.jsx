import PropTypes from "prop-types";
import btn from "./styles/buttons.module.css";

function Buttons({ text, icon = null }) {
    return (
        <div className={btn.buttonContainer}>
            <button className={btn.button}>
                {text} {icon}
                {/* <span className={btn.overlay}></span> */}
            </button>
        </div>
    );
}

Buttons.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
};

export default Buttons;

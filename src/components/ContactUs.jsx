import { useState } from "react";
import contactStyle from "./styles/contact.module.css";
import Buttons from "./Buttons";

const ContactUs = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className={contactStyle.container}>
            <div className={contactStyle.wrapper}>
                {/* Contact Form Section */}
                <div className={contactStyle.formContainer}>
                    {submitted ? (
                        <div className={contactStyle.thankYou}>
                            Thank you for contacting us!
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className={contactStyle.form}
                        >
                            <h2 className={contactStyle.title}>- Contact Us</h2>
                            <h1 className={contactStyle.heading}>
                                Contact Us For Any Query
                            </h1>
                            <input
                                type="text"
                                placeholder="Name"
                                className={contactStyle.inputField}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className={contactStyle.inputField}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className={contactStyle.inputField}
                                required
                            />
                            <textarea
                                placeholder="Message"
                                className={contactStyle.textarea}
                                required
                            ></textarea>
                            <Buttons text="Submit Now" />
                        </form>
                    )}
                </div>

                {/* Google Map Section */}
                <div className={contactStyle.mapContainer}>
                    <iframe
                        className={contactStyle.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.9630579153154!3d-37.81362797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774b752b62d59b!2sMelbourne%20CBD%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1606109276203!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

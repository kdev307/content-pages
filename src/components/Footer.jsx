import { useState, useEffect } from "react";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import Logo from "./Logo";
import footerStyles from "./styles/footer.module.css";
import { fetchFooter } from "../contentful";

function Footer() {
    const [footerData, setFooterData] = useState(null);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const getFooterData = async () => {
        try {
            const data = await fetchFooter();
            if (!data) return;

            const { items, includes } = data;
            const assets = includes?.Asset || [];
            const footerItem = items[0]?.fields;

            const images = footerItem?.images?.map((imgRef) => {
                const imageAsset = assets.find(
                    (asset) => asset.sys.id === imgRef.sys.id
                );
                return imageAsset
                    ? `https:${imageAsset.fields.file.url}`
                    : null;
            });

            setFooterData({
                message: footerItem?.message || "",
                links: footerItem?.links || [],
                subHeading1: footerItem?.subHeading1 || "Company",
                subHeading2: footerItem?.subHeading2 || "Instagram",
                images: images.filter(Boolean),
            });
        } catch (error) {
            console.error("Error fetching footer data:", error);
        }
    };

    useEffect(() => {
        getFooterData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => {
            setIsSubscribed(false);
        }, 3000);
    };

    return (
        <div className={footerStyles.container}>
            <footer className={footerStyles.footer}>
                <div className={footerStyles.header}>
                    <h2 className={footerStyles.title}>
                        Keep Yourself Up to Date
                    </h2>
                    {isSubscribed ? (
                        <p className={footerStyles.subscribedText}>
                            ✅ Subscribed Successfully!
                        </p>
                    ) : (
                        <form
                            className={footerStyles.newsletter}
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={footerStyles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className={footerStyles.btn}>
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>

                <p className={footerStyles.line}>
                    <hr className={footerStyles.hr} />
                </p>

                <div className={footerStyles.body}>
                    <div className={footerStyles.main}>
                        <Logo />
                        <p className={footerStyles.text}>
                            {footerData?.message}
                        </p>
                    </div>

                    <div className={footerStyles.about}>
                        <h4>{footerData?.subHeading1}</h4>
                        <ul className={footerStyles.list}>
                            {footerData?.links.map((link, index) => (
                                <li key={index}>{link}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={footerStyles.images}>
                        <h4>{footerData?.subHeading2}</h4>
                        <div className={footerStyles.imagesGrid}>
                            {footerData?.images.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Instagram ${index}`}
                                    className={footerStyles.image}
                                />
                            ))}
                        </div>
                    </div>

                    <p className={footerStyles.copyright}>
                        © {new Date().getFullYear()} <strong>TechStack</strong>.
                        All Rights Reserved
                    </p>

                    <div className={footerStyles.socials}>
                        <Facebook style={{ fontSize: "3.2rem" }} />
                        <Twitter style={{ fontSize: "3.2rem" }} />
                        <LinkedIn style={{ fontSize: "3.2rem" }} />
                    </div>

                    <div className={footerStyles.policies}>
                        <p className={footerStyles.conditions}>
                            Terms & Conditions
                        </p>
                        <p className={footerStyles.separator}>|</p>
                        <p className={footerStyles.conditions}>
                            Privacy Policy
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;

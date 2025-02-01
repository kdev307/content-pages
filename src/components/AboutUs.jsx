import { useEffect, useState } from "react";
import { fetchAboutSection } from "../contentful";
import aboutStyles from "./styles/about.module.css";
import Buttons from "./Buttons";

function AboutUs() {
    const [aboutData, setAboutData] = useState(null);
    const [aboutImageUrl, setAboutImageUrl] = useState("");

    const getAboutData = async () => {
        try {
            const data = await fetchAboutSection();
            if (!data) return;

            const { items, includes } = data;
            const aboutItem = items[0];

            setAboutData(aboutItem);

            if (aboutItem.fields.aboutImage) {
                const assetId = aboutItem.fields.aboutImage.sys.id;
                const asset = includes?.Asset?.find(
                    (img) => img.sys.id === assetId
                );

                if (asset) {
                    setAboutImageUrl(`https:${asset.fields.file.url}`);
                }
            }
        } catch (error) {
            console.error("Error fetching aboutData:", error);
        }
    };
    useEffect(() => {
        getAboutData();
    }, []);

    return (
        <div className={aboutStyles.container}>
            <div className={aboutStyles.aboutContainer}>
                <div className={aboutStyles.imageContainer}>
                    {aboutImageUrl ? (
                        <img
                            src={aboutImageUrl}
                            alt="about Image"
                            className={aboutStyles.img}
                        />
                    ) : (
                        <div>Image not available</div>
                    )}
                    <div className={aboutStyles.block}></div>
                </div>
                <div className={aboutStyles.textContainer}>
                    {aboutData?.fields?.tag && (
                        <p className={aboutStyles.tag}>
                            {aboutData.fields.tag}
                        </p>
                    )}

                    {aboutData?.fields?.aboutTitle && (
                        <h2 className={aboutStyles.title}>
                            {aboutData.fields.aboutTitle}
                        </h2>
                    )}
                    {aboutData?.fields?.aboutMessage && (
                        <p className={aboutStyles.message}>
                            {aboutData.fields.aboutMessage}
                        </p>
                    )}
                    <Buttons text="Learn More" />
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

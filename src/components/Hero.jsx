import { useEffect, useState } from "react";
import { fetchHeroSection } from "../contentful";
import heroStyles from "./styles/hero.module.css";
import Buttons from "./Buttons";

function Hero() {
    const [heroData, setHeroData] = useState(null);
    const [heroImageUrl, setHeroImageUrl] = useState("");

    const getHeroData = async () => {
        try {
            const data = await fetchHeroSection();
            if (!data) return;

            const { items, includes } = data;
            const heroItem = items[0];

            setHeroData(heroItem);

            if (heroItem.fields.heroImage) {
                const assetId = heroItem.fields.heroImage.sys.id;
                const asset = includes?.Asset?.find(
                    (img) => img.sys.id === assetId
                );

                if (asset) {
                    setHeroImageUrl(`https:${asset.fields.file.url}`);
                }
            }
        } catch (error) {
            console.error("Error fetching heroData:", error);
        }
    };
    useEffect(() => {
        getHeroData();
    }, []);

    return (
        <div className={heroStyles.heroContainer}>
            <div className={heroStyles.heroText}>
                {heroData?.fields?.tag && (
                    <p className={heroStyles.tag}>{heroData.fields.tag}</p>
                )}
                <div className={heroStyles.heading}>
                    {heroData?.fields?.heroTitle?.content ? (
                        heroData.fields.heroTitle.content.map((node, index) =>
                            node.nodeType === "heading-1" ? (
                                <h1
                                    key={index}
                                    className={heroStyles.heroTitleContainer}
                                >
                                    {node.content.map((textNode, idx) => (
                                        <span
                                            className={heroStyles.heroTitle}
                                            key={idx}
                                            style={{
                                                fontWeight:
                                                    textNode.marks?.some(
                                                        (mark) =>
                                                            mark.type === "bold"
                                                    )
                                                        ? "bold"
                                                        : "normal",
                                                // textDecoration:
                                                //     textNode.marks?.some(
                                                //         (mark) =>
                                                //             mark.type ===
                                                //             "underline"
                                                //     )
                                                //         ? "underline"
                                                //         : "none",
                                                color: textNode.marks?.some(
                                                    (mark) =>
                                                        mark.type ===
                                                        "underline"
                                                )
                                                    ? `var(--accent-primary)`
                                                    : "",
                                            }}
                                        >
                                            {textNode.value}
                                        </span>
                                    ))}
                                </h1>
                            ) : null
                        )
                    ) : (
                        <h1>Title not available</h1>
                    )}
                    <p className={heroStyles.line}>
                        <hr className={heroStyles.hr} />
                    </p>
                </div>

                {heroData?.fields?.heroMessage && (
                    <p className={heroStyles.heroMessage}>
                        {heroData.fields.heroMessage}
                    </p>
                )}
                <Buttons text="Get Started" />
            </div>
            <div className={heroStyles.imageContainer}>
                <div className={heroStyles.block}></div>
                {heroImageUrl ? (
                    <img src={heroImageUrl} alt="Hero Image" />
                ) : (
                    <div>Image not available</div>
                )}
            </div>
        </div>
    );
}

export default Hero;

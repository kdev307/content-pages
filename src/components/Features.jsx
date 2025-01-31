import { useEffect, useState } from "react";
import { fetchFeatureCards, fetchFeatures } from "../contentful";
import PropTypes from "prop-types";
import Buttons from "./Buttons";
import featureStyles from "./styles/features.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Features() {
    const [feature, setFeature] = useState({});
    const [featureCards, setFeatureCards] = useState([]);

    const getFeatures = async () => {
        try {
            const data = await fetchFeatures();
            if (!data) return;

            const { featureTitle, featureMessage } = data.items[0].fields || [];
            setFeature({
                featureTitle: featureTitle,
                featureMessage: featureMessage,
            });
        } catch (error) {
            console.error("Error fetching feature data:", error);
        }
    };

    const getFeatureCards = async () => {
        try {
            const cartData = await fetchFeatureCards();
            if (!cartData) return;

            const { items, includes } = cartData;
            const assets = includes?.Asset || [];

            const cards = items.map((item) => {
                const featureIconId = item.fields.featureIcon?.sys?.id;
                const iconAsset = assets.find(
                    (asset) => asset.sys.id === featureIconId
                );
                const iconUrl = iconAsset
                    ? `https:${iconAsset.fields.file.url}`
                    : null;

                return {
                    title: item.fields.featureTitle || "No Title",
                    description:
                        item.fields.featureDescription || "No Description",
                    icon: iconUrl || "",
                };
            });

            setFeatureCards(cards);
        } catch (error) {
            console.error("Error fetching features:", error);
        }
    };

    useEffect(() => {
        getFeatures();
        getFeatureCards();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className={featureStyles.container}>
            <div className={featureStyles.header}>
                <h2 className={featureStyles.title}>{feature.featureTitle}</h2>
                <p className={featureStyles.message}>
                    {feature.featureMessage}
                </p>
            </div>
            <div className={featureStyles.cards}>
                <Slider {...settings} className={featureStyles.slider}>
                    {featureCards.map((card, index) => (
                        <FeatureCard card={card} key={index} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

function FeatureCard({ card }) {
    return (
        <div className={featureStyles.card}>
            {card.icon && (
                <img
                    src={card.icon}
                    alt={card.title}
                    className={featureStyles.img}
                />
            )}
            <h3 className={featureStyles.cardTitle}>{card.title}</h3>
            <p className={featureStyles.cardDescription}>{card.description}</p>
            <Buttons text="Learn More" />
        </div>
    );
}

FeatureCard.propTypes = {
    card: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string,
    }).isRequired,
};

export default Features;

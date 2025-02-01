import { useEffect, useState } from "react";
import { fetchFeatureCards, fetchServiceSection } from "../contentful";
import serviceStyles from "./styles/service.module.css";
import Buttons from "./Buttons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";

function Service() {
    const [serviceData, setServiceData] = useState(null);
    const [serviceCards, setServiceCards] = useState([]);

    const getServiceData = async () => {
        try {
            const data = await fetchServiceSection();
            if (!data) return;

            const { items } = data;
            const serviceItem = items[0];

            setServiceData(serviceItem);
        } catch (error) {
            console.error("Error fetching serviceData:", error);
        }
    };

    const getCards = async () => {
        try {
            const cardData = await fetchFeatureCards();
            if (!cardData) return;

            const { items, includes } = cardData;
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

            setServiceCards(cards);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    useEffect(() => {
        getServiceData();
        getCards();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrow: false,
    };

    return (
        <div className={serviceStyles.container}>
            <div className={serviceStyles.header}>
                <div className={serviceStyles.text}>
                    {serviceData?.fields?.tag && (
                        <p className={serviceStyles.tag}>
                            {serviceData.fields.tag}
                        </p>
                    )}
                    {serviceData?.fields?.serviceTitle && (
                        <h2 className={serviceStyles.title}>
                            {serviceData.fields.serviceTitle}
                        </h2>
                    )}
                </div>
                <Buttons text="All Services" />
            </div>
            <div className={serviceStyles.cards}>
                <Slider {...settings} className={serviceStyles.slider}>
                    {serviceCards.map((card, index) => (
                        <ServiceCard card={card} key={index} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

function ServiceCard({ card }) {
    return (
        <div className={serviceStyles.card}>
            {card.icon && (
                <img
                    src={card.icon}
                    alt={card.title}
                    className={serviceStyles.img}
                />
            )}
            <h3 className={serviceStyles.cardTitle}>{card.title}</h3>
            <p className={serviceStyles.cardDescription}>{card.description}</p>
        </div>
    );
}

ServiceCard.propTypes = {
    card: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string,
    }).isRequired,
};

export default Service;

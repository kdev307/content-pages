import { useEffect, useState } from "react";
import { fetchTestimonials } from "../contentful";
import testStyles from "./styles/testimonials.module.css";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { East, West } from "@mui/icons-material";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    const getTestimonials = async () => {
        try {
            const data = await fetchTestimonials();
            if (!data) return;

            const { items, includes } = data;
            const assets = includes?.Asset || [];

            const testimonialData = items.map((item) => {
                const imageId = item.fields.image?.sys?.id;
                const imageAsset = assets.find(
                    (asset) => asset.sys.id === imageId
                );
                const imageUrl = imageAsset
                    ? `https:${imageAsset.fields.file.url}`
                    : null;

                return {
                    name: item.fields.name || "Anonymous",
                    title: item.fields.title || "Unknown",
                    testimonial:
                        item.fields.testimonial || "No testimonial available.",
                    image: imageUrl || "",
                };
            });

            setTestimonials(testimonialData);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };

    useEffect(() => {
        getTestimonials();
    }, []);

    const PrevArrow = ({ onClick }) => {
        return (
            <div
                className={`${testStyles.arrow} ${testStyles.prev}`}
                onClick={onClick}
            >
                <West fontSize="large" />
            </div>
        );
    };

    const NextArrow = ({ onClick }) => {
        return (
            <div
                className={`${testStyles.arrow} ${testStyles.next}`}
                onClick={onClick}
            >
                <East fontSize="large" />
            </div>
        );
    };

    PrevArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    NextArrow.propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div className={testStyles.container}>
            <div className={testStyles.testimonialCards}>
                <Slider {...settings} className={testStyles.slider}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            testimonial={testimonial}
                        />
                    ))}
                </Slider>
            </div>
            <p className={testStyles.line}>
                <hr className={testStyles.hr} />
            </p>
        </div>
    );
}

function TestimonialCard({ testimonial }) {
    return (
        <div className={testStyles.card}>
            <div className={testStyles.info}>
                {testimonial.image && (
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={testStyles.image}
                    />
                )}

                <h3 className={testStyles.name}>{testimonial.name}</h3>
                <p className={testStyles.title}>{testimonial.title}</p>
            </div>
            <p className={testStyles.text}>
                &ldquo;{testimonial.testimonial}&rdquo;
            </p>
        </div>
    );
}

TestimonialCard.propTypes = {
    testimonial: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        testimonial: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
};

export default Testimonials;

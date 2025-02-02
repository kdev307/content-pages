import { useEffect, useState } from "react";
import { fetchBlogSection, fetchBlogs } from "../contentful";
import blogStyles from "./styles/blogs.module.css";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Buttons from "./Buttons";

function Blogs() {
    const [blogSection, setBlogSection] = useState(null);
    const [blogCards, setBlogCards] = useState([]);

    const getBlogSection = async () => {
        try {
            const data = await fetchBlogSection();
            if (!data) return;

            const { items } = data;
            setBlogSection(items[0]?.fields);
        } catch (error) {
            console.error("Error fetching blog section:", error);
        }
    };

    const getBlogs = async () => {
        try {
            const data = await fetchBlogs();
            if (!data) return;

            const { items, includes } = data;
            const assets = includes?.Asset || [];

            const blogs = items.map((item) => {
                const imageId = item.fields.image?.sys?.id;
                const imageAsset = assets.find(
                    (asset) => asset.sys.id === imageId
                );
                const imageUrl = imageAsset
                    ? `https:${imageAsset.fields.file.url}`
                    : null;

                return {
                    tag: item.fields.tag || "Uncategorized",
                    title: item.fields.title || "No Title",
                    image: imageUrl || "",
                };
            });

            setBlogCards(blogs);
        } catch (error) {
            console.error("Error fetching blog cards:", error);
        }
    };

    useEffect(() => {
        getBlogSection();
        getBlogs();
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
        <div className={blogStyles.container}>
            <div className={blogStyles.header}>
                {blogSection && (
                    <>
                        <div className={blogStyles.info}>
                            <p className={blogStyles.tag}>{blogSection.tag}</p>
                            <h2 className={blogStyles.title}>
                                {blogSection.title}
                            </h2>
                        </div>
                        <Buttons text="View All" />
                    </>
                )}
            </div>

            <div className={blogStyles.cards}>
                <Slider {...settings} className={blogStyles.slider}>
                    {blogCards.map((card, index) => (
                        <BlogCard key={index} card={card} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

function BlogCard({ card }) {
    return (
        <div className={blogStyles.card}>
            <div className={blogStyles.imageContainer}>
                <img
                    src={card.image}
                    alt={card.title}
                    className={blogStyles.image}
                />
                <p className={blogStyles.cardTag}>{card.tag}</p>
            </div>
            <div className={blogStyles.cardInfo}>
                <h3 className={blogStyles.cardTitle}>{card.title}</h3>
                <div className={blogStyles.others}>
                    <p className={blogStyles.line}>
                        <hr className={blogStyles.hr} />
                    </p>
                    <p className={blogStyles.learnMore}>Learn More</p>
                </div>
            </div>
        </div>
    );
}

BlogCard.propTypes = {
    card: PropTypes.shape({
        tag: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
};

export default Blogs;

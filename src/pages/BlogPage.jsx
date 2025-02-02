import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchBlogPage } from "../contentful";
import blogStyles from "../components/styles/blogPage.module.css";
import { CalendarMonth, Comment } from "@mui/icons-material";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function BlogPage() {
    const [blogData, setBlogData] = useState(null);
    const [featureCards, setFeatureCards] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchBlogPage();
                if (!data) return;

                const { items, includes } = data;
                const assets = includes?.Asset || [];
                const entries = includes?.Entry || [];
                const blogPage = items[0]?.fields;

                const extractImage = (id) => {
                    const asset = assets.find((asset) => asset.sys.id === id);
                    return asset ? `https:${asset.fields.file.url}` : "";
                };

                const extractEntry = (id) => {
                    return entries.find((entry) => entry.sys.id === id);
                };

                const mappedFeatureCards = blogPage.featureCards
                    .map((ref) => {
                        const entry = extractEntry(ref.sys.id);
                        return entry
                            ? {
                                  name: entry.fields.name,
                                  image: extractImage(
                                      entry.fields.image.sys.id
                                  ),
                              }
                            : null;
                    })
                    .filter(Boolean);

                const mappedLatestArticles = blogPage.latestArticles
                    .map((ref) => {
                        const entry = extractEntry(ref.sys.id);
                        return entry
                            ? {
                                  title: entry.fields.title,
                                  date: entry.fields.date,
                                  comments: entry.fields.comments,
                                  description: entry.fields.description,
                                  image: extractImage(
                                      entry.fields.image.sys.id
                                  ),
                              }
                            : null;
                    })
                    .filter(Boolean);

                const mappedPopularPosts = blogPage.popularPosts
                    .map((ref) => {
                        const entry = extractEntry(ref.sys.id);
                        return entry
                            ? {
                                  title: entry.fields.title,
                                  date: entry.fields.date,
                                  comments: entry.fields.comments,
                                  image: extractImage(
                                      entry.fields.image.sys.id
                                  ),
                              }
                            : null;
                    })
                    .filter(Boolean);

                setBlogData(blogPage);
                setFeatureCards(mappedFeatureCards);
                setLatestArticles(mappedLatestArticles);
                setPopularPosts(mappedPopularPosts);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        getData();
    }, []);

    return (
        <div className={blogStyles.container}>
            <header className={blogStyles.header}>
                <p className={blogStyles.tag}>{blogData?.tag}</p>
                <h1 className={blogStyles.title}>{blogData?.title}</h1>
            </header>

            <FeatureCards featureCards={featureCards} />
            <div className={blogStyles.mainContent}>
                <LatestArticles latestArticles={latestArticles} />
                <PopularPosts popularPosts={popularPosts} />
            </div>
        </div>
    );
}

function FeatureCards({ featureCards }) {
    return (
        <div className={blogStyles.featureCards}>
            {featureCards.map((card, index) => (
                <div key={index} className={blogStyles.card}>
                    <img
                        src={card.image}
                        alt={card.name}
                        className={blogStyles.cardImage}
                    />
                    <p className={blogStyles.cardName}>{card.name}</p>
                </div>
            ))}
        </div>
    );
}

FeatureCards.propTypes = {
    featureCards: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

function LatestArticles({ latestArticles }) {
    return (
        <div className={blogStyles.latestArticles}>
            <h2 className={blogStyles.sectionTitle}>Latest Articles</h2>

            {latestArticles.map((article, index) => (
                <>
                    <p className={blogStyles.line}>
                        <hr className={blogStyles.hr} />
                    </p>
                    <div key={index} className={blogStyles.article}>
                        <img
                            src={article.image}
                            alt={article.title}
                            className={blogStyles.articleImage}
                        />
                        <div className={blogStyles.articleContent}>
                            <h3 className={blogStyles.articleTitle}>
                                {article.title}
                            </h3>
                            <p className={blogStyles.articleMeta}>
                                <p>
                                    <CalendarMonth
                                        style={{
                                            color: "var(--text-accent)",
                                            fontSize: "2.4rem",
                                        }}
                                    />{" "}
                                    {formatDate(article.date)}
                                </p>
                                <p>
                                    <Comment
                                        style={{
                                            color: "var(--text-accent)",
                                            fontSize: "2.4rem",
                                        }}
                                    />
                                    {article.comments} Comments
                                </p>
                            </p>
                            <p className={blogStyles.articleDescription}>
                                {article.description}
                            </p>
                            <a href="#" className={blogStyles.readMore}>
                                Read More
                            </a>
                        </div>
                    </div>
                </>
            ))}
            <p className={blogStyles.line}>
                <hr className={blogStyles.hr} />
            </p>
        </div>
    );
}

LatestArticles.propTypes = {
    latestArticles: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            comments: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

function PopularPosts({ popularPosts }) {
    return (
        <div className={blogStyles.popularPosts}>
            <h2 className={blogStyles.sectionTitle}>Popular Posts</h2>
            <p className={blogStyles.highlight}>
                <hr className={blogStyles.hr} />
            </p>
            {popularPosts.map((post, index) => (
                <div key={index} className={blogStyles.post}>
                    <img
                        src={post.image}
                        alt={post.title}
                        className={blogStyles.postImage}
                    />
                    <div className={blogStyles.postContent}>
                        <h3 className={blogStyles.postTitle}>{post.title}</h3>
                        <p className={blogStyles.postMeta}>
                            <p>
                                <CalendarMonth
                                    style={{
                                        color: "var(--text-accent)",
                                        fontSize: "2rem",
                                    }}
                                />{" "}
                                {formatDate(post.date)}
                            </p>
                            <p>
                                <Comment
                                    style={{
                                        color: "var(--text-accent)",
                                        fontSize: "2rem",
                                    }}
                                />
                                {post.comments} Comments
                            </p>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

PopularPosts.propTypes = {
    popularPosts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            comments: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BlogPage;

import { useEffect, useState } from "react";
import { fetchCaseStudy } from "../contentful";
import caseStyles from "./styles/casestudy.module.css";
import Buttons from "./Buttons";

function CaseStudy() {
    const [caseStudy, setCaseStudy] = useState(null);
    const [images, setImages] = useState([]);

    const getCaseStudy = async () => {
        try {
            const data = await fetchCaseStudy();
            if (!data) return;

            const { items, includes } = data;
            const caseItem = items[0]?.fields || {};
            setCaseStudy(caseItem);

            const assets = includes?.Asset || [];
            const imageUrls =
                caseItem.images?.map((img) => {
                    const asset = assets.find((a) => a.sys.id === img.sys.id);
                    return asset ? `https:${asset.fields.file.url}` : null;
                }) || [];

            setImages(imageUrls);
        } catch (error) {
            console.error("Error fetching case study:", error);
        }
    };

    useEffect(() => {
        getCaseStudy();
    }, []);

    return (
        <div className={caseStyles.container}>
            {caseStudy && (
                <div className={caseStyles.container}>
                    <div className={caseStyles.content}>
                        <div className={caseStyles.text}>
                            <p className={caseStyles.tag}>{caseStudy.tag}</p>
                            <h2 className={caseStyles.title}>
                                {caseStudy.title}
                            </h2>
                            <Buttons
                                text="View All"
                                className={caseStyles.viewAll}
                            />
                        </div>
                        <div className={caseStyles.rightSection}>
                            <img
                                src={images[1]}
                                alt="Case Study"
                                className={caseStyles.image}
                            />
                            <div className={caseStyles.caseDetails}>
                                <div className={caseStyles.caseText}>
                                    <p className={caseStyles.caseTag}>
                                        {caseStudy.caseTag}
                                    </p>
                                    <h3 className={caseStyles.caseTitle}>
                                        {caseStudy.caseTitle}
                                    </h3>
                                </div>
                                <Buttons text="" />
                            </div>
                        </div>
                        <img
                            src={images[0]}
                            alt="Case Study"
                            className={caseStyles.image}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CaseStudy;

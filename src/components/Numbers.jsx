import { useEffect, useState } from "react";
import { fetchNumbers } from "../contentful";
import numStyles from "./styles/number.module.css";
import PropTypes from "prop-types";

function Numbers() {
    const [numberData, setNumberData] = useState([]);

    const getNumbers = async () => {
        try {
            const data = await fetchNumbers();
            if (!data) return;

            const { items } = data;

            setNumberData(items);
        } catch (error) {
            console.error("Error fetching numberData:", error);
        }
    };

    useEffect(() => {
        getNumbers();
    }, []);

    return (
        <div className={numStyles.container}>
            <div className={numStyles.dataContainer}>
                {numberData.length > 0 ? (
                    numberData
                        .map((item, index) => {
                            const appendK = index % 2 === 0 ? "k" : "";
                            return (
                                <Number
                                    number={item.fields}
                                    key={index}
                                    appendK={appendK}
                                />
                            );
                        })
                        .reverse()
                ) : (
                    <p>No numbers available</p>
                )}
            </div>
        </div>
    );
}

function Number({ number, appendK }) {
    const { name, value } = number;
    const [count, setCount] = useState(0);

    const targetValue = parseInt(value, 10);

    useEffect(() => {
        let timer;
        if (count < targetValue) {
            timer = setInterval(() => {
                setCount((prev) => {
                    if (prev + 1 >= targetValue) {
                        clearInterval(timer);
                        return targetValue;
                    }
                    return prev + 1;
                });
            }, 0.8);
        }

        return () => clearInterval(timer);
    }, [count, targetValue]);

    return (
        <div className={numStyles.numberItem}>
            <h3 className={numStyles.number}>
                {count} {appendK}
            </h3>
            <h4 className={numStyles.title}>{name}</h4>
        </div>
    );
}

Number.propTypes = {
    number: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    appendK: PropTypes.string,
};

export default Numbers;

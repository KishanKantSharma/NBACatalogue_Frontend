import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const News = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:8080/v1/players/news"); 
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setNewsData(data);
            } catch (error) {
                console.error("Error fetching news:", error);
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <>
            <div className="container news-page">
                <h1 className="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters 
                        letterClass={letterClass} 
                        strArray={"Latest News".split("")} 
                        idx={15}
                    />
                </h1>
                <div className="news-list">
                    {loading ? (
                        <Loader type="pacman" />
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        newsData.map((news, index) => (
                            <div key={index} className="news-item">
                                <a href={news.url} target="_blank" rel="noopener noreferrer">
                                    {news.title}
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default News;

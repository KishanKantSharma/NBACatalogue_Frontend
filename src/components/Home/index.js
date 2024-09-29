import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import LogoPL from '../../assets/images/nbalogo.webp';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = "Welcome to".split("");
    const jobArray = "NBA Player Catalog!".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <img src={LogoPL} alt="nba-logo" />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
                        <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={15} />
                    </h1>
                    <h2>Your gateway to exploring NBA teams and players!</h2>
                    <h3>2023 - 24</h3>
                    <Link to="/teams" className="flat-button">GET STARTED</Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Home;

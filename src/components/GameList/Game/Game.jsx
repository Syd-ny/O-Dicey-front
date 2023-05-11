import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

import "./Game.scss";
import GameCard from "./GameCard/GameCard";
import GameCardDetailed from "./GameCardDetailed/GameCardDetailed";

    // Animation from GameCard to GameCardDetailed
    function useAnimation(isOpen, boolean) {
        const [scope, animate] = useAnimate();

        useEffect(() => {
            animate(
                ".game-overlay",
                {
                    clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
                },
                {
                    type: "spring",
                    bounce: 0,
                    duration: 0.5
                }
            );
        }, [isOpen]);

        return scope;
    }

    const Game = ({
        title,
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const scope = useAnimation(isOpen);

        return (
            <div className="menu" ref={scope}>
                <motion.div
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <GameCard
                        title={title}
                    />
                    <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                    </div>
                </motion.div>
                <div
                    className='game-overlay'
                    style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)"
                    }}
                >
                    <GameCardDetailed
                        title={title}
                    />
                    <button className='close' onClick={() => setIsOpen(!isOpen)}></button>
                </div>{" "}
            </div>
        );
    }

Game.propTypes = {
    title: PropTypes.string,
  };

export default Game;
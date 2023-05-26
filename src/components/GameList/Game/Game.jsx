import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

import "./Game.scss";
import GameCard from "./GameCard/GameCard";
import GameCardDetailed from "./GameCardDetailed/GameCardDetailed";
import { X } from "feather-icons-react/build/IconComponents";

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
        game,
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
                        game={game}
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
                        game={game}
                    />
                    <div className='game-close-icon-container'>
                        <X
                            onClick={() => setIsOpen(!isOpen)}
                            className='game-close-icon'
                        >
                        </X>
                    </div>
                </div>
            </div>
        );
    }

Game.propTypes = {
    game: PropTypes.object.isRequired,
  };

export default Game;
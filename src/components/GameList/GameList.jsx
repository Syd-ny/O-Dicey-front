import "./GameList.scss";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";

import { useState, useEffect } from "react";


function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return windowSize;
}




const GameList = () => {
  const width = useWindowSize().width;

  if (width > 1000) {
    return (
      <div className="game-list">
        <Game 
          title="test1" />
        <Game 
          title="test2" />
        <Game 
          title="test3" />
        <Game 
          title="test4" />
        <Game 
          title="test5" />
        <Game 
          title="test6" />
        <Game 
          title="test7" />
        <Game 
          title="test8" />
        <Game 
          title="test9" />  
        <Game 
          title="test10" />  
        <Game 
          title="test11" />  
      </div>
    );
  } else {
    const isMobile = true;
    return (
      <div className="game-list">
        <GameCardDetailed
          title="test1" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test2" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test3" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test4" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test5" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test6" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test7" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test8" 
          mobile={isMobile} />
        <GameCardDetailed
          title="test9" 
          mobile={isMobile} />  
        <GameCardDetailed
          title="test10"
          mobile={isMobile} />  
        <GameCardDetailed
          title="test11"
          mobile={isMobile} />
      </div>
    )
  }
};

export default GameList;
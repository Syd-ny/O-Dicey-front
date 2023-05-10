import "./GameList.scss";
import GameListHeader from "./GameListHeader/GameListHeader";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";

import { useState, useEffect } from "react";

// function => detect screen size
function useWindowSize() {
  // detect if it's client or server
  const isClient = typeof window === "object";

  // getting the size of the window
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  // state hook
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    // update of the size
    function handleResize() {
      setWindowSize(getSize());
    }

    // eventListener for every size change from the window
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return windowSize;
}


const GameList = () => {
  const width = useWindowSize().width;

  // if web => GameCardDetailed
  if (width > 1000) {
    return (
      <div>
        <GameListHeader />
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
      </div>
    );
  } else {
    // else mobile => GameCardDetailed but with less infos (no character card)
    const isMobile = true;
    return (
      <div>
        <GameListHeader />
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
      </div>
    )
  }
};

export default GameList;
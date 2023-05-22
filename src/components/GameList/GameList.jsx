import "./GameList.scss";
import GameListHeader from "./GameListHeader/GameListHeader";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";
import PageWrapper from "../PageWrapper/PageWrapper";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { actionGetGameList } from '../../actions/user';


// ===============================
// ===== Windows Size Detect =====
// ===============================

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

// ====================
// ===== GAMELIST =====
// ====================

const GameList = () => {


  // ================================
  // ===== IMPORT GAMELIST DATA =====
  // ================================

  const dispatch = useDispatch();
  const firstRender = useRef(true);
  
  // get games' data from state
  const gameListData = useSelector((state) => state.user.games);

  // concat gamesDM & gamesPlayer
  const gameList = [...gameListData.DM, ...gameListData.player];

  useEffect(() => {
    if (firstRender.current) {
      dispatch(actionGetGameList());
      firstRender.current = false;
    }
  }, [dispatch]);


  // ==============================
  // ===== RENDER OF GAMELIST =====
  // ==============================

  //width of the windows
  const width = useWindowSize().width;

  // if web => GameCardDetailed
  if (width > 1000) {
    return (
      <PageWrapper>
        <GameListHeader />
        <div className="game-list">
          {gameList.map((g) => <Game key={`game-${g.id}`}
            game={g}
            />)}
        </div>
        {gameList .length === 0 && <p className="none">Aucune partie</p>}
      </PageWrapper>
    );
  } else {
    // else mobile => GameCardDetailed but with less infos (no character card)
    const isMobile = true;
    return (
      <PageWrapper>
        <GameListHeader />
        <div className="game-list">
          {gameList.map((g, i) => <GameCardDetailed key={`game-${i}`}
            game={g}
            mobile={isMobile}
          />)}
        </div>
        {gameList .length === 0 && <p className="none">Aucune partie</p>}
      </PageWrapper>
    )
  }
};

export default GameList;
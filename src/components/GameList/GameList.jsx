import "./GameList.scss";
import GameListHeader from "./GameListHeader/GameListHeader";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";
import PageWrapper from "../PageWrapper/PageWrapper";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect, useMemo } from "react";
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
  const gameList = useMemo(() => [...gameListData.DM, ...gameListData.player], [gameListData]);
  const gameListName = []
  for (let index = 0; index < gameList.length; index++) {
    gameListName.push(gameList[index].name);
  }

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

  const [searchGame, setSearchGame] = useState("");
  const [searchGameResults, setSearchGameResults] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const handleChange = event => {
    setSearchGame(event.target.value);
  };

  // Search Filter
  useEffect(() => {
    var results = []
    if (selectedStatus === -1) {
      results = gameList.filter(game => {
        console.log(game.dm.login)
        return ( game.dm.login.toLowerCase().includes(searchGame) || game.name.toLowerCase().includes(searchGame) ) && game.status !== 2
      })
    } else {
      results = gameList.filter(game => {
        return ( game.dm.login.toLowerCase().includes(searchGame) || game.name.toLowerCase().includes(searchGame) ) && game.status === selectedStatus
      })
    }
    results.sort((a, b) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);

      return dateB - dateA;
    });
    setSearchGameResults(results);
  }, [searchGame, selectedStatus, gameList]);

  // Status Filter
  const setStatusFilter = (status) => {
      if (status === selectedStatus) {
        setSelectedStatus(-1);
      } else {
        setSelectedStatus(status);
      }
    }

  // if web => GameCardDetailed
  if (width > 1000) {
    return (
      <PageWrapper>
        <GameListHeader 
          searchValue={handleChange}
          statusValue={setStatusFilter}
        />
        <div className="game-list">
          {searchGameResults.map((g) => <Game key={`game-${g.id}`}
            game={g}
            />)}
        </div>
        {gameList.length === 0 && <p className="none">Aucune partie</p>}
      </PageWrapper>
    );
  } else {
    // else mobile => GameCardDetailed but with less infos (no character card)
    const isMobile = true;
    return (
      <PageWrapper>
        <GameListHeader 
          searchValue={handleChange}
          statusValue={setStatusFilter}
        />
        <div className="game-list">
          {searchGameResults.map((g, i) => <GameCardDetailed key={`game-${i}`}
            game={g}
            mobile={isMobile}
          />)}
        </div>
        {gameList.length === 0 && <p className="game-list-empty">Aucune partie</p>}
      </PageWrapper>
    )
  }
};

export default GameList;
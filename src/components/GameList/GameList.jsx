import "./GameList.scss";
import GameListHeader from "./GameListHeader/GameListHeader";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";
import CharacterCard from "../CharacterCard/CharacterCard";
import PageWrapper from "../PageWrapper/PageWrapper";

import axios from "axios";
import { useSelector } from "react-redux";
import { useRef, useCallback, useState, useEffect } from "react";


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


// ===========================
// ===== EXPORT GAMELIST =====
// ===========================


const GameList = () => {

  // ========================================
  // ===== GET ALL CHARACTERS FROM USER =====
  // ========================================


  // const userIdtest = useSelector((state) => state.user.user_id);
  const userId = 7;
  const userToken = useSelector((state) => state.user.token);
  const apiUrl = import.meta.env.VITE_API_URL;

  // ARRAY of OBJECTS : list of characters
  const [characterList, setCharacterList] = useState([]);

  // axios => get data
  const fetchCharacters = useCallback( async () => {
    await axios.get( 
      `api/users/${userId}`,
      { 
        method: 'get',
        baseURL: `${apiUrl}/`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
        } , 
      }
    ).then((response) => {
          // add all characters in "characterList"
          setCharacterList(response.data.characters);
    })
  }, [userId, userToken, apiUrl]);

  // do it when new render
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      fetchCharacters();
      firstRender.current = false;
    } 
  }, [fetchCharacters]);


  // ===================================
  // ===== GET ALL GAMES FROM USER =====
  // ===================================

  // ARRAY of OBJECTS : list of games
  const [gameList, setgameList] = useState([]);

  // axios => get data
  const fetchGames = useCallback( async () => {

    // loop FOR for each characters from "charactersList"
    for (let index = 0; index < characterList.length; index++) {
      await axios.get( 
        `api/games/${characterList[index].id}`,
        { 
          method: 'get',
          baseURL: `${apiUrl}/`,
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
          } , 
        }
      ).then((response) => {
            // add game from characters to the end of "gameList"
            console.log(response.data)
            setgameList(gameList => [...gameList, response.data]);
      })
    }
  }, [userToken, apiUrl, characterList]);

  // do it when new render
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);


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
          {gameList.map((g, i) => <Game key={`game-${i}`} 
            title={g.name}
            createdAt={g.createdAt}
            updatedAt={g.updatedAt}
            status={g.status}
            dm={g.dm.login} />)}
        </div>
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
             title={g.name}
             createdAt={g.createdAt}
             updatedAt={g.updatedAt}
             status={g.status}
             dm={g.dm.login}
             mobile={isMobile} />
        </div>
      </PageWrapper>
    )
  }
};

export default GameList;
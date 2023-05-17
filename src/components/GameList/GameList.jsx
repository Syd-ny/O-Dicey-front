import "./GameList.scss";
import GameListHeader from "./GameListHeader/GameListHeader";
import Game from "./Game/Game";
import GameCardDetailed from "./Game/GameCardDetailed/GameCardDetailed";
import CharacterCard from "../CharacterCard/CharacterCard";

import axios from "axios";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";

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

  // const userIdtest = useSelector((state) => state.user.user_id);
  const userId = 7;
  const userToken = useSelector((state) => state.user.token);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [characterList, setCharacterList] = useState([]);

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
          // console.log('reponse :', response);
          setCharacterList(response.data.characters);
    })
  }, [userId, userToken, apiUrl]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const [gameList, setgameList] = useState([]);

  
  const fetchGames = useCallback( async () => {
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
            console.log('reponse :', response);
            setgameList(gameList => [...gameList, response.data]);
      })
    }
  }, [userToken, apiUrl, characterList]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);


  const width = useWindowSize().width;

  // if web => GameCardDetailed
  if (width > 1000) {
    return (
      
      <div>
        <GameListHeader />
        <div className="game-list">
          {gameList.map((g, i) => <Game key={`game-${i}`} 
            title={g.name}
            createdAt={g.createdAt}
            updatedAt={g.updatedAt}
            status={g.status} />)}
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
          {gameList.map((g, i) => <GameCardDetailed key={`game-${i}`} 
            title={g.name}
            createdAt={g.createdAt}
            updatedAt={g.updatedAt}
            status={g.status}
            mobile={isMobile} />)}
        </div>
      </div>
    )
  }
};

export default GameList;
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.scss"
import GameList from "../GameList/GameList";
import GameEdit from "../GameEdit/GameEdit";
import Home from "../Home/Home";
import User from "../User/User";
import UserEdit from "../User/UserEdit/UserEdit";
import UserForm from "../UserForm/UserForm";
import CharacterList from "../CharacterList/CharacterList";
import GameCreate from "../GameCreate/GameCreate";
import ErrorCode from "../ErrorCode/ErrorCode";
import CharacterEdit from "../CharacterEdit/CharacterEdit";
import Game from "../Game/Game";
import CharacterCreate from "../CharacterCreate/CharacterCreate";
import ErrorToaster from "../ErrorToaster/ErrorToaster";

function App() {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <div className="app">
      <div className="app-container">
        <ErrorToaster>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<UserForm formType="signup" />} />
            <Route path="/login" element={<UserForm formType="login" />} />

            {/* Restricted routes, user must be logged in */}
            {isLogged && (
              <>
                <Route path="/characters" element={<CharacterList />} />
                <Route path="/characters/:charId/edit" element={<CharacterEdit />} />
                <Route path="/characters/create" element={<CharacterCreate />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/:gameId" element={<Game />} />
                <Route path="/games/new" element={<GameCreate />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/profile" element={<User />} />
                <Route path="/profile/edit" element={<UserEdit formType="userEdit" />} />
                <Route path="/profile/pwd" element={<UserEdit formType="userPwd" />} />
              </>
            )}

            <Route path="*" element={<ErrorCode code="404" message="Page not found" />} />
          </Routes>
        </ErrorToaster>
      </div>
    </div>
  );
}

export default App

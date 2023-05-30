import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import PageWrapper from "../PageWrapper/PageWrapper";
import Frame from "../Frame/Frame";
import { useEffect, useRef } from "react";
import { actionCheckLogin } from "../../actions/user";

function App() {
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    // check if the user is connected
    if (firstRender.current) {
      dispatch(actionCheckLogin());
      firstRender.current = false;
    }
  }, [dispatch])

  return (
    <div className="app">
      <div className="app-container">
        <ErrorToaster>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<UserForm formType="signup" />} />
            <Route path="/login" element={<UserForm formType="login" />} />
            <Route path="/legal" element={(
              <PageWrapper>
                <Frame title="Mentions légales">
                  <h3 style={{ fontWeight: 'bold' }}>TITRE PREMIER</h3>
                  <p><span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}> Art. 1 </span>Mentions légales en cours de rédaction</p>
                </Frame>
              </PageWrapper>
            )} />

            <Route path="/contact" element={(
              <PageWrapper>
                <Frame title="Nous contacter">
                  <h3 style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>Par courrier :</h3>
                  <p>46 rue de la Boustifaille 16200 JARNAC</p>
                  <h3 style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>Par téléphone : </h3>
                  <p>08 36 65 65 65 (3,71 F par appel)</p>
                  <h3 style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>Par courriel : </h3>
                  <p>admin@odicey.com</p>
                </Frame>
              </PageWrapper>
            )} />

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

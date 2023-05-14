import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.scss"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import GameList from "../GameList/GameList";
import Home from "../Home/Home";
import UserForm from "../UserForm/UserForm";
import CharacterList from "../CharacterList/CharacterList";
import GameCreate from "../GameCreate/GameCreate";
import ErrorCode from "../ErrorCode/ErrorCode";
import CharacterEdit from "../CharacterEdit/CharacterEdit";

function App() {
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserForm formType="subscribe" />} />
          <Route path="/login" element={<UserForm formType="login" />} />

          {/* Restricted routes, user must be logged in */}
          {isLogged && (
            <>
              <Route path="/characters" element={<CharacterList />} />
              <Route path="/characters/:charId/edit" element={<CharacterEdit />} />
              <Route path="/games" element={<GameList />} />
            </>
          )}

          <Route path="*" element={<ErrorCode code="404" message="Page not found" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App

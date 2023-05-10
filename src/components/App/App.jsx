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
          {/* <Route path="/create" element={<GameCreate/>} />
          <Route path="/list" element={<GameList/>} /> */}

          {/* Restricted routes, user must be logged in */}
          {isLogged && (
            <>
              <Route path="/characters" element={<CharacterList />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App

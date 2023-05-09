import { Route, Routes } from "react-router-dom";
import "./App.scss"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import UserForm from "../UserForm/UserForm";
import CharacterList from "../CharacterList/CharacterList";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserForm formType="subscribe" />} />
          <Route path="/login" element={<UserForm formType="login" />} />
          <Route path="/characters" element={<CharacterList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App

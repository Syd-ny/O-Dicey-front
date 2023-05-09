import "./App.scss"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
// import Home from "../Home/Home";
import GameList from "../GameList/GameList";

function App() {
  return (
    <div className="app">
      <Header />
      <GameList />
      <Footer />
    </div>
  );
}

export default App

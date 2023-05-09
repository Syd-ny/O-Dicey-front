import "./App.scss"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App

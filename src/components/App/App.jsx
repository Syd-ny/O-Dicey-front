import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import UserForm from "../UserForm/UserForm";
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <UserForm formType="login" />
      </div>
      <Footer />
    </div>
  );
}

export default App

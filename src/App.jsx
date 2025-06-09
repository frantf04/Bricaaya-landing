import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/appRouter.routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonToTop from "./components/ButtonToTop";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
      <ButtonToTop/>
    </div>
  );
}

export default App;

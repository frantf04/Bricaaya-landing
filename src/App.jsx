import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonToTop from "./components/ButtonToTop";
import AppRouter from "./routes/AppRouter.routes";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/CartModal";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartProvider>
      <div className="App">
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
        <AppRouter isOpen={isOpen} setIsOpen={setIsOpen}/>
        <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Footer />
        <ButtonToTop />
      </div>
    </CartProvider>
  );
}

export default App;

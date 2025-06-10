import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import ProductDetail from "../pages/ProductDetail"
import Unsubscribe from "../pages/Unsubscribe"

const AppRouter = ({isOpen, setIsOpen}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producto/:productId" element={<ProductDetail isOpen={isOpen} setIsOpen={setIsOpen} />} />
      <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
    </Routes>
  )
}

export default AppRouter

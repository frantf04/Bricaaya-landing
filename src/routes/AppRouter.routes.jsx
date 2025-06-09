import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import ProductDetail from "../pages/ProductDetail"
import Unsubscribe from "../pages/Unsubscribe"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/producto/:productId" element={<ProductDetail />} />
      <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
    </Routes>
  )
}

export default AppRouter

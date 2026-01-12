import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Profile from "./pages/Profile"
import Create from "./pages/Create"
import EditProduct from "./pages/EditProduct"

const App = () => {
  return (
   <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </main>
   </div>
  )
}
export default App
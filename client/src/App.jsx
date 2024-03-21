import "./App.css";
// import {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Detail from "./views/Detail/Detail";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import UserDashboard from "./views/UserDashboard/UserDashboard";
import ShoppingCart from "./views/ShopppingCart/ShoppingCart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/users/:id" element={<UserDashboard/>}/>
        <Route path="/shoppingcart" element={<ShoppingCart/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

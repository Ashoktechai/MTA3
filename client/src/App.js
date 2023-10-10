import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Type from "./components/type/Type";
import TypeDetail from "./components/typeDetail/TypeDetail";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/types/:type" element={<Type />} />
        <Route exact path="/typeDetail/:id" element={<TypeDetail />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

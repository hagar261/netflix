import Navbar from "./components/Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate } from "react-router-dom";



function App() {

  let [loginData, setLoginData] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
    console.log("test ");
  },[]);

  function getUserData() {
    let decoded = jwt_decode(localStorage.getItem("token"));
    setLoginData(decoded);
  }

  function logout() {
    localStorage.clear();
    // localStorage.removeItem("userData");
    setLoginData(null);
    navigate("/login");
  }



  return (
    <>
   
    <Navbar loginData={loginData} logout={logout} />
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path='/login' element={<Login getUserData={getUserData} />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/account" element={<Account/>} />

    </Routes>  
   
  
    </>
  );
}

export default App;

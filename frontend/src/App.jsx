import React from "react";  
import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import StartPage from "../pages/StartPage";
import UserLogin from "../pages/UserLogin";
import UserSignUp from "../pages/UserSignup";
import CaptainLogin from "../pages/CaptainLogin";
import CaptainSignUp from "../pages/CaptainSignup";
import UserProtectedWrapper from "../pages/UserProtectedWrapper";
import UserLogout from "../pages/UserLogout";
import CaptainHome from "../pages/CaptainHome";
import CaptainProtectedWrapper from "../pages/CaptainProtectedWrapper";
import CaptainLogout from "../pages/CaptainLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLogin />}/>
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/home" element={<UserProtectedWrapper><HomePage /></UserProtectedWrapper>} />
        <Route path="/user/logout" element={<UserProtectedWrapper><UserLogout /></UserProtectedWrapper>} />
        <Route path="/captain-home" element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>} />
        <Route path="/captain/logout" element={<CaptainProtectedWrapper><CaptainLogout /></CaptainProtectedWrapper>} />
      </Routes>
    </div>
  )
}

export default App;
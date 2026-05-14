// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SummaryPage from "./pages/SummaryPage";
import QuizPage from "./pages/QuizPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/summary/:noteId' element={<SummaryPage />} />
        <Route path='/quiz/:noteId' element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import SearchPage from "./pages/SearchPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/' element={<HomePage />} />
          <Route path='/card-info/:id' element={<InfoPage />} />
          <Route path='/search/:query/:keyword/:page' element={<SearchPage />}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

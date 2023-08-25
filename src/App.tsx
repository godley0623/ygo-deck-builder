import { Routes, Route } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/card-info/:id' element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;

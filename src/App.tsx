import { Routes, Route } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/card-info/:id' element={<InfoPage />} />
        <Route path='/search/:query/:keyword/:page' element={<SearchPage />}/>
      </Routes>
    </div>
  );
}

export default App;

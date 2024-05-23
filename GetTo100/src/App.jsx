import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import StoreDataInLocalStorage from './data'; 
import Board from './board';
import Home from './home';
import LogIn from './logIn';
import Game from './game';
import MyScore from './myScore';
import NavigationButton from './NavigationButton';


function App() {

  return (
    <>
      {/* <StoreDataInLocalStorage/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn />}  />
          <Route path="/game" element={<Game />} />
          <Route path="/myScore" element={<MyScore />} />
        </Routes>
        {/* { <NavigationButton /> } */}
      </Router>
    </>
  );
}

export default App;

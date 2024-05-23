import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyScore from './myScore';
function NavigationButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('./myScore')}>My Score</button>
  );
}

export default NavigationButton;

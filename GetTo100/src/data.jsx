import React, { useEffect } from 'react';

const StoreDataInLocalStorage = () => {
  useEffect(() => {
    // Define the data
    const playersData = {
      "players": [
        {
          "username": "Noam",
          "password": "1234",
          "scores": [10, 9, 13, 20, 15],
          "average": 13.4
        },
        {
          "username": "Yael",
          "password": "2345",
          "scores": [7, 8, 9, 10, 11],
          "average": 9
        },
        {
          "username": "Yossi",
          "password": "5678",
          "scores": [5, 6, 7, 8, 9],
          "average": 7
        }
      ]
    };

    // Convert the data to a string
    const playersDataString = JSON.stringify(playersData);

    // Store the data in the localStorage
    localStorage.setItem('playersData', playersDataString);
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

  return;
};

export default StoreDataInLocalStorage;

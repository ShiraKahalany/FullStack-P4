import React, { useEffect } from 'react';

const StoreDataInLocalStorage = () => {
  useEffect(() => {
    // Define the data
    const playersData = {
      "players": [
        {
          "name": "Noam",
          "scores": [10, 9, 13, 20, 15],
          "average": 13.4
        },
        {
          "name": "Yael",
          "scores": [7, 8, 9, 10, 11],
          "average": 9
        },
        {
          "name": "Yossi",
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

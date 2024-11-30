# Photo Tagging App
![start menu](https://github.com/user-attachments/assets/2a66a83c-d27b-4072-94d5-d73ec7625aae)
![APP Walktrough](https://youtu.be/757PD5D-sfI)

## Features
- **It uses a central GameContext.jsx file to store all functions related to the api, characters, etc.**

- **Everything is checked backend-side: game creation, character checks, and the time to complete.**
  - When the page loads, it sends an api request to create a game and stores it in localStorage. If the page refreshes while a game is already stored, it does not create another one.
  - When the game starts, it removes the stored game from localStorage.
  - When clicking on a character, it sends a request to the api and either marks the character as found or gives an error popup depending on the response.
  - When the leaderboards component mounts, it sends another game-creation request.

## Technologies
- **React** (using Vite).
- **CSS Modules** for stylings.

## Links
- [Backend](https://github.com/Uruwhy1/odin-whereIsWaldo)

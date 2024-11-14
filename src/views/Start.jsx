import { useContext, useEffect, useRef, useState } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import styles from "./Start.module.css";
import Character from "../components/Character";

const Start = ({ setView }) => {
  const [userError, setUserError] = useState(
    "Empty usernames will be randomized."
  );
  const userInputRef = useRef("");

  const {
    username,
    setUsername,
    startGame,
    chooseCharacters,
    selectedCharacters,
  } = useContext(GameContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(chooseCharacters, []);

  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    userInputRef.current = newValue;
    setUsername(newValue);

    if (!userInputRef.current.match(/^[A-Za-z0-9]+$/)) {
      if (userInputRef.current == "")
        setUserError("Empty usernames will be randomized.");
      else setUserError("Invalid name. It will be randomized.");
    } else {
      setUserError(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.left}>
          <img src="/island.png" alt="Island" />
        </div>
        <div className={styles.right}>
          <div>
            <h3>Welcome to the Game!</h3>
            <p>
              You will be presented with a bustling island filled with
              characters. Your goal is to find the three randomly selected
              characters as quickly as possible.
            </p>
          </div>
          <div className={styles.usernameInput}>
            <p
              className={`${styles.error} ${!username && styles.empty}  ${
                !userError ? styles.good : "xd"
              } `}
            >
              {userError || "All Good!"}
            </p>
            <input
              onChange={handleUsernameChange}
              id="username"
              type="text"
              placeholder="username"
              value={username}
              pattern="^[0-9A-Za-z]+$"
              required
            />
            <label htmlFor="username">Choose your username:</label>
          </div>
          <div className={styles.characters}>
            {selectedCharacters.map((character) => (
              <Character key={character.id} character={character} />
            ))}
          </div>
          <button
            className={styles.start}
            onClick={() => {
              startGame();
              setView("playing");
            }}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
};

Start.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Start;

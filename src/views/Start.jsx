import { useContext, useRef, useState } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import styles from "./Start.module.css";
import Character from "../components/Character";
import MenuButton from "../components/MenuButton";

const Start = ({ setView }) => {
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState(
    "Empty usernames will be randomized."
  );
  const userInputRef = useRef("");

  const { startGame, selectedCharacters } = useContext(GameContext);

  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    userInputRef.current = newValue;
    setUsername(newValue);

    if (!userInputRef.current.match(/^[A-Za-z0-9]+$/)) {
      if (userInputRef.current === "")
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
              className={`${styles.error} ${!username && styles.empty} ${
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
          <MenuButton
            onClick={() => {
              if (startGame(username)) {
                setView("playing");
              }
            }}
          >
            START GAME
          </MenuButton>
        </div>
      </div>
    </div>
  );
};

Start.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Start;

import PropTypes from "prop-types";
import styles from "./Header.module.css";
import Character from "./Character";

const Header = ({ selectedCharacters, gameTimer }) => {
  return (
    <header className={styles.container}>
      <div className={styles.characters}>
        {selectedCharacters.map((character) => (
          <Character key={character.id} character={character} />
        ))}{" "}
      </div>
      <p>Timer: {gameTimer} seconds</p>
    </header>
  );
};

Header.propTypes = {
  selectedCharacters: PropTypes.array.isRequired,
  gameTimer: PropTypes.string.isRequired,
};

export default Header;

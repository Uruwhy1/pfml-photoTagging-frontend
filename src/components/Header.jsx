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
      <p className={styles.timer}>{gameTimer}s</p>
    </header>
  );
};

Header.propTypes = {
  selectedCharacters: PropTypes.array.isRequired,
  gameTimer: PropTypes.number.isRequired,
};

export default Header;

import styles from "./Character.module.css";
import PropTypes from "prop-types";

const Character = ({ character, handleClick }) => {
  // Determine the difficulty level based on the size property
  const getDifficultyClass = (size) => {
    switch (size) {
      case "big":
        return styles.easy;
      case "medium":
        return styles.medium;
      case "small":
      case "very small":
        return styles.hard;
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.container} ${character.found && styles.found}`}
      key={character.name}
      onClick={() => handleClick(character)}
    >
      <img src={character.img} alt={character.name} width="100" />
      <div>
        <p>{character.name}</p>
        <p className={`${styles.size} ${getDifficultyClass(character.size)}`}>
          {character.size}
        </p>
      </div>
    </div>
  );
};

Character.propTypes = {
  character: PropTypes.shape({
    size: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    found: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func,
};

export default Character;

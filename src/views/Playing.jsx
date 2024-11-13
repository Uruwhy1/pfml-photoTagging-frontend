import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import Header from "../components/Header";
import styles from "./Playing.module.css";

const Playing = ({ setView }) => {
  const { selectedCharacters, gameTimer } = useContext(GameContext);

  return (
    <>
      <Header selectedCharacters={selectedCharacters} gameTimer={gameTimer} />
      <main className={styles.container}>
        <img className={styles.image} src="/island.png" alt="" />
      </main>
    </>
  );
};

Playing.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Playing;

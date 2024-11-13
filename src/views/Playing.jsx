import { useContext } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import Header from "../components/Header";

const Playing = ({ setView }) => {
  const { selectedCharacters, gameTimer } = useContext(GameContext);

  return (
    <>
      <Header selectedCharacters={selectedCharacters} gameTimer={gameTimer} />
      <button onClick={() => setView("board")}>View Leaderboard</button>
    </>
  );
};

Playing.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Playing;

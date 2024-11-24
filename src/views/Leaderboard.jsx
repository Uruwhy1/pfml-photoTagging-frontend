import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./Leaderboard.module.css";
import MenuButton from "../components/MenuButton";
import GameContext from "../contexts/GameContext";
import PopupContext from "../contexts/PopupContext";

const Leaderboard = ({ setView }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchGameSetup } = useContext(GameContext);
  const { showPopup } = useContext(PopupContext);

  useEffect(() => {
    fetchGameSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const fetchScores = async () => {
      try {
        const response = await fetch(`${backendUrl}/highscores`);
        if (!response.ok) {
          const data = await response.json();
          if (response.status === 404) {
            setScores([]);
          } else {
            throw new Error(data.error || "Failed to fetch scores");
          }
        } else {
          const data = await response.json();
          setScores(data.highscores);
        }
      } catch (err) {
        showPopup(err.message, false);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const renderPodium = () => {
    const topThree = scores.slice(0, 3);
    const remainingScores = scores.slice(3);

    return (
      <>
        <div className={styles.podium}>
          {topThree.length > 0 && (
            <div className={`${styles.podiumPlace} ${styles.first}`}>
              <div className={styles.podiumPlayer}>
                <div className={styles.playerName}>{topThree[0]?.username}</div>
                <div className={styles.playerTime}>
                  {formatTime(topThree[0]?.duration)}
                </div>
              </div>
              <div className={styles.podiumPillar}>
                <div className={styles.rank}>1</div>
              </div>
            </div>
          )}

          {topThree.length > 1 && (
            <div className={`${styles.podiumPlace} ${styles.second}`}>
              <div className={styles.podiumPlayer}>
                <div className={styles.playerName}>{topThree[1]?.username}</div>
                <div className={styles.playerTime}>
                  {formatTime(topThree[1]?.duration)}
                </div>
              </div>
              <div className={styles.podiumPillar}>
                <div className={styles.rank}>2</div>
              </div>
            </div>
          )}

          {topThree.length > 2 && (
            <div className={`${styles.podiumPlace} ${styles.third}`}>
              <div className={styles.podiumPlayer}>
                <div className={styles.playerName}>{topThree[2]?.username}</div>
                <div className={styles.playerTime}>
                  {formatTime(topThree[2]?.duration)}
                </div>
              </div>
              <div className={styles.podiumPillar}>
                <div className={styles.rank}>3</div>
              </div>
            </div>
          )}
        </div>

        {remainingScores.length > 0 && (
          <div className={styles.remainingScores}>
            {remainingScores.map((score, index) => (
              <div
                key={`${score.username}-${index + 3}`}
                className={styles.scoreCard}
              >
                <div className={styles.scoreRank}>#{index + 4}</div>
                <div className={styles.scoreInfo}>
                  <div className={styles.scoreUsername}>{score.username}</div>
                  <div className={styles.scoreTime}>
                    {formatTime(score.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Leaderboard</h1>
        {loading ? (
          <div className={styles.loading}>Loading scores...</div>
        ) : scores.length === 0 ? (
          <div className={styles.empty}>
            <p>No scores yet - be the first to play!</p>
          </div>
        ) : (
          <div className={styles.scoreContainer}>{renderPodium()}</div>
        )}
        <MenuButton
          onClick={() => {
            setView("start");
          }}
        >
          NEW GAME
        </MenuButton>
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Leaderboard;

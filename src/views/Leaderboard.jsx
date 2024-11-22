import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Leaderboard.module.css";
import MenuButton from "../components/MenuButton";

const Leaderboard = ({ setView }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Top Times</h1>

        {loading ? (
          <div className={styles.loading}>Loading scores...</div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : scores.length === 0 ? (
          <div className={styles.empty}>
            <p>No scores yet - be the first to play!</p>
          </div>
        ) : (
          <div className={styles.scoreContainer}>
            <table className={styles.scoreTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr
                    key={`${score.username}-${index}`}
                    className={index < 3 ? styles.topThree : ""}
                  >
                    <td className={styles.rank}>#{index + 1}</td>
                    <td className={styles.username}>{score.username}</td>
                    <td className={styles.time}>
                      {formatTime(score.duration)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

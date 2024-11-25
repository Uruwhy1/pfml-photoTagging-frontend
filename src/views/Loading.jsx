import { useState, useEffect } from "react";
import styles from "./Loading.module.css";

const loadingSteps = [
  { text: "Initializing game...", time: 0 },
  { text: "Choosing characters...", time: 625 },
  { text: "Almost ready...", time: 2000 },
];

const Loading = () => {
  const [currentText, setCurrentText] = useState(loadingSteps[0].text);
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);

  useEffect(() => {
    loadingSteps.slice(1).forEach(({ text, time }) => {
      setTimeout(() => {
        setFadeClass(styles.fadeOut);
        setTimeout(() => {
          setCurrentText(text);
          setFadeClass(styles.fadeIn);
        }, 500);
      }, time);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.smallContainer}>
        <div className={`${styles.loadingText} ${fadeClass}`}>
          {currentText}
        </div>
        <div className={styles.barContainer}>
          <div className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default Loading;

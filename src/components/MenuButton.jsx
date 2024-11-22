import PropTypes from "prop-types";
import styles from "./MenuButton.module.css";

const MenuButton = ({ children, onClick }) => {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      {children}
    </button>
  );
};

MenuButton.propTypes = {
  children: PropTypes.node.isRequired, // Content inside the button
  onClick: PropTypes.func.isRequired, // Click handler function
};

export default MenuButton;

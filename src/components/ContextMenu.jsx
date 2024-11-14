import PropTypes from "prop-types";
import styles from "./ContextMenu.module.css";
import Character from "./Character";

const ContextMenu = ({ items, position, onSelect }) => {
  return (
    <div
      className={styles.contextMenu}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <ul>
        {items.map((item) => (
          <Character key={item.id} handleClick={onSelect} character={item} />
        ))}
      </ul>
    </div>
  );
};

ContextMenu.propTypes = {
  items: PropTypes.array.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ContextMenu;

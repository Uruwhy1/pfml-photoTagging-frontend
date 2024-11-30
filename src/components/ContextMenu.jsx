import PropTypes from "prop-types";
import styles from "./ContextMenu.module.css";
import Character from "./Character";

const ContextMenu = ({ requestLoading, items, position, onSelect }) => {
  return (
    <div
      className={` ${styles.contextMenu} ${
        requestLoading ? styles.loading : ""
      }`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <ul>
        {items.map((item) => (
          <Character
            key={item.id}
            handleClick={(item) => onSelect(item)}
            character={item}
          />
        ))}
      </ul>
    </div>
  );
};

ContextMenu.propTypes = {
  requestLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ContextMenu;

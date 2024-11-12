const Start = ({ setView }) => {
  return (
    <div>
      <button
        onClick={() => {
          setView("playing");
        }}
      >START GAME</button>
    </div>
  );
};

export default Start;

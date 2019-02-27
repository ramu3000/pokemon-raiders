import React from "react";
import Rating from "react-rating";

const ChooseDifficulty = props => {
  const { onBack, addRating, difficulty } = props;

  const addDifficulty = difficulty => {
    console.log(difficulty);
    addRating({ key: "difficulty", value: difficulty });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Boss difficulty</h2>
      <p>Add boss difficulty</p>
      <Rating onChange={addDifficulty} initialRating={difficulty} />
    </div>
  );
};

export default ChooseDifficulty;

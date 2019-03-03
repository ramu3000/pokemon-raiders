import React from "react";
import Rating from "react-rating";
import { Icon } from "react-materialize";

const ChooseDifficulty = props => {
  const { onBack, addRating, difficulty } = props;

  const addDifficulty = difficulty => {
    addRating({ key: "difficulty", value: difficulty });
  };

  return (
    <div>
      <h2>Boss difficulty</h2>
      <Rating
        onChange={addDifficulty}
        initialRating={difficulty}
        emptySymbol={<Icon medium>star_border</Icon>}
        fullSymbol={<Icon medium>star</Icon>}
      />
    </div>
  );
};

export default ChooseDifficulty;

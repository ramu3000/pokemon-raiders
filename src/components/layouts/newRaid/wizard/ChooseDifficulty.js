import React from "react";
import Rating from "react-rating";
import Icon from "@material-ui/core/Icon";

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
        emptySymbol={<Icon fontSize="large">star_border</Icon>}
        fullSymbol={<Icon fontSize="large">star</Icon>}
      />
    </div>
  );
};

export default ChooseDifficulty;

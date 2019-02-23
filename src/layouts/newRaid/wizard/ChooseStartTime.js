import React from "react";
import addMinutes from "date-fns/add_minutes";

const ChooseStartTime = props => {
  const { setTime, saveRaid, active } = props;

  const onSave = event => {
    if (active) {
      const endTime = addMinutes(new Date(), event.target.value);
      return saveRaid({ key: "endTime", value: endTime });
    }

    const startTime = addMinutes(new Date(), event.target.value);
    return saveRaid({ key: "startTime", value: startTime });
  };

  function renderStartedText() {
    if (active) {
      return (
        <div>
          <h2>When does it start</h2>
          <p> it starts in... minutes</p>
        </div>
      );
    }
    return (
      <div>
        <h2>How much time left?</h2>
        <p> it ends in ... minutes</p>
      </div>
    );
  }

  return (
    <div>
      {renderStartedText()}
      <input onChange={setTime} type="number" min="1" max="90" />
      <button className="green" onClick={onSave}>
        Continue
      </button>
    </div>
  );
};

export default ChooseStartTime;

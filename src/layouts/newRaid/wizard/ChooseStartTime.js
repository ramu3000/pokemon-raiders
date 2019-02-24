import React from "react";
import addMinutes from "date-fns/add_minutes";

class ChooseStartTime extends React.Component {
  state = {
    time: null
  };

  onSave = () => {
    const { active, saveRaid } = this.props;
    const { time } = this.state;

    if (active) {
      const endTime = addMinutes(new Date(), time);
      return saveRaid({ key: "endTime", value: endTime });
    }

    const startTime = addMinutes(new Date(), time);
    return saveRaid({ key: "startTime", value: startTime }, false);
  };

  handeTimeChange = event => {
    this.setState({ time: event.target.value });
  };

  renderStartedText() {
    const { active } = this.props;
    if (active) {
      return (
        <div>
          <h2>How much time left?</h2>
          <p> it ends in ... minutes</p>
        </div>
      );
    }
    return (
      <div>
        <h2>When does it start</h2>
        <p> it starts in... minutes</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderStartedText()}
        <input onChange={this.handeTimeChange} type="number" min="1" max="90" />
        <button className="green" onClick={this.onSave}>
          Continue
        </button>
      </div>
    );
  }
}

export default ChooseStartTime;

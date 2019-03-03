import React from "react";
import addMinutes from "date-fns/add_minutes";
import { Button } from "react-materialize";

class ChooseStartTime extends React.Component {
  state = {
    time: ""
  };

  componentDidMount() {
    const { endTime, startTime } = this.props;
    if (startTime) {
      this.setState({ time: startTime });
    } else if (endTime) {
      this.setState({ time: endTime });
    }
  }

  onSave = () => {
    const { active, saveRaid } = this.props;
    const { time } = this.state;

    if (active) {
      return saveRaid({ key: "endTime", value: time });
    }
    return saveRaid({ key: "startTime", value: time }, false);
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
        <input
          onChange={this.handeTimeChange}
          value={this.state.time}
          type="number"
          min="1"
          max="90"
        />
        <Button className="blue" onClick={this.onSave}>
          Continue
        </Button>
      </div>
    );
  }
}

export default ChooseStartTime;

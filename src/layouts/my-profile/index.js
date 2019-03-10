import React from "react";
import { Input, Button } from "@material-ui/core";
import { getUserChatName, setUserChatName } from "../../utils/localstorage";

class Settings extends React.Component {
  state = {
    user: "",
    edit: false
  };
  componentDidMount() {
    this.setState({ user: getUserChatName() });
  }
  setUserName = ({ target }) => {
    this.setState({ user: target.value });
  };

  handleUserInput = () => {
    if (this.state.edit) {
      setUserChatName(this.state.user);
    }
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const { user, edit } = this.state;
    return (
      <div>
        <OfflineSettings
          user={user}
          changeUser={this.setUserName}
          handleUserInput={this.handleUserInput}
          inputEnabled={!edit}
          text={edit ? "Save" : "Edit"}
        />
      </div>
    );
  }
}

const OfflineSettings = props => (
  <div>
    <h2>My settings</h2>

    <h3>Chat settings</h3>
    <label>
      chat username:
      <Input
        disabled={props.inputEnabled}
        value={props.user}
        onChange={props.changeUser}
      />
    </label>
    <Button onClick={props.handleUserInput}>{props.text}</Button>
    <div>this will be saved on your browser...</div>

    <h3>Subscription settings</h3>
  </div>
);

export default Settings;

import React from "react";
import { getUserChatName, setUserChatName } from "../../../utils/localstorage";
import { Input, Button } from "@material-ui/core";

class ChatSettingsPage extends React.Component {
  state = {
    user: "",
    edit: false,
    subscription: false
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
    return (
      <div className="chat-settings-page__wrapper">
        <h3>Chat settings</h3>
        <label>
          Username:
          <Input
            disabled={!this.state.edit}
            value={this.state.user}
            onChange={this.setUserName}
          />
        </label>
        <Button onClick={this.handleUserInput}>
          {this.state.edit ? "save" : "edit"}
        </Button>
      </div>
    );
  }
}
export default ChatSettingsPage;

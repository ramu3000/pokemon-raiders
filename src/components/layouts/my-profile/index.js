import React from "react";
import {
  Input,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ChatSettingsPage from "./ChatSettingsPage";
import NotificationPage from "./NotificationSettingsPage";

class Settings extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <section className="settings-wrapper">
        <nav>
          <h2>App settings</h2>
        </nav>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Chat
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ChatSettingsPage />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            Notifications
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <NotificationPage />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </section>
    );
  }
}

export default Settings;

import React, { Component } from "react";
import { Button, Input, Icon } from "@material-ui/core";

class AddComment extends Component {
  state = { content: "" };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onCreate(this.state);
    this.setState({ content: "" });
  };

  render() {
    const { content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddComment">
        <Input
          fullWidth
          type="text"
          name="content"
          placeholder="Comment"
          value={content}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
          disabled={this.state.content.length < 2}
        >
          Create Comment
          <Icon>send</Icon>
        </Button>
      </form>
    );
  }
}

export default AddComment;

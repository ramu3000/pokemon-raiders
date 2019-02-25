import React, { Component } from "react";
import { Button } from "react-materialize";
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
        <input
          type="text"
          name="content"
          placeholder="Comment"
          value={content}
          onChange={this.handleChange}
        />
        <Button
          onClick={this.handleSubmit}
          disabled={this.state.content.length < 2}
        >
          <i className="material-icons right">send</i>
          Create Comment
        </Button>
      </form>
    );
  }
}

export default AddComment;

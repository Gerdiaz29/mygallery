import React, { Component } from "react";

class Inputs extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    const text = e.target.value;

    this.setState({ text });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
        ></input>
        <button onClick={() => this.props.search(this.state.text)}>
          Search
        </button>
      </div>
    );
  }
}

export default Inputs;

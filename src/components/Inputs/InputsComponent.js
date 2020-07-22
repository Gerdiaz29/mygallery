import React, { Component } from "react";

class Inputs extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      console.log(e.keyCode);
      this.props.search(this.state.text);
    }
  };

  render() {
    return (
      <div className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleEnter}
        ></input>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={() => this.props.search(this.state.text)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Inputs;

import React, { Component } from "react";

class InputsSearch extends Component {
  render() {
    return (
      <div className="form-inline">
        <input
          className="form-control mr-sm-2 text-center"
          type="text"
          value={this.props.text}
          onChange={this.props.handleChange}
          onKeyDown={this.props.handleEnter}
        ></input>
        <button
          className="form-control btn btn-outline-success my-2 my-sm-0"
          onClick={this.props.search}
        >
          Search
        </button>
      </div>
    );
  }
}

export default InputsSearch;

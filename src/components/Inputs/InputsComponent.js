import React, { Component } from "react";

class Inputs extends Component {
  constructor() {
    super();
    this.entrada = React.createRef();
  }
  focus = () => {
    console.log(this.entrada);
  };
  blur = () => {};
  render() {
    return (
      <div>
        <input type="text" ref={this.entrada}></input>
        <button onClick={this.focus}>Focus</button>
        <button onClick={this.blur}>Blur</button>
      </div>
    );
  }
}

export default Inputs;

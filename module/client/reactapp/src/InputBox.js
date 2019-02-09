import React, { Component } from 'react';

class InputBox extends Component {
  render() {
    return (
      <div className="InputBox">
        <input type="text"/>
        <input type="button" value="Send"/>
      </div>
    );
  }
}

export default InputBox;

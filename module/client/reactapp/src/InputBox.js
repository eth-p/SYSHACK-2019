import React, { Component } from 'react';
import './InputBox.css';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {textBoxText: ''};

    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
  }

  handleTextBoxChange(event) {
    this.setState({textBoxText: event.target.value});
  }

  onMessageSend() {
    // TODO: send message
    console.log("send");
    this.setState({textBoxText: ""});

  }

  render() {
    return (
      <div className="InputBox">
        <div className="AddonBar">
        </div>
        <div className="InputArea">
          <input
            className="TextBox"
            type="text"
            onChange={this.handleTextBoxChange}
            value={this.state.textBoxText}
          />
          <div className="SendButtonArea">
            <input
              className="SendButton"
              type="button"
              value="Send"
              onClick={this.onMessageSend}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default InputBox;

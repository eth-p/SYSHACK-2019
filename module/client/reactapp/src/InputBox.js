import React, { Component } from 'react';
import './InputBox.css';
import emoji from '../public/assets/emoticons/regular_smile.png';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBoxText: '',
      emojiMenuOpen: false
    };

    this.socket = props.socket;

    this.handleTextBoxChange = this.handleTextBoxChange.bind(this);
    this.onMessageSend = this.onMessageSend.bind(this);
    this.handleEmojiButtonClick = this.handleEmojiButtonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleTextBoxChange(event) {
    this.setState({textBoxText: event.target.value});
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.onMessageSend();
    }
  }

  handleEmojiButtonClick(event) {
    console.log("here");
    //this.setState({emojiMenuOpen: !emojiMenuOpen});
    this.socket.emit("chat nudge");
  }

  onMessageSend() {
    this.socket.emit("chat message", this.state.textBoxText)
    this.setState({textBoxText: ""});
  }

  render() {
    return (
      <div className="InputBox">
        <div className="AddonBar">
          <img src={emoji} onClick={this.handleEmojiButtonClick}/>
        </div>
        <div className="InputArea">
          <input
            className="TextBox"
            type="text"
            onChange={this.handleTextBoxChange}
            onKeyDown={this.handleKeyDown}
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

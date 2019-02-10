import React, { Component } from 'react';

class ChatMessage extends Component {
  render() {
    const message = this.props.message;
    return (
      <div className="ChatMessage">
        <p className="SenderName">{message.username.user} says:</p>
        <p className="Message">{message.message}</p>
      </div>
    );
  }
}

export default ChatMessage;

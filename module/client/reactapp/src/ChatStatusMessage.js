import React, { Component } from 'react';

class ChatErrorMessage extends Component {
  render() {
    const message = this.props.message;
    return (
      <div className="ChatMessage StatusMessage">
        <p className="Message">{message.message}</p>
      </div>
    );
  }
}

export default ChatErrorMessage;

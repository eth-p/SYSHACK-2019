import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';
import './ChatLog.css';

class ChatLog extends Component {
  render() {
    return (
      <div className="ChatLog">
        {this.props.messages
          .slice(50)
          .reverse()
          .map(message => <ChatMessage message={message}/>)}
      </div>
    );
  }
}

export default ChatLog;

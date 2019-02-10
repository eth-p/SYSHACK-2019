import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';
import './ChatLog.css';

class ChatLog extends Component {
  render() {
    return (
      <div className="ChatLog">
        {this.props.messages
          .map((message, index) => <ChatMessage key={index} message={message}/>)}
      </div>
    );
  }
}

export default ChatLog;

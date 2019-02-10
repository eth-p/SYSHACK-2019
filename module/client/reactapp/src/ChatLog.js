import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';
import ChatErrorMessage from './ChatErrorMessage.js';
import ChatStatusMessage from './ChatStatusMessage.js';
import './ChatLog.css';

class ChatLog extends Component {
  render() {
    return (
      <div className="ChatLog">
        {this.props.messages
          .map((message, index) => {
            if (message.type === 'error') {
              return <ChatErrorMessage key={index} message={message}/>
            } else if (message.type === 'status') {
              return <ChatStatusMessage key={index} message={message}/>
            } else {
              return <ChatMessage key={index} message={message}/>
            }
          })}
      </div>
    );
  }
}

export default ChatLog;

import React, { Component } from 'react';
import ChatLog from './ChatLog.js';
import InputBox from './InputBox';
import './App.css';
import BubbleImage from "./BubbleImage";
//import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: {},
      users: {},
      currentUser: {}
    }
  }

  componentDidMount() {
    //const socket = io("");
    // on message received

  }

  render() {
    const messages = [
      {username: "User 1", message: "Hey whats up"},
      {username: "User 2", message: "Pretty good, you?"}
    ];
    return (
      <div className="App">
        <div className="TopBar"></div>
        <div className="AppBody">
          <div className="ChatColumn">
            <ChatLog messages={messages}/>
            <InputBox/>
          </div>
          <div className="UserColumn">
            <BubbleImage src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"/>
            <BubbleImage src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

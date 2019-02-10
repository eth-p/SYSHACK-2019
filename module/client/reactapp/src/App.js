import React, { Component } from 'react';
import ChatLog from './ChatLog.js';
import InputBox from './InputBox';
import './App.css';
import BubbleImage from "./BubbleImage";
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentUser: {}
    }

    this.socket = io("api.1337.tf.vc");
    this.socket.on('chat message', message => {
      console.log(message);
      const messageText = message.message;
      const username = message.user;

      this.setState(prevState => ({
        messages: [...prevState.messages, {username: username, message: messageText}]
      }));
    });

    this.socket.on("info", userData => {
      console.log(userData);
      this.setState({currentUser: userData});
    });


    /*
    setInterval(() => {
      this.setState(prevState => ({
        messages: [...prevState.messages, {username: "User 1", message: "Heyy"}]
      }))
    }, 1000);
    */
  }

  render() {
    return (
      <div className="App">
        <div className="TopBar">
          msfriends
        </div>
        <div className="AppBody">
          <div className="ChatColumn">
            <ChatLog messages={this.state.messages}/>
            <InputBox socket={this.socket}/>
          </div>
          <div className="UserColumn">
            <BubbleImage src="https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"/>
            <BubbleImage src={"./assets/images/" + this.state.currentUser.picture}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

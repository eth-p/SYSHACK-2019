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
      currentUser: {},
      nudge: false
    }

    this.socket = io("api.1337.tf.vc");
    this.socket.on('chat message', message => {
      console.log(message);
      const messageText = message.message;
      const username = message.user;

      this.setState(prevState => ({
        messages: [...prevState.messages, {username: username, message: messageText, type: 'message'}]
      }));
    });

    this.socket.on("info", userData => {
      console.log(userData);
      this.setState({currentUser: userData});
    });

    this.socket.on("chat nudge", () => {
      this.nudge();
    });

    this.socket.on("chat error", message => {
      const messageText = message.message;
      const username = message.user;

      this.setState(prevState => ({
        messages: [...prevState.messages, {username: "bad person", message: messageText, type: 'error'}]
      }));
    });

    /*document.addEventListener('keypress', (e) => {
      if(e.key == "n") {
        this.nudge();
      }
    });*/

    /*
    setInterval(() => {
      this.setState(prevState => ({
        messages: [...prevState.messages, {username: "User 1", message: "Heyy"}]
      }))
    }, 1000);
    */
  }

  nudge() {
    this.setState({nudge: true});
    setTimeout(() => {
      this.setState({nudge: false});
    }, 250);
  }

  render() {
    return (
      <div className={"App " + (this.state.nudge ? "shaking" : "")}>
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

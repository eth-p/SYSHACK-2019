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
      lastSentUser: null,
      nudge: false
    }

    this.socket = io("api.1337.tf.vc");
    this.socket.on('chat message', message => {
      console.log(message);
      const messageText = message.message;
      const username = message.user;

      this.setState(prevState => ({
        messages: [...prevState.messages, {username: username, message: messageText}],
        lastSentUser: message.user
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
        messages: [...prevState.messages, {username: "bad person", message: messageText}]
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
            <BubbleImage
              text={this.state.lastSentUser != null ? "Last message from: " + this.state.lastSentUser.user : "" }
              src={this.state.lastSentUser != null ? ("./assets/images/" + this.state.lastSentUser.picture) : "https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/49345126_2394988807230891_5503160343897047040_n.jpg?_nc_cat=102&_nc_ht=scontent-sea1-1.xx&oh=f64ccd0d1b10a28cb10645904c9f3ce0&oe=5CFBB50E"}
            />
            <BubbleImage
              text={"You: " + this.state.currentUser.user}
              src={"./assets/images/" + this.state.currentUser.picture}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

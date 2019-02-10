import React, { Component } from 'react';
import './BubbleImage.css';

class BubbleImage extends Component {
  render() {
    return (
      <div className="bubble">
        <p>{this.props.text}</p>
        <div className="BubbleContainer">
          <img src={this.props.src} alt="Profile image"/>
        </div>
      </div>
    );
  }
}

export default BubbleImage;

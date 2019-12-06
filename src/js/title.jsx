import React from 'react'

export default class Title extends React.Component {
  render() {
    return (
      <div>
        <div class="title-bar">
          <div class="title-bar-title">{this.props.title}</div>
        </div>
        <div class="vertical-space-separator"/>
      </div>
    );
  }
}

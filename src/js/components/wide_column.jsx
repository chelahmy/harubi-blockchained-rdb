import React from 'react'

export default class WideColumn extends React.Component {

  render() {
    return (
      <div class="grid-x grid-padding-x">
        <div class="cell small-10 small-offset-1 medium-10 medium-offset-1 large-10 large-offset-1">
        {this.props.children}
        </div>
      </div>
    )
  }
}

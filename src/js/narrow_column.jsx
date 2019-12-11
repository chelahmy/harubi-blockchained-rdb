import React from 'react'

export default class NarrowColumn extends React.Component {

  render() {
    return (
      <div class="grid-x grid-padding-x">
        <div class="cell small-10 small-offset-1 medium-8 medium-offset-2 large-6 large-offset-3">
        {this.props.children}
        </div>
      </div>
    )
  }
}

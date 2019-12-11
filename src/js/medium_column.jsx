import React from 'react'

export default class MediumColumn extends React.Component {

  render() {
    return (
      <div class="grid-x grid-padding-x">
        <div class="cell small-10 small-offset-1 medium-10 medium-offset-1 large-8 large-offset-2">
        {this.props.children}
        </div>
      </div>
    )
  }
}

import React from 'react'

export default class Space extends React.Component {
  render() {
    let spaces = ''
    for (let i = 0; i < this.props.size; i++)
      spaces += '&nbsp;'
    return (
      <span dangerouslySetInnerHTML={{__html: spaces}} />
    )
  }
}

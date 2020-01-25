import React from 'react'
import NarrowColumn from './narrow_column'
import MediumColumn from './medium_column'
import WideColumn from './wide_column'

export default class Body extends React.Component {
  constructor(props) {
    super(props)

    if (typeof window.page_body_id === 'undefined')
      window.page_body_id = 0

    this.myid = 'page_body_' + ++(window.page_body_id) // support multiple bodies on a page
  }

  componentDidMount() {
    $('#' + this.myid).load(this.props.src, () => {
      if (typeof window.bodyDidLoad === 'function')
        window.bodyDidLoad(this.myid)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src != this.props.src)
      $('#' + this.myid).load(this.props.src)
  }

  render() {
    if (typeof this.props.column !== 'undefined') {
      if (this.props.column == 'narrow')
        return (
          <NarrowColumn>
            <div id={this.myid} />
          </NarrowColumn>
        )
      if (this.props.column == 'medium')
        return (
          <MediumColumn>
            <div id={this.myid} />
          </MediumColumn>
        )
      if (this.props.column == 'wide')
        return (
          <WideColumn>
            <div id={this.myid} />
          </WideColumn>
        )
    }
    return (<div id={this.myid} />)
  }
}

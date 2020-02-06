import React from 'react'
import {FlashPageMessage} from '../utils'
import NarrowColumn from './narrow_column'
import MediumColumn from './medium_column'
import WideColumn from './wide_column'
import Callout from './callout'

export default class Body extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnCalloutMount = this.handleOnCalloutMount.bind(this)

    if (typeof window.page_body_id === 'undefined')
      window.page_body_id = 0

    this.myid = 'page_body_' + ++(window.page_body_id) // support multiple bodies on a page
  }

  handleOnCalloutMount(obj) {
    this.callout = obj
  }

  componentDidMount() {
    $('#' + this.myid).load(this.props.src, () => {
      if (typeof window.bodyDidLoad === 'function')
        window.bodyDidLoad(this.myid)
        window.bodyDidLoad = undefined
    })
    FlashPageMessage(this.callout)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src != this.props.src)
      $('#' + this.myid).load(this.props.src, () => {
        if (typeof window.bodyDidLoad === 'function') {
          window.bodyDidLoad(this.myid)
          window.bodyDidLoad = undefined
        }
      })
    FlashPageMessage(this.callout)
  }

  render() {
    if (typeof this.props.column !== 'undefined') {
      if (this.props.column == 'narrow')
        return (
          <NarrowColumn>
            <Callout onMount={this.handleOnCalloutMount}/>
            <div id={this.myid} />
          </NarrowColumn>
        )
      if (this.props.column == 'medium')
        return (
          <MediumColumn>
            <Callout onMount={this.handleOnCalloutMount}/>
            <div id={this.myid} />
          </MediumColumn>
        )
      if (this.props.column == 'wide')
        return (
          <WideColumn>
            <Callout onMount={this.handleOnCalloutMount}/>
            <div id={this.myid} />
          </WideColumn>
        )
    }
    return (
      <div>
        <Callout onMount={this.handleOnCalloutMount}/>
        <div id={this.myid} />
      </div>
    )
  }
}

import React from 'react'
import {FlashPageMessage} from './utils'
import NarrowColumn from './narrow_column'
import Space from './space'
import Callout from './callout'
import Foundation from 'foundation-sites'

export default class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnCalloutMount = this.handleOnCalloutMount.bind(this)
    this.handleOnReset = this.handleOnReset.bind(this)

    if (typeof window.page_form_id === 'undefined')
      window.page_form_id = 0

    this.myid = 'page_form_' + ++(window.page_form_id) // support multiple forms on a page
  }

  handleOnCalloutMount(obj) {
    this.callout = obj
  }

  handleOnReset(e) {
    if (typeof this.callout !== 'undefined') {
      if (typeof this.callout.hide !== 'undefined')
        this.callout.hide()
    }
  }

  callOut(title, message, type = '') {
    if (typeof this.callout !== 'undefined') {
      if (typeof this.callout.show !== 'undefined')
        this.callout.show(title, message, type)
    }
  }

  componentDidMount() {
    if (typeof this.props.onMount !== 'undefined')
      this.props.onMount(this)

    let ele = $('#' + this.myid)
    // Re-initialize Foundation since React alters DOM
    if (!$(ele).data('zfPlugin')) {
        $(ele).foundation()
    }

    let onSubmit = this.props.onSubmit
    $(ele)
      // form validation passed, form will submit if submit event not returned false
      .on("formvalid.zf.abide", function(ev,frm) {
        if (typeof onSubmit !== 'undefined')
          onSubmit(ev, frm)
      })
      // to prevent form from submitting upon successful validation
      .on("submit", function(ev) {
        ev.preventDefault();
      })

    FlashPageMessage(this.callout)
  }

  componentDidUpdate(prevProps, prevState) {
    FlashPageMessage(this.callout)
  }

  render() {
    let submitVal = 'Submit'
    if (typeof this.props.submitValue !== 'undefined')
      submitVal = this.props.submitValue
    let reset
    if (typeof this.props.wantReset !== 'undefined') {
      reset = (
        <span>
          <Space size="5"/>
          <button class="button" type="reset">Reset</button>
        </span>
      )
    }

    return (
      <NarrowColumn>
        <Callout onMount={this.handleOnCalloutMount}/>
        <form data-abide noValidate
          id={this.myid}
          onReset={this.handleOnReset}>
          {this.props.children}
          <div class="vertical-space-separator"/>
          <div class="text-center">
            <button class="button" type="submit">{submitVal}</button>
            {reset}
          </div>
        </form>
      </NarrowColumn>
    )
  }
}

import React from 'react'
import Title from './title'
import Space from './space'
import Callout from './callout'
import Foundation from 'foundation-sites'

export default class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleCalloutLink = this.handleCalloutLink.bind(this)
    this.handleOnReset = this.handleOnReset.bind(this)

    if (typeof window.page_form_id === 'undefined')
      window.page_form_id = 0

    props.myid = 'page_form_' + ++(window.page_form_id) // support multiple bodies
    this.myRef = React.createRef()
  }

  handleCalloutLink(link) {
    this.callout = link
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
    if (typeof this.props.link !== 'undefined')
      this.props.link(this)

    let ele = this.myRef.current
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
      <div>
        <Title title={this.props.title}/>
        <div class="grid-x grid-padding-x">
          <div class="cell small-10 small-offset-1 medium-8 medium-offset-2 large-6 large-offset-3">
            <Callout link={this.handleCalloutLink}/>
            <form data-abide noValidate
              ref={this.myRef}
              id={this.props.myid}
              onReset={this.handleOnReset}>
              {this.props.children}
              <div class="vertical-space-separator"/>
              <div class="text-center">
                <button class="button" type="submit">{submitVal}</button>
                {reset}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

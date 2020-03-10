import React from 'react'
import {FlashPageMessage} from '../utils/utils'
import NarrowColumn from './narrow_column'
import Space from './space'
import Callout from './callout'
import Foundation from 'foundation-sites'

export default class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnCalloutMount = this.handleOnCalloutMount.bind(this)
    this.handleOnReset = this.handleOnReset.bind(this)
    this.callOut = this.callOut.bind(this)
    this.getEle = this.getEle.bind(this)
    this.addErrorClasses = this.addErrorClasses.bind(this)
    this.removeErrorClasses = this.removeErrorClasses.bind(this)

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

  getEle() {
      return $('#' + this.myid)
  }

  addErrorClasses(field) {
    $('#' + this.myid).foundation('addErrorClasses', $('#' + field))
  }

  removeErrorClasses(field) {
    $('#' + this.myid).foundation('removeErrorClasses', $('#' + field))
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
    let tform = this;
    $(ele)
      // field element is valid
      .on("valid.zf.abide", function(ev,elem) {
        let name = elem.attr('name')
        let pattern = elem.attr('pattern')
        if (typeof pattern !== "undefined") {
          console.log(pattern);
          if (!(pattern in Foundation.Abide.defaults.patterns)) {
            console.log("unknown pattern");
            console.log(ev.target.value);
            let valid = new RegExp(pattern).test(ev.target.value);
            if (valid)
              tform.removeErrorClasses(name);
            else
              tform.addErrorClasses(name);
          }
        }
        //console.log("Field name "+elem.attr('name')+" is valid");
      })
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

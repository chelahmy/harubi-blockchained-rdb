import React from 'react'
import {SetPageMessage, UnrefSignedInUser} from './utils/utils'
import BackendRequest from './utils/serve'
import Form from './components/form'
import Input from './components/input'
import Callout from './components/callout'

export default class CancelAccount extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnFormMount = this.handleOnFormMount.bind(this)
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
    this.handleOnCalloutMount = this.handleOnCalloutMount.bind(this)
  }

  handleOnFormMount(obj) {
    this.form = obj
  }

  handleOnFormSubmit(ev,frm) {
    let data = new FormData(ev.target)
    BackendRequest({ // params
      model: 'user',
      action: 'cancel_own',
      password: data.get('password')
    },
    (resp) => { // success
      SetPageMessage('Success', 'Your account has been cancelled.', 'success')
      UnrefSignedInUser()
      this.props.page.navigate(this.props.onSuccessPage)
    },
    (title, message) => { // error
      this.form.callOut(title, message, 'alert')
    },
    () => { // reset
      if (typeof this.props.onResetPage !== 'undefined')
        this.props.page.navigate(this.props.onResetPage)
    })
  }

  handleOnCalloutMount(obj) {
    obj.show('Warning', 'Cancelled account and its name will no longer be available to you and anybody else.', 'warning')
  }

  render() {
    return (
      <Form
        onSubmit={this.handleOnFormSubmit}
        submitValue="Cancel My Account"
        onMount={this.handleOnFormMount}>
        <Callout onMount={this.handleOnCalloutMount}/>
        <Input label="Password" name="password" type="password" placeholder="Your password" required
          errorMessage="Your password is required."/>
        <Input name="confirm" type="checkbox"
          text= "Please cancel my account." required
          errorMessage="Your confirmation is required."/>
      </Form>
    )
  }
}

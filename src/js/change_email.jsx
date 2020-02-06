import React from 'react'
import {SetSignedInUserEmail, SetPageMessage} from './utils'
import BackendRequest from './serve'
import Form from './components/form'
import Input from './components/input'

export default class ChangeEmail extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnFormMount = this.handleOnFormMount.bind(this)
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
    this.new_email = ''
  }

  handleOnFormMount(obj) {
    this.form = obj
  }

  handleOnFormSubmit(ev,frm) {
    let data = new FormData(ev.target)
    this.new_email = data.get('email')
    BackendRequest({ // params
      model: 'user',
      action: 'update_own',
      email: this.new_email
    },
    (resp) => { // success
      SetSignedInUserEmail(this.new_email)
      SetPageMessage('Success', 'Your email has been successfully updated.', 'success')
      this.props.page.navigate(this.props.onSuccessPage)
    },
    (title, message) => { // error
      this.form.callOut(title, message, 'alert')
    },
    () => { // reset
      this.props.page.navigate('home')
    })
  }

  render() {
    return (
      <Form
        onSubmit={this.handleOnFormSubmit}
        submitValue="Update"
        onMount={this.handleOnFormMount}>
        <Input label="My E-mail Address" name="email" type="text" placeholder="Your e-mail address"
          defaultValue={this.props.pageParam.user.email} pattern="email" required
          errorMessage="A valid e-mail address is required."/>
      </Form>
    )
  }
}

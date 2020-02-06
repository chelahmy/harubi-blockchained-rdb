import React from 'react'
import {SetPageMessage} from './utils/utils'
import BackendRequest from './utils/serve'
import Form from './components/form'
import Input from './components/input'

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnFormMount = this.handleOnFormMount.bind(this)
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
  }

  handleOnFormMount(obj) {
    this.form = obj
  }

  handleOnFormSubmit(ev,frm) {
    let data = new FormData(ev.target)
    BackendRequest({ // params
      model: 'user',
      action: 'update_own',
      old_password: data.get('password'),
      new_password: data.get('new_password')
    },
    (resp) => { // success
      SetPageMessage('Success', 'Your password has been successfully updated.', 'success')
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
        <Input label="My Password" name="password" type="password" placeholder="Your password" required
          errorMessage="Your password is required."/>
        <Input label="My New Password" name="new_password" type="password" placeholder="Your new password" required
          errorMessage="Your new password is required."/>
      </Form>
    )
  }
}

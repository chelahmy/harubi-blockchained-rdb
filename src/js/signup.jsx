import React from 'react'
import BackendRequest from './serve'
import Form from './components/form'
import Input from './components/input'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnFormMount = this.handleOnFormMount.bind(this)
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
  }

  handleOnFormMount(obj) {
    this.form = obj
  }

  handleOnFormSubmit(ev,frm) {
    // Get data from the form
    let data = new FormData(ev.target)
    BackendRequest({ // params
      model: 'user',
      action: 'signup',
      name: data.get('name'),
      password: data.get('password'),
      email: data.get('email')
    },
    (resp) => { // success
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
        submitValue="Sign Up" wantReset
        onMount={this.handleOnFormMount}>
        <Input label="Name" name="name" type="text" placeholder="Your user name" pattern="alpha_numeric" required
          errorMessage="An alpha-numeric user name is required. Spaces and symbols are not allowed."/>
        <Input label="E-mail" name="email" type="text" placeholder="Your e-mail address" pattern="email" required
          errorMessage="A valid e-mail address is required."/>
        <Input label="Password" name="password" type="password" placeholder="Your password" required
          errorMessage="Password is required."/>
        <Input label="Re-Enter Password" name="re_password" type="password" placeholder="Re-enter your password" required
          dataEqualTo="password" errorMessage="Passwords mismatched."/>
      </Form>
    )
  }
}

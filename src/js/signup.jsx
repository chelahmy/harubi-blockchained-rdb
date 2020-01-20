import React from 'react'
import Form from './form'
import Input from './input'

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
    console.log("Form id "+frm.attr('id')+" is valid");
    // ajax post form
    let data = new FormData(ev.target)
    console.log(data)
    let name = data.get('name')
    console.log('name = ' + name)
    console.log('email = ' + data.get('email'))
    console.log('password = ' + data.get('password'))
    /*
        fetch('/api/form-submit-url', {
          method: 'POST',
          body: data,
        });
    */
    this.form.callOut('Alert', 'User name <em>' + name + '</em> was already taken.', 'alert')
  }

  render() {
    return (
      <Form
        title={this.props.title}
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

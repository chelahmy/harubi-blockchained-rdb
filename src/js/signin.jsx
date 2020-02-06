import React from 'react'
import {SetSignedInUser, UnrefSignedInUser} from './utils'
import BackendRequest from './serve'
import Form from './form'
import Input from './input'

export function SignOut() {
  BackendRequest({ // params
    model: 'user',
    action: 'signout'
  })
  UnrefSignedInUser()
}

export default class SignIn extends React.Component {
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
    let name = data.get('name')
    BackendRequest({ // params
      model: 'user',
      action: 'signin',
      name: name,
      password: data.get('password')
    },
    (resp) => { // success
      if (typeof resp.results !== 'undefined')
        SetSignedInUser(resp.results)
      else
        SetSignedInUser({admin: 0, name: name})
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
        submitValue="Sign In"
        onMount={this.handleOnFormMount}>
        <Input label="Name" name="name" type="text" placeholder="Your user name" pattern="alpha_numeric" required
          errorMessage="An alpha-numeric user name is required. Spaces and symbols are not allowed."/>
        <Input label="Password" name="password" type="password" placeholder="Your password" required
          errorMessage="Password is required."/>
      </Form>
    )
  }
}

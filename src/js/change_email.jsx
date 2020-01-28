import React from 'react'
import Form from './form'
import Input from './input'

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
    // Get data from the form
    let data = new FormData(ev.target)
    let name = data.get('name')
    this.new_email = data.get('email')
    let request = {
      model: 'user',
      action: 'update_own',
      name: name,
      email: this.new_email
    }
    // Post the data to the server
    fetch('/backend/serve.php', {
      method: 'POST',
      body: new URLSearchParams($.param(request))
    })
    // On server response
    .then((respond) => {
      if (respond.ok) // See the fetch() documentation for details
        return respond.json() // pass to the next .then as resp_json
      else
        this.form.callOut('Server Error', 'Could not process the request', 'alert')
    })
    // On server respond.ok (see above)
    .then((resp_json) => {
      // Application implemented response
      if (resp_json.status != 0) {
        console.log(this.new_email);
        if (typeof window.user !== 'undefined')
            window.user.email = this.new_email
        this.props.page.navigate(this.props.onSuccessPage)
      }
      else
        this.form.callOut('Server Response', resp_json.error_message, 'alert')
    })
    // On client or network error
    .catch((error) => {
      this.form.callOut('System Error', 'Could not deliver the request: ' + error, 'alert')
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
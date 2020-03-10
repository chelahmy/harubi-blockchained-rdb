import React from 'react'

export default class TextArea extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let textarea, inprops = {}

    if (typeof this.props.name !== 'undefined') {
      inprops.name = this.props.name
      inprops.id = this.props.name
    }

    if (typeof this.props.type !== 'undefined')
      inprops.type = this.props.type

    if (typeof this.props.placeholder !== 'undefined')
      inprops.placeholder = this.props.placeholder

    if (typeof this.props.defaultValue !== 'undefined')
      inprops.defaultValue = this.props.defaultValue

    if (typeof this.props.pattern !== 'undefined')
      inprops.pattern = this.props.pattern

    if (typeof this.props.required !== 'undefined')
      inprops.required = true

    if (typeof this.props.dataEqualTo !== 'undefined')
      inprops['data-equalto'] = this.props.dataEqualTo

    if (typeof this.props.dataValidator !== 'undefined')
      inprops['data-validator'] = this.props.dataValidator

    inprops.style = {height: "auto"}

    textarea = React.createElement('textarea', inprops)

    return (
      <div>
        <label>{this.props.label}
          {textarea}
          <span class="form-error" data-form-error-for={this.props.name}>
            {this.props.errorMessage}
          </span>
        </label>
        <p class="help-text">{this.props.helpText}</p>
      </div>
    )
  }
}

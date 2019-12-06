import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let inprops = {}

    if (typeof this.props.name !== 'undefined') {
      inprops.name = this.props.name
      inprops.id = this.props.name
    }

    if (typeof this.props.type !== 'undefined')
      inprops.type = this.props.type

    if (typeof this.props.placeholder !== 'undefined')
      inprops.placeholder = this.props.placeholder

    if (typeof this.props.pattern !== 'undefined')
      inprops.pattern = this.props.pattern

    if (typeof this.props.required !== 'undefined')
      inprops.required = true

    if (typeof this.props.dataEqualTo !== 'undefined')
      inprops['data-equalto'] = this.props.dataEqualTo

    let input = React.createElement('input', inprops)

    return (
      <label>{this.props.label}
        {input}
        <span class="form-error" data-form-error-for={this.props.name}>
          {this.props.errorMessage}
        </span>
      </label>
    )
  }
}

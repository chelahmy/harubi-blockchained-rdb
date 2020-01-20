import React from 'react'

export default class Callout extends React.Component {
  constructor(props) {
    super(props)

    if (typeof window.page_callout_id === 'undefined')
      window.page_callout_id = 0;

    props.myid = 'page_callout_' + ++(window.page_callout_id); // support multiple bodies
    this.myRef = React.createRef();
  }

  show(title, message, type = '') {
    const ele = this.myRef.current
    if (typeof ele !== 'undefined') {
      let title_ele = $(ele).find('#callout_title')
      if (title_ele.length > 0)
        $(title_ele[0]).html(title)
      let msg_ele = $(ele).find('#callout_message')
      if (msg_ele.length > 0)
        $(msg_ele[0]).html(message)
      $(ele).removeClass('hide secondary primary success warning alert')
      if (type.length > 0)
        $(ele).addClass(type)
      $(ele).show()
    }

  }

  hide() {
    const ele = this.myRef.current
    if (typeof ele !== 'undefined') {
      let title_ele = $(ele).find('#callout_title')
      if (title_ele.length > 0)
        $(title_ele[0]).empty()
      let msg_ele = $(ele).find('#callout_message')
      if (msg_ele.length > 0)
        $(msg_ele[0]).empty()
      $(ele).removeClass('secondary primary success warning alert')
      $(ele).addClass('hide')
      $(ele).hide()
    }
  }

  componentDidMount() {
    if (typeof this.props.onMount !== 'undefined')
      this.props.onMount(this)
  }

  render() {
    return (
      <div class="callout hide" ref={this.myRef} id={this.props.myid}>
        <h5 id="callout_title">{this.props.title}</h5>
        <p id="callout_message">{this.props.message}</p>
      </div>
    )
  }
}

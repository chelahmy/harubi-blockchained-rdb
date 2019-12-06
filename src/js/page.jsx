import React from 'react'
import {Settings, GetPageSettings} from './_settings'
import Header from './header'
import Body from './body'
import SignUp from './signup'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.state = {page_name: 'home'}
  }

  handleMenuClick(item) {
    console.log(item)
    if (item == 'back') {
      // some back button presses may point to certain pages
      item = 'home'
    }
    this.setState({page_name: item})
  }

  render() {
    const page = this.state.page_name
    let menu, button_menu, body
    let want_back_button = true
    let page_settings = GetPageSettings(page)
    let title = page_settings.title

    if (typeof page_settings.menu !== 'undefined')
      menu = page_settings.menu

    if (typeof page_settings.button_menu !== 'undefined')
      button_menu = page_settings.button_menu

    if (typeof page_settings.body !== 'undefined') {
      let comp = page_settings.body.component
      if (comp == 'body')
        body = (<Body title={title} src={page_settings.body.content}/>)
      else if (comp == 'signup')
        body = (<SignUp title={title}/>)
    }

    if (page == 'home')
      want_back_button = false

    return (
      <div class="grid-container">
        <div class="grid-x grid-margin-x">
          <div class="cell">
            <Header
              title={this.props.title}
              menu={menu}
              want_back_button={want_back_button}
              button_menu={button_menu}
              onMenuClick={this.handleMenuClick}/>
          </div>
          <div class="cell">
            {body}
          </div>
        </div>
      </div>
    )
  }
}

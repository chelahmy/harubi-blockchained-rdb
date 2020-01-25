import React from 'react'
import {GetMenuLabel, GetPageSettings} from './_settings'
import Header from './header'
import Body from './body'
import SignUp from './signup'
import SignIn, {SignOut} from './signin'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.assignUserMenus = this.assignUserMenus.bind(this)
    this.state = {page_name: 'home'}
  }

  navigate(page, param) {
    console.log('navigate: ' + page)
    if (page == 'signout') {
      SignOut()
      page = 'signedout'
    }
    else if (page == '_back') { // navigate to the previous page
      // TODO: Restore previous state
      page = 'home' // default (and TODO: clear page states)
    } else {
      // TODO: Preserve current state
    }
    this.setState({page_name: page, page_param: param})
  }

  // Default user menus are signup, signin and signout.
  // All disallowed menus will be removed.
  assignUserMenus(page, menu, button_menu) {
    if (page != 'signup' && page != 'signin' && page != 'signout') {
      if (typeof menu === 'undefined')
        menu = []
      if (typeof window.user === 'undefined') {
        // If user has not signed in
        if (typeof button_menu === 'object') {
          menu.push(button_menu) // downgrade button_menu
        }
        menu.push({name: 'signin', label: GetMenuLabel('signin')})
        button_menu = {name: 'signup', label: GetMenuLabel('signup')}
      }
      else {
        if (page != 'profile')
          menu.push({name: 'profile', label: GetMenuLabel('profile')})
        menu.push({name: 'signout', label: GetMenuLabel('signout')})
      }
    }
    return {menu: menu, button_menu: button_menu}
  }

  componentDidMount() {
    window.pageNavigate = (page, param) => {
      this.navigate(page, param)
    }
  }

  render() {
    const page = this.state.page_name
    const param = this.state.page_param
    let menu, button_menu, body
    let want_back_button = true
    let page_settings = GetPageSettings(page)
    let title = page_settings.title

    if (typeof page_settings.menu !== 'undefined')
      menu = page_settings.menu

    if (typeof page_settings.button_menu !== 'undefined')
      button_menu = page_settings.button_menu

    let signing = this.assignUserMenus(page, menu, button_menu)
    menu = signing.menu
    button_menu = signing.button_menu

    if (typeof page_settings.body !== 'undefined') {
      let comp = page_settings.body.component
      if (comp == 'body')
        body = (<Body title={title} src={page_settings.body.content}
          column={page_settings.body.column} page={this} pageParam={param}/>)
      else if (comp == 'signup')
        body = (<SignUp title={title} page={this} pageParam={param} onSuccessPage="signedup"/>)
      else if (comp == 'signin')
        body = (<SignIn title={title} page={this} pageParam={param} onSuccessPage="signedin"/>)
    }

    if (['home', 'signedin', 'signedout', 'signedup'].includes(page))
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
              onMenuClick={this.navigate}/>
          </div>
          <div class="cell">
            {body}
          </div>
        </div>
      </div>
    )
  }
}

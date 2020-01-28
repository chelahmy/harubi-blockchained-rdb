import React from 'react'
import {GetMenuLabel, GetPageSettings} from './_settings'
import Header from './header'
import Body from './body'
import SignUp from './signup'
import SignIn, {SignOut} from './signin'
import ChangeEmail from './change_email'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
    this.assignUserMenus = this.assignUserMenus.bind(this)
    this.state = {page_name: 'home'}
    window.pageStack = []
  }

  navigate(page, param) {
    console.log('navigate: ' + page)
    if (page == 'signedin')
      console.log(window.user);
    if (page == 'signout') {
      SignOut()
      page = 'signedout'
    }
    else if (page == '_back') { // navigate to the previous page
      if (typeof window.pageStack !== 'undefined' &&
        window.pageStack.length > 0) {
        let item = window.pageStack.pop()
        page = item.page
        param = item.param
      }
      else {
        page = 'home'
        param = undefined
      }
    }
    else if (['home', 'signedin', 'signedout', 'signedup'].includes(page))
      window.pageStack = []
    else {
      if (typeof window.pageStack === 'undefined')
        window.pageStack = []
      window.pageStack.push({page: this.state.page_name, param: this.state.page_param})
    }
    this.setState({page_name: page, page_param: param})
  }

  // Default user menus are signup, signin, signout and profile.
  // The administrator user has admin menu.
  assignUserMenus(page, menu, button_menu) {
    if (!['signup', 'signin', 'signout'].includes(page)) {
      // If page is not signup, signin or signout then
      // add default user menus
      if (typeof menu === 'undefined')
        menu = []
      if (typeof window.user === 'undefined') {
        // If user has not signed in then
        // add signup and signin menus
        if (typeof button_menu === 'object') {
          menu.push(button_menu) // downgrade button_menu
        }
        menu.push({name: 'signin', label: GetMenuLabel('signin')})
        button_menu = {name: 'signup', label: GetMenuLabel('signup')}
      }
      else {
        // If user has signed in then
        // add profile and signout menus
        // and admin menu if the user is the administrator
        if (page != 'profile')
          menu.push({name: 'profile', label: GetMenuLabel('profile')})
        if (window.user.admin == 1 && page != 'admin')
          menu.push({name: 'admin', label: GetMenuLabel('admin')})
        menu.push({name: 'signout', label: GetMenuLabel('signout')})
      }
    }
    return {menu: menu, button_menu: button_menu}
  }

  componentDidMount() {
    // Declare global function pageNavigate()
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
      else if (comp == 'change_email')
        body = (<ChangeEmail title={title} page={this} pageParam={param} onSuccessPage="_back"/>)
    }

    if (typeof window.pageStack === 'undefined' || window.pageStack.length <= 0)
      want_back_button = false

    return (
      <div class="grid-container">
        <div class="grid-x grid-margin-x">
          <div class="cell">
            <Header
              applicationTitle={this.props.applicationTitle}
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

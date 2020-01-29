import Settings from './_settings'

function GetMenuLabel(menu_item) {
  return Settings.menu[menu_item]
}

function GetPageSettings(page) {
  let settings = {}
  if (typeof Settings.pages[page] !== 'undefined') {
    let page_item = Settings.pages[page]
    if (typeof page_item.title !== 'undefined')
      settings.title = page_item.title
    if (typeof page_item.want_title_bar !== 'undefined')
      settings.want_title_bar = page_item.want_title_bar
    if (typeof page_item.menu !== 'undefined')
      settings.menu = page_item.menu.map((menu_item) => ({
        name: menu_item,
        label: Settings.menu[menu_item]
      }))
    if (typeof page_item.button_menu !== 'undefined') {
      let menu_item = page_item.button_menu;
      settings.button_menu = {
        name: menu_item,
        label: Settings.menu[menu_item]
      }
    }
    if (typeof page_item.body !== 'undefined')
      settings.body = page_item.body
  }
  return settings
}

function SetSignedInUser(user) {
  window.user = user
}

function SetSignedInUserEmail(email) {
  if (typeof window.user !== 'undefined')
    window.user.email = email
}

function GetSignedInUser() {
  return window.user
}

function IsUserSignedIn() {
  if (typeof window.user !== 'undefined' &&
    typeof window.user.name !== 'undefined' &&
    window.user.name.length > 0)
    return true
  return false
}

function IsSignedInUserAdmin() {
  if (typeof window.user !== 'undefined' &&
    typeof window.user.name !== 'undefined' &&
    window.user.name.length > 0 &&
    typeof window.user.admin !== 'undefined' &&
    window.user.admin == 1)
    return true
  return false
}

function UnrefSignedInUser() {
  if (typeof window.user !== 'undefined')
    window.user = undefined
}

function PushPage(page, param) {
  if (typeof window.pageStack === 'undefined')
    window.pageStack = []
  window.pageStack.push({page: page, param: param})
}

function PopPage() {
  if (typeof window.pageStack !== 'undefined' &&
    window.pageStack.length > 0) {
    return window.pageStack.pop()
  }
}

function PageStackLength() {
  if (typeof window.pageStack === 'undefined')
    return 0
  return window.pageStack.length
}

function ClearPageStack() {
  window.pageStack = []
}

export {
  Settings as default,
  GetMenuLabel,
  GetPageSettings,
  SetSignedInUser,
  SetSignedInUserEmail,
  GetSignedInUser,
  IsUserSignedIn,
  IsSignedInUserAdmin,
  UnrefSignedInUser,
  PushPage,
  PopPage,
  PageStackLength,
  ClearPageStack
}

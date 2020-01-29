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

export {Settings as default, GetMenuLabel, GetPageSettings}

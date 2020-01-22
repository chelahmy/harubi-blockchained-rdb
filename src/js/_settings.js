const Settings = {
  title: "Harubi Front",
  menu: {
    home: 'Home',
    about: 'About',
    signup: 'Sign Up',
    signin: 'Sign In',
    signout: 'Sign Out'
  },
  pages: {
    home: {
      title: 'Home',
      menu: ['about'],
      body: {
        component: 'body',
        content: 'home.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    about: {
      title: 'About',
      menu: ['home'],
      body: {
        component: 'body',
        content: 'about.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signin: {
      title: 'Sign In',
      menu: ['home'],
      body: {
        component: 'signin'
      }
    },
    signup: {
      title: 'Sign Up',
      menu: ['home'],
      body: {
        component: 'signup'
      }
    },
    signedup: {
      title: 'Signed Up',
      menu: ['home'],
      body: {
        component: 'body',
        content: 'signedup.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedin: {
      title: 'Signed In',
      menu: ['home'],
      body: {
        component: 'body',
        content: 'signedin.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedout: {
      title: 'Signed Out',
      menu: ['home'],
      body: {
        component: 'body',
        content: 'signedout.html',
        column: 'wide' // narrow, medium, wide or full
      }
    }
  }
}

function GetMenuLabel(menu_item) {
  return Settings.menu[menu_item]
}

function GetPageSettings(page) {
  let settings = {}
  if (typeof Settings.pages[page] !== 'undefined') {
    let page_item = Settings.pages[page]
    if (typeof page_item.title !== 'undefined')
      settings.title = page_item.title
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

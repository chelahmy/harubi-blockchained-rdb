const Settings = {
  title: "Harubi Front",
  menu: {
    home: 'Home',
    about: 'About',
    signup: 'Sign Up',
    signin: 'Sign In',
    signout: 'Sign Out',
    profile: 'Profile',
    admin: 'Admin'
  },
  pages: {
    home: {
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
      menu: ['home', 'about'],
      body: {
        component: 'signin'
      }
    },
    signup: {
      title: 'Sign Up',
      menu: ['home', 'about'],
      body: {
        component: 'signup'
      }
    },
    signedup: {
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedup.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedin: {
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedin.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedout: {
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedout.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    profile: {
      title: 'My Profile',
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'profile.html',
        column: 'narrow' // wide, medium, wide or full
      }
    },
    change_email: {
      title: 'Change My Email Address',
      menu: ['home', 'about'],
      body: {
        component: 'change_email'
      }
    },
    admin: {
      title: 'Administration',
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'admin.html',
        column: 'narrow' // wide, medium, wide or full
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

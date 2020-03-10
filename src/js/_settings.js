const Settings = {
  application_title: "Harubi Blockchain Relational Database",
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
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'signin'
      }
    },
    signup: {
      title: 'Sign Up',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'signup'
      }
    },
    signedup: {
      title: 'Signed Up',
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedup.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedin: {
      title: 'Signed In',
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedin.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    signedout: {
      title: 'Signed Out',
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'signedout.html',
        column: 'wide' // narrow, medium, wide or full
      }
    },
    profile: {
      title: 'My Profile',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'profile.html',
        column: 'narrow' // wide, medium, wide or full
      }
    },
    change_email: {
      title: 'Change My Email Address',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'change_email'
      }
    },
    change_password: {
      title: 'Change My Password',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'change_password'
      }
    },
    cancel_account: {
      title: 'Cancel My Account',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'cancel_account'
      }
    },
    admin: {
      title: 'Administration',
      want_title_bar: true,
      menu: ['home', 'about'],
      body: {
        component: 'body',
        content: 'admin.html',
        column: 'narrow' // wide, medium, wide or full
      }
    }
  }
}

export {Settings as default}

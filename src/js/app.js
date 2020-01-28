import $ from 'jquery'

require('what-input')
window.$ = $

import Settings from './_settings'
const app_title = Settings.title
document.title = app_title

$(document).ready(() => {
    $(document).foundation()
    // Note: ReactDOM.render() MUST NOT be placed here.
    // Otherwise, foundation() will not take effect on
    // react components such as Header which implements
    // Foundation responsive menu.
})

import Foundation from 'foundation-sites'
import React from 'react'
import ReactDOM from 'react-dom'
import Page from './page'

ReactDOM.render(
  <Page applicationTitle={app_title}/>,
  document.getElementById('page')
)

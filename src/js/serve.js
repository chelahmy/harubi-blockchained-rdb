import {UnrefSignedInUser, SetPageMessage} from './utils'

function BackendRequest(param, success, error, reset) {
  // Post the data to the server
  fetch('/backend/serve.php', {
    method: 'POST',
    body: new URLSearchParams($.param(param))
  })
  // On server response
  .then((respond) => {
    if (respond.ok) // See the fetch() documentation for details
      return respond.json() // pass to the next .then as resp_json
    else if (typeof error === 'function')
      error('Server Error', 'Could not process the request')
  })
  // On server respond.ok (see above)
  .then((resp_json) => {
    // Application implemented response
    if (resp_json.status != 0) {
      if (typeof success === 'function')
        success(resp_json)
    }
    else if (resp_json.error_code == 1000) { // "You have not signed in or your session expired."
      UnrefSignedInUser()
      SetPageMessage('Server Response', resp_json.error_message, 'alert')
      if (typeof reset === 'function')
        reset()
    }
    else if (typeof error === 'function')
      error('Server Response', resp_json.error_message)
  })
  // On client or network error
  .catch((error) => {
    if (typeof error === 'function')
      error('System Error', 'Could not deliver the request: ' + error)
  })
}

export {BackendRequest as default}

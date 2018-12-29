const download = require('downloadjs')

const handle_error = (msg) => window.alert(msg)

const downloadFile = function(URL) {
  try {
    const ajax = download(URL)

    const onload = ajax.onload

    ajax.onload = (e) => {
      const code = ajax.status
      if (code < 200 || code >= 300)
        handle_error(`download error: ${ajax.status}`)
      else
        onload(e)
    }

    ajax.onerror = (e) => {
      if (ajax.status)
        handle_error(`download error: ${ajax.status}`)
      else
        handle_error(`download error: XHR failed`)
    }
  }
  catch(err) {
    handle_error(`download error: ${err.message}`)
  }
}

module.exports = downloadFile

// throws
const url_status = (URL) => {
  try {
    const http = new XMLHttpRequest()
    http.open('HEAD', URL, false)
    http.send()
    return http.status
  }
  catch(err) {
    // probably CORS
    console.log(`XHR error: ${err.message}`)

    return 299
  }
}

const extract_filename = (URL) => {
  if (!URL) return ''

  const regex = /\/([^\/]+\.[^\/\.]{1,4})(?:[\?#]|$)/
  const match = String(URL).match(regex)
  if (match && (match.length >= 2)) return match[1]

  return ''
}

const downloadFile = function(URL) {
  try {
    const status_code = url_status(URL)

    if ((status_code < 200) || (status_code >= 300))
      throw new Error(status_code)

    const filename = extract_filename(URL)

    const a = window.document.createElement("a")
    a.href = URL
    a.setAttribute("target",   "_blank")
    a.setAttribute("download", filename)

    const e = window.document.createEvent("MouseEvents")
    e.initEvent("click", false, true)

    a.dispatchEvent(e)
  }
  catch(err) {
    window.alert(`download error: ${err.message}`)
  }
}

module.exports = downloadFile

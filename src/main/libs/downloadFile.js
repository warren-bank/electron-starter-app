const path  = require('path')
const fs    = require('fs')

const {app, dialog} = require('electron')
const fetch         = require('electron-fetch').default

// -----------------------------------------------------------------------------

const extract_filename = (header, URL) => {
  const filename = extract_filename_header(header) || extract_filename_URL(URL) || ''
  return filename
}

const extract_filename_header = (header) => {
  if (!header) return ''

  let regex, match

  regex = /filename=(['"])([^\1]+)\1/i
  match = String(header).match(regex)
  if (match && (match.length >= 3)) return match[2]

  regex = /filename=([^\s]+)(?:[\s]|$)/i
  match = String(header).match(regex)
  if (match && (match.length >= 2)) return match[1]

  return ''
}

const extract_filename_URL = (URL) => {
  if (!URL) return ''

  const regex = /\/([^\/]+\.[^\/\.]{1,4})(?:[\?#]|$)/
  const match = String(URL).match(regex)
  if (match && (match.length >= 2)) return match[1]

  return ''
}

// -----------------------------------------------------------------------------

const downloadFile = function(browserWindow, URL) {
  return fetch(URL)
    .then(res => {
      if (!res.ok) throw new Error(res.status)

      return res
    })
    .then(res => {
      const default_filename = extract_filename(res.headers.get('content-disposition'), URL)
      const default_filepath = default_filename
        ? path.join(app.getPath('downloads'), default_filename)
        : app.getPath('downloads')
      const dialogOptions = {defaultPath: default_filepath}

      return new Promise((resolve, reject) => {
        dialog.showSaveDialog(browserWindow, dialogOptions, (filename) => {
          resolve([res, filename])
        })
      })
    })
    .then(([res, filename]) => {
      if (!filename) return false

      return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(filename)
        dest.on('error',  (error) => reject(error))
        dest.on('finish', ()      => resolve(true))

        res.body.pipe(dest)
      })
    })
}

module.exports = downloadFile

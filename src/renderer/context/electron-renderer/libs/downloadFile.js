const {ipcRenderer} = require('electron')

const downloadFile = function(URL) {
  ipcRenderer.send('download-file', URL)
}

module.exports = downloadFile

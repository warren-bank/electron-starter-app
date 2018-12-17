const {app, Menu, ipcMain, BrowserWindow, dialog} = require('electron')
const {makePortable, setPortablePaths}            = require('@warren-bank/electron-portable-paths')

const utils        = require('common/utils')
const downloadFile = require('libs/downloadFile')
const appMenu      = require('menus/app')

const show_dialog = (message, is_error) => {
  const options = {
    message,
    type: is_error ? 'error' : 'info'
  }
  dialog.showMessageBox(mainWindow, options)
}

makePortable(app)
setPortablePaths(app)

let mainWindow
app.on('ready', () => {
  const URL = utils.convert_relative_filepath_to_URL(app, 'index.html')

  mainWindow = new BrowserWindow()
  mainWindow.loadURL(URL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menu = appMenu.build(show_dialog)
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('download-file', (event, URL) => {
  downloadFile(mainWindow, URL)
  .then(success => {
    const message = `download completed: ${success ? '' : 'un'}successfully`
    show_dialog(message, false)
  })
  .catch(err => {
    const message = `download error: ${err.message}`
    show_dialog(message, true)
  })
})

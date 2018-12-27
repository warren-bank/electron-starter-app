const {app, Tray, Menu, ipcMain, BrowserWindow, dialog} = require('electron')
const {makePortable, setPortablePaths}                  = require('@warren-bank/electron-portable-paths')

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

let trayIcon, mainWindow
app.on('ready', () => {
  const icon = utils.resolve_relative_filepath(app, 'assets', 'icons', (process.platform === 'win32') ? 'icon.ico' : 'icon.png')
  const URL  = process.env.dev_server_url
                 ? process.env.dev_server_url
                 : utils.convert_relative_filepath_to_URL(app, 'index.html')

  trayIcon = new Tray(icon)
  trayIcon.setToolTip(app.getName())

  trayIcon.on('click', () => {
    if (!mainWindow) {
      trayIcon.destroy()
      app.quit()
    }

    const isMinimized = mainWindow.isMinimized()
    const isVisible   = mainWindow.isVisible()

    if (isMinimized)
      mainWindow.restore()
    else if (!isVisible)
      mainWindow.show()

    mainWindow.focus()
  })

  mainWindow = new BrowserWindow({icon})
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

app.on('before-quit', () => {
  // Make sure tray icon gets removed if the user exits via CTRL-Q
  if (trayIcon && process.platform === 'win32') {
    trayIcon.destroy()
  }
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

const {app, Menu} = require('electron')

const build = (show_dialog) => {
  const template = []

  template.push({
    label: '&View',
    submenu: [{
      role: 'togglefullscreen'
    }, {
      type: 'separator'
    }, {
      role: 'resetzoom'
    }, {
      role: 'zoomin'
    }, {
      role: 'zoomout'
    }, {
      type: 'separator'
    }, {
      label: 'Toggle Developer Tools',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }]
  })

  template.push({
    label: '&Window',
    submenu: [{
      role: 'minimize'
    }, {
      role: 'close'
    }]
  })

  template.push({
    label: '&Help',
    submenu: [{
      role: 'about',
      label: 'About',
      click: () => {
        const message = `${app.getName()} ${app.getVersion()}`
        show_dialog(message, false)
      }
    }]
  })

  return Menu.buildFromTemplate(template)
}

module.exports = {build}

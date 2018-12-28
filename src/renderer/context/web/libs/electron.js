const electron = {
  remote: {
    app: {
      getAppPath: () => {
        return window.location.href.replace(/[^\/]*$/, '')
      }
    }
  }
}

module.exports = electron

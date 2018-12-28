const React         = require('react')

const {remote}      = require('libs/electron')
const utils         = require('libs/utils')
const downloadFile  = require('libs/downloadFile')
const is_electron   = require('libs/is_electron_renderer')
const is_web        = !is_electron

const preloadJS = utils.convert_relative_filepath_to_URL(remote.app, 'bundles/webview.js')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      URL_webview: ""
    }

    this.init_download = this.init_download.bind(this)
    this.open_webview  = this.open_webview.bind(this)
  }

  init_download(event) {
    const URL = event.target.value

    if (URL) {
      downloadFile(URL)

      event.target.selectedIndex = 0
    }
  }

  open_webview(event) {
    const URL = event.target.value

    this.setState({URL_webview: URL})
  }

  render() {
    return (
      <div className="component app">
        <h3>Download File:</h3>
        <select defaultValue="" onChange={this.init_download}>
          <option value=""></option>
          <option value="https://github.com/warren-bank/electron-starter-app/archive/master.zip">git repo: zip</option>
          <option value="https://github.com/warren-bank/does-not-exist/archive/master.zip">error: 404 Not Found</option>
        </select>

        <h3>Load URL in WebView:</h3>
        <select value={this.state.URL_webview} onChange={this.open_webview}>
          <option value=""></option>
          <option value="https://github.com/warren-bank/electron-starter-app/blob/master/README.md">git repo: README</option>
          <option value="https://github.com/warren-bank/does-not-exist/blob/master/README.md">error: 404 Not Found</option>
          <option value="https://google.com/">google: homepage</option>
        </select>

        {
          this.state.URL_webview &&
            <webview
              preload={preloadJS}
              src={this.state.URL_webview}
            >
              {
                is_web &&
                  <iframe
                    src={this.state.URL_webview}
                    frameborder='0'
                    sandbox='allow-same-origin'
                    referrerpolicy='origin'
                  />
              }
            </webview>
        }
      </div>
    )
  }
}

module.exports = App

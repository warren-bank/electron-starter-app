const utils = {}

utils.convert_relative_filepath_to_URL = (app, filepath) => `file://${app.getAppPath()}/${filepath}`

module.exports = utils

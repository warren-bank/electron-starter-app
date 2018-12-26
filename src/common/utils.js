const path = require('path')

const utils = {}

utils.resolve_relative_filepath = (app, filepath) => path.resolve(app.getAppPath(), filepath)

utils.convert_relative_filepath_to_URL = (app, filepath) => 'file://' + utils.resolve_relative_filepath(app, filepath).replace(/[\\]/g, '/')

module.exports = utils

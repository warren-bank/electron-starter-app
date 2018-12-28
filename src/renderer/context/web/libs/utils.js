const utils = {}

utils.resolve_relative_filepath = (app, ...filepath) => app.getAppPath() + filepath.join('/').replace(/[\\]/g, '/')

utils.convert_relative_filepath_to_URL = utils.resolve_relative_filepath

module.exports = utils

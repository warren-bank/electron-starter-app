const is_electron_renderer = (process && process.type === 'renderer')

module.exports = is_electron_renderer

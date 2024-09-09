const PlaywrightRunner =
  require('jest-playwright-preset/lib/PlaywrightRunner').default

class SerialRunner extends PlaywrightRunner {
  constructor(...args) {
    super(...args)
    this.isSerial = true
  }
}

module.exports = SerialRunner

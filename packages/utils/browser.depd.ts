// A lightweight alternative to "depd" that works in the browser
// source: https://github.com/strongloop/loopback-datasource-juggler/blob/934786200b0180ed3d3cf45f78986b2019511e79/lib/browser.depd.js
const depd = namespace => {
  const warned = {}
  return message => {
    if (warned[message]) return
    warned[message] = true

    if (process.noDeprecation) {
      return
    } else if (process.traceDeprecation) {
      // eslint-disable-next-line no-console
      console.trace(namespace, "deprecated", message)
    } else {
      // eslint-disable-next-line no-console
      console.warn(namespace, "deprecated", message)
    }
  }
}

module.exports = depd

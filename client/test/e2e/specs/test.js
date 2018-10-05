// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// this is not doing anything.
process.env.MONGO_URL = process.env.MONGO_URL_TEST
console.log('mongo url', process.env.MONGO_URL)
console.log('nodenv', process.env.NODE_ENV)



module.exports = {
  'page load contents correctly': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      // .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Coffee Shops')
      .assert.elementCount('img', 1)
      .end()
  },

  'list of coffee shops visible': function(browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      // assert list of things visible
      .assert.containsText('body', 'Beans')
      .assert.containsText('body', '3 stars')
      .end()
  },

  'can add new coffee shop': function(browser) {

  },

  'can\'t add new coffee shop without a name': function(browser) {

  },

  'can change rating of existing coffee shop': function(browser) {

  }
}

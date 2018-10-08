// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

//process.env.MONGO_URL = process.env.MONGO_URL_TEST
//console.log('mongo url', process.env.MONGO_URL)
console.log('nodenv', process.env.NODE_ENV)
const MongoClient = require('mongodb').MongoClient
const dbUrl = require('../../../../src/db_config')



module.exports = {

  before: function(browser, done) {
    this.client = new MongoClient(dbUrl)
    this.client.connect().then( () => {
      this.db = this.client.db('test_todo')
      this.coffee_collection = this.db.collection('coffeeshops')
      this.coffee_collection.find().toArray().then(docs => {
        console.log(docs)
      //  done()
    })
      //console.log(docs)
      done()
    }).catch((err) => {
      done(err) // TODO fail test
    })
  },

  beforeEach: function(browser, done) {
    console.log('wipe test db here')
      this.coffee_collection.deleteMany().then((err, reply) =>{
        done()
    }).catch(err => done(err))
  },

  after: function(browser, done) {
    this.client.close()
    done()
  },

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
      .assert.containsText('body', 'No Coffee Shops')
      // and form and list with no elements in
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

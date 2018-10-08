// // For authoring Nightwatch tests, see
// // http://nightwatchjs.org/guide#usage
//
// //process.env.MONGO_URL = process.env.MONGO_URL_TEST
// //console.log('mongo url', process.env.MONGO_URL)
// console.log('nodenv', process.env.NODE_ENV)
// const MongoClient = require('mongodb').MongoClient
// const dbConfig = require('../../../../src/db_config')
//
// let mongo_db;
// let coffee_collection;
//
// module.exports = {
//
//   before: function(browser, done) {
//     MongoClient.connect(dbConfig).then((err, db) => {
//       mongo_db = db
//       coffee_collection = mongo_db.collection('coffeeshops')
//     })
//   },
//
//   beforeEach: function(browser, done) {
//     console.log('wipe test db here')
//       coffee_collection.drop().then((err, reply) => {
//         coffee_collection.insertMany([
//           { name: 'Beans', stars: 4},
//           { name: 'Sporks', stars: 5},
//           { name: 'Pies', stars: 1},
//         ]).then(()=>{
//           done()
//         })
//     })
//   },
//
//   after: function(browser, done) {
//     mongo_db.close()
//   },
//
//   'page load contents correctly': function (browser) {
//     // automatically uses dev Server port from /config.index.js
//     // default: http://localhost:8080
//     // see nightwatch.conf.js
//     const devServer = browser.globals.devServerURL
//
//     browser
//       .url(devServer)
//       .waitForElementVisible('#app', 5000)
//       // .assert.elementPresent('.hello')
//       .assert.containsText('h1', 'Coffee Shops')
//       .assert.elementCount('img', 1)
//       .end()
//   },
//
//   'list of coffee shops visible': function(browser) {
//     const devServer = browser.globals.devServerURL
//
//     browser
//       .url(devServer)
//       .waitForElementVisible('#app', 5000)
//       // assert list of things visible
//       .assert.containsText('body', 'Beans')
//       .assert.containsText('body', '4 stars')
//       .assert.containsText('body', 'Sporks')
//       .assert.containsText('body', '5 stars')
//       .assert.containsText('body', 'Pies')
//       .assert.containsText('body', '1 star')
//
//       .end()
//   },
//
//   'can add new coffee shop': function(browser) {
//
//   },
//
//   'can\'t add new coffee shop without a name': function(browser) {
//
//   },
//
//   'can change rating of existing coffee shop': function(browser) {
//
//   }
// }

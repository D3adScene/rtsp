const express = require('express')
const fs = require('fs');
const path = require('path')
const status = require('../helpers/status')
const MongoClient = require('mongodb').MongoClient
const config = require('../conf')
const router = express.Router()

let DB = null

// connect only once
// https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connection-pooling
MongoClient.connect(config.mongodbConnection, (err, database) => {
  if (err) throw err
  // see https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function
  DB = database.db(config.dbName)
})

/**
 * @function login - login the user
 * @argument req - username & password
 * @returns status Object.
 */

router.post('/login', (req, res) => {
  const params = req.body || {}
  const isParamsOk = params.username && params.password
  try {
    const runLogin = new Promise((resolve, reject) => {
      if (isParamsOk) {
        const { username, password } = params
        const query = {
          username
        }
        DB.collection('users').findOne(query, (err, result) => {
          if (err) {
            reject(status.failedRes)
          } else if (result) {
            let isPasswordOk = result.password == password
            if (isPasswordOk) {
              resolve(status.successRes)
            } else {
              reject(status.badPassword)
            }
          } else {
            reject(status.badUsername)
          }
        })
      } else {
        reject(status.badData)
      }
    }).then(response => {
      res.send(response)
    }).catch(error => {
      res.send(error)
    })

  } catch (error) {
    console.error(e)
    res.send(status.failedRes)
  }
})

/**
 * @function upload - upload stsp url with the username
 * @argument req - username & rtspurl
 * @returns status Object.
 */
router.post('/upload', (req, res) => {
  const params = req.body || {}
  const isParamsOk = params.username && params.rtspUrl

  try {
    const runUpload = new Promise((resolve, reject) => {
      if (isParamsOk) {
        const { username, rtspUrl } = params
        const query = {
          rtspUrl,
          username
        }
        DB.collection('rtspUrls').insert(query, (err, result) => {
          if (result) {
            resolve(status.successRes)
          }
          else {
            reject(status.failedRes)
          }
        })
      } else {
        reject(status.badData)
      }
    })
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        res.send(error)
      })
  } catch (e) {
    throw e
  }

})
/**
 * @function getRtspUrlByUsername - get the rtsp uploaded list by username
 * @argument req - username
 * @returns status Object and rtspurlist.
 */
router.post('/getRtspUrlByUsername', (req, res) => {
  let params = req.body || {}
  let username = params.username

  const runGetRTSPList = new Promise((resolve, reject) => {
    if (username) {
      let query = {
        username
      }

      DB.collection('rtspUrls').find(query).toArray((err, result) => {
        if (result) {
          let filteredArray = []
          for (let i = 0; i < result.length; i++) {
            //return new array with only the user urls.
            filteredArray.push({
              url: result[i].rtspUrl
            })
          }
          status.successRes.data = filteredArray
          resolve(status.successRes)
        }
        else {
          reject(status.failedRes)
        }
      })
    } else {
      reject(res.send(status.badData))
    }
  }).then(response  => {
    res.send(response)
  }).catch(error => {
    res.send(error)
  })
})

module.exports = router

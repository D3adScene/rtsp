const failedRes = {
  status: 'FAILED',
  reason: 'Something went wrong',
  data: 'FAILED'
}

const badData =  Object.assign({},failedRes, {
  reason: 'Bad data',
  data: 'BAD_DATA'
})

const badRtspData =  Object.assign({},failedRes, {
  reason: 'Bad rtsp url',
  data: 'BAD_DATA'
})

const badUsername =  Object.assign({},failedRes, {
  reason: 'Bad username',
  data: 'BAD_USERNAME'
})

const badPassword = Object.assign({},failedRes, {
  reason: 'Bad password',
  data: 'BAD_PASSWORD'
})

const successRes = {
  status: 'SUCCESS',
  reason: '',
  data: 'SUCCESS'
}

module.exports = {
  successRes,
  badPassword,
  failedRes,
  badData,
  badRtspData,
  badUsername
}
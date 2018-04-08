/* global fetch */

import {delay} from 'redux-saga'
import {all, call, put, take, takeLatest, select} from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import {actionTypes, failure, loadDataSuccess, tickClock} from './actions'

es6promise.polyfill()

// 保存第一步数据
function * sendData1Saga (action) {
  try {
    const data = yield select();
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:1
      })
    });
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第二步数据
function * sendData2Saga (action) {
  try {
    const data = yield select();
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:2
      })
    });
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第三步数据
function * sendData3Saga (action) {
  try {
    const data = yield select();
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:3
      })
    });
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第四步数据
function * sendData4Saga (action) {
  try {
    const data = yield select();
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:4
      })
    });
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第五步数据
function * sendData5Saga (action) {
  try {
    const data = yield select();
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:5
      })
    });
  } catch (err) {
    yield put(failure(err))
  }
}
// 最后保存
function * sendDataSaga (getState) {
  try {
    const data = yield select();
    console.log('state after', data)
    fetch('http://192.168.2.100:8611/app/getMatchModeResult', {
      method: 'post',
      mode: 'cors',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        modeJson: JSON.stringify(data),
        step:0
      })
    });
    console.log(res,"res")
  } catch (err) {
    yield put(failure(err))
  }
}

function * loadDataSaga () {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
    takeLatest(actionTypes.SAVE_STEP1, sendData1Saga),
    takeLatest(actionTypes.SAVE_STEP2, sendData2Saga),
    takeLatest(actionTypes.SAVE_STEP3, sendData3Saga),
    takeLatest(actionTypes.SAVE_STEP4, sendData4Saga),
    takeLatest(actionTypes.SAVE_STEP5, sendData5Saga),
    takeLatest(actionTypes.SAVE_STEP6, sendDataSaga),
  ])
}

export default rootSaga
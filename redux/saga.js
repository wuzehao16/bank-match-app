/* global fetch */

import {delay} from 'redux-saga'
import {all, call, put, take, takeLatest, select} from 'redux-saga/effects'
import Router from 'next/router'
import { add } from '../services/match'

import {actionTypes, failure, loadDataSuccess, tickClock,cleanData} from './actions'


// 保存第一步数据
function * sendData1Saga (action) {
  try {
    const data = yield select();
    const res = yield call(add,data)
    yield put(loadDataSuccess(res.data))
    Router.push({
      pathname: '/matchstep2',
    })
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第二步数据
function * sendData2Saga (action) {
  try {
    const data = yield select();
    console.log(data,"这是第二步的")
    const res = yield call(add,data)
    yield put(loadDataSuccess(res.data))
    Router.push({
      pathname: '/matchstep3',
    })
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第三步数据
function * sendData3Saga (action) {
  try {
    const data = yield select();
    const res = yield call(add,data)
    yield put(loadDataSuccess(res.data))
    console.log(data)
    if (data.matchJson.basicInformation.occupation == 0|| data.matchJson.basicInformation.occupation==2) {
      Router.push({
        pathname: '/matchstep4',
      })
    } else {
      Router.push({
        pathname: '/matchstep5',
      })
    }

  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第四步数据
function * sendData4Saga (action) {
  try {
    const data = yield select();
    const res = yield call(add,data)
    yield put(loadDataSuccess(res.data))
    Router.push({
      pathname: '/matchstep5',
    })
  } catch (err) {
    yield put(failure(err))
  }
}
// 保存第五步数据
function * sendData5Saga (action) {
  try {
    const data = yield select();
    const res = yield call(add,data)
    yield put(loadDataSuccess(res.data))
    Router.push({
      pathname: '/matchstep6',
    })
  } catch (err) {
    yield put(failure(err))
  }
}
// 最后保存
function * sendDataSaga (action) {
  try {
    const data = yield select();
    const res = yield call(add,data)
    if (res.code ==0) {
      yield put(cleanData())
    }
    navigator.userAgent.match(/iPhone|iPad|iPod/i)
      ? window.webkit.messageHandlers.getMatchResult.postMessage(res.data)
      : window.androidRef.notifyMatchResult(res.data.matchNo);
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
function * sendBaseInformation (action) {
  try {
    console.log(action)
    const res = yield call(updateBaseInformation,action.data)
    console.log(res)
    yield put(loadDataSuccess(res.data))
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
    takeLatest(actionTypes.SEND_BASE_INFORMATION, sendBaseInformation),
  ])
}

export default rootSaga

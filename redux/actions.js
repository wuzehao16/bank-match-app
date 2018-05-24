export const actionTypes = {
  LOAD_DATA: 'LOAD_DATA',
  FAILURE:'FAILURE',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOADING_START:'LOADING_START',
  LOADING_END:'LOADING_END',
  CLEAN_DATA: 'CLEAN_DATA',
  SAVE_MODEL: 'SAVE_MODEL',
  SAVE_STEP1: 'SAVE_STEP1',
  SAVE_STEP2: 'SAVE_STEP2',
  SAVE_STEP3: 'SAVE_STEP3',
  SAVE_STEP4: 'SAVE_STEP4',
  SAVE_STEP5: 'SAVE_STEP5',
  SAVE_STEP6: 'SAVE_STEP6',
  SEND_BASE_INFORMATION:'SEND_BASE_INFORMATION',
}


export function failure (error) {
  console.log(error,"error")
  return {
    type: actionTypes.FAILURE,
    error
  }
}
export function loadData () {
  return {type: actionTypes.LOAD_DATA}
}
export function cleanData () {
  return {type: actionTypes.CLEAN_DATA}
}
export function loadingStart () {
  return {type: actionTypes.LOADING_START}
}
export function loadingEnd () {
  return {type: actionTypes.LOADING_END}
}

export function loadDataSuccess (data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  }
}

// step1
export function saveModel (data) {
  return {
    type: actionTypes.SAVE_MODEL,
    data
  }
}

export function saveStep1 (data) {
  return {
    type: actionTypes.SAVE_STEP1,
    data
  }
}

export function saveStep2 (data) {
  return {
    type: actionTypes.SAVE_STEP2,
    data
  }
}
// step3
export function saveStep3 (data) {
  return {
    type: actionTypes.SAVE_STEP3,
    data
  }
}
// step4
export function saveStep4 (data) {
  return {
    type: actionTypes.SAVE_STEP4,
    data
  }
}
// step5
export function saveStep5 (data) {
  return {
    type: actionTypes.SAVE_STEP5,
    data
  }
}
// step6
export function saveStep6 (data) {
  return {
    type: actionTypes.SAVE_STEP6,
    data
  }
}
// 招聘
export function sendBaseInformation (data) {
  return {
    type: actionTypes.SEND_BASE_INFORMATION,
    data
  }
}

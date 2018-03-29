export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  START_CLOCK: 'START_CLOCK',
  TICK_CLOCK: 'TICK_CLOCK',
  SAVE_STEP1: 'SAVE_STEP1',
  SAVE_STEP2: 'SAVE_STEP2',
  SAVE_STEP3: 'SAVE_STEP3',
  SAVE_STEP4: 'SAVE_STEP4',
  SAVE_STEP5: 'SAVE_STEP5',
  SAVE_STEP6: 'SAVE_STEP6',
}

export function failure (error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export function increment () {
  return {type: actionTypes.INCREMENT}
}

export function loadData () {
  return {type: actionTypes.LOAD_DATA}
}

export function loadDataSuccess (data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  }
}

export function startClock () {
  return {type: actionTypes.START_CLOCK}
}

export function tickClock (isServer) {
  return {
    type: actionTypes.TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  }
}
// step1
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

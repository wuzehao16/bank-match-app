import {actionTypes} from './actions'

export const exampleInitialState = {
  placeholderData: null,
  //贷款需求
  loanDemand: null,
  //基本信息
  basicInformation: null,
  //征信信息
  creditInformation: null,
  // 工作收入
  income: null,
  // 资产状况
  assets: null,
  //资产负债
  capitalDebtSituation: null,
}

function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{error: action.error}
      }

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{count: state.count + 1}
      }

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{placeholderData: action.data}
      }

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{lastUpdate: action.ts, light: !!action.light}
      }
      //分界
    case actionTypes.SAVE_STEP1:
      console.log("action",action)
      return {
        ...state,
        ...{loanDemand:action.data}
      }
    case actionTypes.SAVE_STEP2:
      console.log("action",action)
      return {
        ...state,
        ...{basicInformation:action.data}
      }
    case actionTypes.SAVE_STEP3:
      console.log("action",action)
      return {
        ...state,
        ...{creditInformation:action.data}
      }
    case actionTypes.SAVE_STEP4:
      console.log("action",action)
      return {
        ...state,
        ...{income:action.data}
      }
    case actionTypes.SAVE_STEP5:
      console.log("action",action)
      return {
        ...state,
        ...{assets:action.data}
      }
    case actionTypes.SAVE_STEP6:
      console.log("action",action)
      return {
        ...state,
        ...{capitalDebtSituation:action.data}
      }
    default:
      return state
  }
}

export default reducer

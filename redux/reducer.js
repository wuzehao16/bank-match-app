import {actionTypes} from './actions'

export const exampleInitialState = {
  matchStep: 0,
  product: null,
  loading: false,
  matchJson:{
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
}

function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{error: action.error}
      }

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{product: action.data}
      }
    case actionTypes.LOADING_START:
      return {
        ...state,
        ...{loading: true}
      }
    case actionTypes.LOADING_END:
      return {
        ...state,
        ...{loading: false}
      }

      //分界
    case actionTypes.SAVE_STEP1:
      return {
        matchStep: 1,
        matchJson:{
          ...state.matchJson,
          loanDemand:action.data
        }
      }
    case actionTypes.SAVE_STEP2:
      return {
        matchStep: 2,
        matchJson:{
          ...state.matchJson,
          basicInformation:action.data
        }
      }
    case actionTypes.SAVE_STEP3:
      return {
        matchStep: 3,
        matchJson:{
          ...state.matchJson,
          creditInformation:action.data
        }
      }
    case actionTypes.SAVE_STEP4:
      return {
        matchStep: 4,
        matchJson:{
          ...state.matchJson,
          income:action.data
        }
      }
    case actionTypes.SAVE_STEP5:
      return {
        matchStep: 5,
        matchJson:{
          ...state.matchJson,
          assets:action.data
        }
      }
    case actionTypes.SAVE_STEP6:
      return {
        matchStep: 0,
        matchJson:{
          ...state.matchJson,
          capitalDebtSituation:action.data
        }
      }
    default:
      return state
  }
}

export default reducer

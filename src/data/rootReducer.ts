import { combineReducers } from 'redux'
import caseSetsReducers, { CaseSetsState } from './caseSets/caseSetsReducers'

export interface RootState {
  caseSets: CaseSetsState
}

const rootReducer = combineReducers({
  caseSets: caseSetsReducers,
})

export default rootReducer

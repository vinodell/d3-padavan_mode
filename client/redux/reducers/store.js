import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import graphic from './graphic'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    graphic
  })
}

export default createRootReducer

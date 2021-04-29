import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import graphic from './graphic'
import graphic_age from './graphic_age'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    graphic,
    graphic_age
  })
}

export default createRootReducer

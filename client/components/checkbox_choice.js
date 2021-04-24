import React, { useState, useReducer, useEffect } from 'react'

import info from '../../data.json'
// import reducerFunc from './reducer'

const SWITCH_FLAG = 'SWITCH_FLAG'
const SWITCH_ALL = 'SWITCH_ALL'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1]
}, []) // отбираем поле level_1 для чекбоксов
const [...checkBoxData] = new Set(getLevel1Info) // убираем дуликаты
const checkBoxChoices = checkBoxData.reduce((acc, rec) => {
  return { ...acc, [rec]: false } // создаем объект level_1: boolean для чекбоксов
}, {})

const reducerFunc = (state, action) => {
  switch (action.type) {
    case SWITCH_FLAG:
      return { ...state, [action.payload]: !state[action.payload] }
    case SWITCH_ALL:
      return {
        ...checkBoxData.reduce((acc, rec) => {
          return { ...acc, [rec]: action.payload }
        }, {})
      }
    default: {
      return state
    }
  }
}

const CheckboxPanel = () => {
  const [state, dispatch] = useReducer(reducerFunc, checkBoxChoices)
  const [toggle, isToggled] = useState(false)
  const onClick = () => {
    isToggled(!toggle)
    dispatch({
      type: SWITCH_ALL,
      payload: toggle
    })
  }
  const handleChange = (checboxInfo) => (e) => {
    console.log('this is checboxInfo', checboxInfo)
    dispatch({
      type: SWITCH_FLAG,
      value: e.target.value,
      payload: checboxInfo
    })
  }
  useEffect(() => {
    console.log('this is inintialState', state)
  }, [handleChange, state, onClick])
  return (
    <div>
      {checkBoxData.map((it, index) => {
        console.log(it)
        return (
          <div key={index}>
            {it}
            <input type="checkbox" checked={state.it} onChange={(e) => handleChange(it)(e)} />
          </div>
        )
      })}
      <div>
        <button type="button" onClick={onClick}>
          {toggle ? 'select all' : 'deselecet all'}
        </button>
      </div>
    </div>
  )
}

export default CheckboxPanel

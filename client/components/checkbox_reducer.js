import React, { useState, useReducer, useEffect } from 'react'

import info from '../../data.json'

const SWITCH_FLAG = 'SWITCH_FLAG'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1]
}, [])
const [...checkBoxData] = new Set(getLevel1Info)
const checkBoxChoices = checkBoxData.reduce((acc, rec) => {
  return { ...acc, [rec]: false }
}, {})

const initialState = {
  checkBoxChoices
}

const reducerFunc = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_FLAG: {
      return { ...state, [action.checboxInfo]: !action.myCheckbox }
    }
    default: {
      return state
    }
  }
}

const CheckboxReducer = () => {
  const [store, dispatch] = useReducer(reducerFunc, initialState)
  const [isChecked] = useState(false)
  const onChange = (myCheckbox) => (checboxInfo) => (e) => {
    dispatch({
      type: SWITCH_FLAG,
      checked: e.target.checked,
      checboxInfo,
      myCheckbox
    })
  }
  useEffect(() => {
    console.log('this is inintialState', initialState, isChecked, store)
  }, [onChange, isChecked])
  return (
    <div>
      {checkBoxData.map((it, index) => {
        return (
          <div key={index}>
            {it}
            <input
              type="checkbox"
              id={index}
              checked={initialState.it}
              onChange={onChange}
              checboxInfo={it}
              myCheckbox={initialState.it}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CheckboxReducer

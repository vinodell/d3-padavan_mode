import React, { useState, useReducer, useEffect } from 'react'

import info from '../../data.json'
import reducerFunc from './reducer'

const SWITCH_FLAG = 'SWITCH_FLAG'
const SWITCH_ALL = 'SWITCH_ALL'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1, rec.level_2]
}, []) // отбираем поле level_1 для чекбоксов
const [...checkBoxData] = new Set(getLevel1Info) // убираем дуликаты
const checkBoxChoices = checkBoxData.reduce((acc, rec) => {
  return { ...acc, [rec]: false } // создаем объект level_1: boolean для чекбоксов
}, {})

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
    <div className="flex flex-wrap">
      {Object.keys(state).map((it, index) => {
        console.log('here is map part of the code', it, state[it])
        return (
          <div className="w-20 h-24 text-sm border-2" key={index}>
            {it}
            <input type="checkbox" checked={state[it]} onChange={(e) => handleChange(it)(e)} />
          </div>
        )
      })}
      <div>
        <button
          className="w-40 h-16 bg-gray-300 text-m border-solid border-2 border-gray-600 rounded-lg border-l-8"
          type="button"
          onClick={onClick}
        >
          {toggle ? 'select all' : 'deselecet all'}
        </button>
      </div>
    </div>
  )
}
export default CheckboxPanel

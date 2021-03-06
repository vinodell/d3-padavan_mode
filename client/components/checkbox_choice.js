import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { switchFlag, switchAllFlags } from '../redux/reducers/graphic'

const CheckboxPanel = () => {
  const dispatch = useDispatch()
  const { ...checkBoxChoices } = useSelector((s) => s.graphic)
  // console.log('THIS IS FIRST TIME checkBoxChoices is here', checkBoxChoices)
  const [toggle, isToggled] = useState(false)
  const onClick = () => {
    isToggled(!toggle)
    dispatch(switchAllFlags(toggle))
  }
  const handleChange = (checboxInfo) => (e) => {
    // console.log('here is handleChange it', checboxInfo)
    dispatch(
      switchFlag({
        value: e.target.value,
        payload: checboxInfo
      })
    )
  }
  useEffect(() => {
    // console.log('this is inintialState', checkBoxChoices)
  }, [onClick, handleChange, checkBoxChoices])
  return (
    <div className="flex flex-row">
      {Object.keys(checkBoxChoices).map((it, index) => {
        // console.log('here is map part of the code checkBoxChoices', checkBoxChoices)
        return (
          <div className="w-40 h-20 text-sm border-2" key={index}>
            {it}
            <input type="checkbox" checked={checkBoxChoices[it]} onChange={handleChange(it)} />
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

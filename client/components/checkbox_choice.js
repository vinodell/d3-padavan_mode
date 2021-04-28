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
    return () => {
      dispatch(switchFlag(checboxInfo, e.target.value))
    }
  }
  useEffect(() => {
    console.log('this is inintialState', checkBoxChoices)
  }, [onClick, handleChange, isToggled])
  return (
    <div className="flex flex-wrap">
      {Object.keys(checkBoxChoices).map((it, index) => {
        // console.log('here is map part of the code', checkBoxChoices[it])
        return (
          <div className="w-20 h-24 text-sm border-2" key={index}>
            {it}
            <input type="checkbox" value={checkBoxChoices[it]} onChange={handleChange(it)} />
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

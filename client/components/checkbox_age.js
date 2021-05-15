import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { switchAgeFlag, switchAllAgeFlags } from '../redux/reducers/graphic_age'

const CheckboxPanel = () => {
  const dispatch = useDispatch()
  const { ...checkBoxChoicesAge } = useSelector((s) => s.graphic_age)
  // console.log('THIS IS FIRST TIME checkBoxChoicesAge is here', checkBoxChoicesAge)
  const [toggle, isToggled] = useState(false)
  const onClick = () => {
    isToggled(!toggle)
    dispatch(switchAllAgeFlags(toggle))
  }
  const handleChange = (checboxInfo) => (e) => {
    // console.log('here is handleChange it', checboxInfo)
    dispatch(
      switchAgeFlag({
        value: e.target.value,
        payload: checboxInfo
      })
    )
  }
  const handleCut = (item) => {
    const re = new RegExp(/(\d){1,2}/, 'g')
    const result = item.match(re)
    return result.length === 1 ? `${result}+` : result.join('-')
  }
  useEffect(() => {
    // console.log('this is inintialState', checkBoxChoicesAge)
  }, [onClick, handleChange, checkBoxChoicesAge])
  return (
    <div className="flex flex-row">
      {Object.keys(checkBoxChoicesAge).map((it, index) => {
        // console.log('here is map part of the code', it)
        return (
          <div className="w-20 h-14 text-sm border-2" key={index}>
            {handleCut(it)}
            <input type="checkbox" checked={checkBoxChoicesAge[it]} onChange={handleChange(it)} />
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

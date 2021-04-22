import React, { useState } from 'react'

import info from '../../data.json'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1]
}, [])
const [...checkBoxInfo] = new Set(getLevel1Info)

const data = info.reduce((acc, rec) => {
  return [...acc, { [rec.level_1]: false }]
}, [])

const initialState = {
  ...data
}

console.log(initialState)

const Checkbox = () => {
  // const [store, dispatch] = useReducer(reducerFunc, initialState)
  const [isChecked, setChecked] = useState(true)
  const onChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <div>
      <legend>Choose your data for graph</legend>
      {checkBoxInfo.map((it, index) => {
        return (
          <div key={index}>
            {it}
            <input type="checkbox" id={index} checked={isChecked} onChange={onChange} />
          </div>
        )
      })}
    </div>
  )
}

export default Checkbox

// level_1
// Total Citizen
// Total Male Citizens
// Total Female Citizens
// Total Male Citizens
// Total Female Citizens
// Total Malays
// Total Male Malays
// Total Female Malays
// Total Chinese
// Total Male Chinese
// Total Female Chinese
// Total Indians
// Total Male Indians
// Total Female Indians
// Other Ethnic Groups (Total)
// Other Ethnic Groups (Males)
// Other Ethnic Groups (Females)

// level_2
// 0  -  4 Years
// 5  -  9 Years
// 10 - 14 Years
// 15 - 19 Years
// 20 - 24 Years
// 25 - 29 Years
// 30 - 34 Years
// 35 - 39 Years
// 40 - 44 Years
// 45 - 49 Years
// 50 - 54 Years
// 55 - 59 Years
// 60 - 64 Years
// 65 - 69 Years
// 70 - 74 Years
// 75 - 79 Years
// 80 - 84 Years
// 65 Years & Over
// 70 Years & Over
// 75 Years & Over
// 80 Years & Over
// 85 Years & Over

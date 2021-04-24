import React from 'react'

import CheckBoxChoices from './checkbox_choice'

// const getLevel1Info = info.reduce((acc, rec) => {
//   return [...acc, rec.level_1]
// }, [])
// const [...checkBoxData] = new Set(getLevel1Info) // выбираем и фильтруем от дубликатов все поля level_1 для чекбоксов (получаем массив строк этих полей)

// const data = info.reduce((acc, rec) => {
//   return [...acc, { [rec.level_1]: false }]
// }, [])

// // const initialState = {
// //   ...data
// // }

// console.log(checkBoxData, data)

const Checkbox = () => {
  // const [isChecked, setChecked] = useState(true)
  // const onChange = (e) => {
  //   setChecked(e.target.checked)
  // }

  return (
    <div>
      <legend>Choose your data for graph:</legend>
      <CheckBoxChoices />
      {/* <CheckBoxLevel2 /> */}
    </div>
  )
}

export default Checkbox

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

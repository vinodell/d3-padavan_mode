import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import csvdata from '../../data.json'

const randomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const colour = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  return colour
}

const info = csvdata
  .map((it) => ({
    level_1: it.level_1,
    level_2: it.level_2,
    value: +it.value,
    year: +it.year,
    colour: randomColor()
  }))
  .filter((it) => !Number.isNaN(it.value))

const useFilterData = () => {
  const { ...checkBoxChoices } = useSelector((s) => s.graphic)
  const { ...checkBoxChoicesAge } = useSelector((s) => s.graphic_age)

  const checkboxEtnos = Object.keys(checkBoxChoices).reduce((acc, rec) => {
    if (checkBoxChoices[rec] === true) return { ...acc, [rec]: checkBoxChoices[rec] }
    return { ...acc }
  }, {})

  const checkBoxAge = Object.keys(checkBoxChoicesAge).reduce((acc, rec) => {
    if (checkBoxChoicesAge[rec] === true) return { ...acc, [rec]: checkBoxChoicesAge[rec] }
    return { ...acc }
  }, {})

  const Calculate = (data, etnos, age) => {
    let result = []
    let finalArr = []
    const etnosArr = Object.keys(etnos)
    const ageArr = Object.keys(age)

    for (let i = 0; i < etnosArr.length; i += 1) {
      for (let j = 0; j < data.length; j += 1) {
        if (etnosArr[i] === data[j].level_1) {
          result = [...result, data[j]]
        }
      }
    }
    for (let m = 0; m < ageArr.length; m += 1) {
      for (let l = 0; l < result.length; l += 1) {
        if (ageArr[m] === result[l].level_2) {
          finalArr = [...finalArr, result[l]]
        }
      }
    }
    let dataForGraph = []
    dataForGraph = finalArr.reduce((acc, rec) => {
      return {
        ...acc,
        [rec.level_1]: acc[rec.level_1]
          ? {
            ...acc[rec.level_1],
            [rec.level_2]: acc[rec.level_1][rec.level_2]
              ? [...acc[rec.level_1][rec.level_2], rec]
              : [rec]
          }
          : { [rec.level_2]: [rec] }
      }
    }, [])
    return dataForGraph
  }
  const finalResult = useMemo(() => {
    return Calculate(info, checkboxEtnos, checkBoxAge)
  }, [checkboxEtnos, checkBoxAge])
  console.log('THIS IS useHook RESULT__________', finalResult)
  return finalResult
}

export default useFilterData

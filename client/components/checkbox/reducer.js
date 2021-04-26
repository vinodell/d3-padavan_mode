import info from '../../../data.json'

const SWITCH_FLAG = 'SWITCH_FLAG'
const SWITCH_ALL = 'SWITCH_ALL'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1, rec.level_2]
}, []) // отбираем поле level_1 для чекбоксов
const [...checkBoxData] = new Set(getLevel1Info) // убираем дуликаты

export default function (state, action) {
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

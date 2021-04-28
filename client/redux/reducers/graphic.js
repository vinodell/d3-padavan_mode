import info from '../../../data.json'

const SWITCH_FLAG = 'SWITCH_FLAG'
const SWITCH_ALL = 'SWITCH_ALL'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1, rec.level_2]
}, []) // отбираем поле level_1 и lexel_2 для чекбоксов
const [...checkBoxData] = new Set(getLevel1Info) // убираем дуликаты
const checkBoxChoices = checkBoxData.reduce((acc, rec) => {
  return { ...acc, [rec]: false } // создаем объект level_1/2: boolean для чекбоксов
}, {})

const initialState = {
  ...checkBoxChoices
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_FLAG:
      return { ...state, [action.payload]: !state[action.payload] }
    case SWITCH_ALL:
      return {
        ...Object.keys(state).reduce((acc, rec) => {
          return { ...acc, [rec]: action.payload }
        }, {})
      }
    default: {
      return state
    }
  }
}

export function switchFlag(checkBoxItem) {
  console.log('this is redux SWITCH_FLAG item', checkBoxItem)
  return (dispatch) => {
    dispatch({
      type: SWITCH_FLAG,
      payload: checkBoxItem
    })
  }
}

export function switchAllFlags(toggle) {
  console.log('Here comes the fuckong toggle', toggle)
  return (dispatch) => {
    dispatch({
      type: SWITCH_ALL,
      payload: toggle
    })
  }
}

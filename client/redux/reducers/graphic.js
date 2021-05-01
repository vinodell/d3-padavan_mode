import info from '../../../data.json'

const SWITCH_FLAG = 'SWITCH_FLAG'
const SWITCH_ALL = 'SWITCH_ALL'

const getLevel1Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_1]
}, [])
const [...checkBoxLevel1] = new Set(getLevel1Info) // убираем дуликаты
// console.log('this is redux CheckBoxLevel_2 creation', checkBoxLevel1)
const checkBoxChoices = checkBoxLevel1.reduce((acc, rec) => {
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

export function switchFlag({ payload }) {
  // console.log('this is redux SWITCH_FLAG item', payload)
  return (dispatch) => {
    dispatch({
      type: SWITCH_FLAG,
      payload
    })
  }
}

export function switchAllFlags(toggle) {
  // console.log('Here comes the fuckong toggle', toggle)
  return (dispatch) => {
    dispatch({
      type: SWITCH_ALL,
      payload: toggle
    })
  }
}

import info from '../../../data.json'

const SWITCH_AGE_FLAG = 'SWITCH_AGE_FLAG'
const SWITCH_AGE_ALL = 'SWITCH_AGE_ALL'

const getLevel2Info = info.reduce((acc, rec) => {
  return [...acc, rec.level_2]
}, []) // отбираем поле level_1 и lexel_2 для чекбоксов
const [...checkBoxLevel2] = new Set(getLevel2Info)
console.log('this is redux CheckBoxLevel_2 creation', checkBoxLevel2)
const checkBoxChoicesAge = checkBoxLevel2.reduce((acc, rec) => {
  return { ...acc, [rec]: false } // создаем объект level_1/2: boolean для чекбоксов
}, {})

const initialState = {
  ...checkBoxChoicesAge
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_AGE_FLAG:
      return { ...state, [action.payload]: !state[action.payload] }
    case SWITCH_AGE_ALL:
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

export function switchAgeFlag({ payload }) {
  console.log('this is redux SWITCH_AGE_FLAG item', payload)
  return (dispatch) => {
    dispatch({
      type: SWITCH_AGE_FLAG,
      payload
    })
  }
}

export function switchAllAgeFlags(toggle) {
  console.log('Here comes the fuckong toggle', toggle)
  return (dispatch) => {
    dispatch({
      type: SWITCH_AGE_ALL,
      payload: toggle
    })
  }
}

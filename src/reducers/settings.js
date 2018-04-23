import {types} from '../actions';

const initialState = {
  lang: 'ru',
  botDifficulty: 1
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.game.SET_BOT_DEFFICULTY:
      return ({
        ...state,
        botDifficulty: action.payload
      });

    case types.i18n.CHANGE_LANG:
      return ({
        ...state,
        lang: action.payload
      });

    default:
      return state;
  }
}

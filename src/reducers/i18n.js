import {types} from '../actions';

const initialState = {
  lang: 'ru'
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.i18n.CHANGE_LANG:
      return ({
        ...state,
        lang: action.payload
      });

    default:
      return state;
  }
}

import {makeAction} from './../utils'

export const types = {
  CHANGE_LANG: 'CHANGE_LANG',
};

const actions = ({
  changeLang: makeAction(types.CHANGE_LANG),
});

export default actions;
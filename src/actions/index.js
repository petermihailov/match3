import game, {types as gameTypes} from './game';
import grid, {types as gridTypes}from './grid';
import i18n, {types as i18nTypes}from './i18n';

export const types = {
  game: gameTypes,
  grid: gridTypes,
  i18n: i18nTypes,
};

export default ({
  game,
  grid,
  i18n,
});
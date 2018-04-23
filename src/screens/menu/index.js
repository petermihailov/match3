import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import actions from './../../actions';
import dict from './../../dict';
import styles from './menu.scss';
import {Container} from './../../components';
import Logo from './Logo';
import GitHubLink from './GitHubLink';

const Menu = ({lang, startGame, startGameWithBot, goToSettings}) => (
  <Container className={styles.menu}>
    <GitHubLink/>
    <Logo className={styles.logo}/>
    <div className={styles.buttons}>
      <button onClick={startGameWithBot}>{dict[lang].startGameWithBot}</button>
      <button onClick={startGame}>{dict[lang].startGame}</button>
      <button onClick={goToSettings}>{dict[lang].settings.label}</button>
    </div>
  </Container>
);

export default connect(
  (state) => ({
    lang: state.i18n.lang
  }),
  (dispatch) => ({
    startGame: () => dispatch(actions.game.startGame()),
    startGameWithBot: () => dispatch(actions.game.startGameWithBot()),
    goToSettings: () => dispatch(push('settings')),
  }),
)(Menu);
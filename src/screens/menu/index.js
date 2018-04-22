import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import actions from './../../actions';
import styles from './menu.scss';
import {Container} from './../../components';
import Logo from './logo';

const Menu = ({startGame, startGameWithBot, goToSettings}) => (
  <Container className={styles.menu}>
    <Logo className={styles.logo}/>
    <div className={styles.buttons}>
      <button onClick={startGameWithBot}>Играть с Ботом</button>
      <button onClick={startGame}>Играть</button>
      <button onClick={goToSettings}>Настройки</button>
    </div>
  </Container>
);

export default connect(
  undefined,
  (dispatch) => ({
    startGame: () => dispatch(actions.game.startGame()),
    startGameWithBot: () => dispatch(actions.game.startGameWithBot()),
    goToSettings: () => dispatch(push('settings')),
  }),
)(Menu);
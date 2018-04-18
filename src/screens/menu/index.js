import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import styles from './menu.scss';
import {Container} from './../../components';

class Menu extends Component {
  render() {
    const {startGame, startGameWithBot} = this.props;

    return (
      <Container className={styles.menu}>
        <button onClick={startGame}>Start game</button>
        <button onClick={startGameWithBot}>Game With BOT</button>
      </Container>
    );
  }
}

export default connect(
  undefined,
  (dispatch) => ({
    startGame: () => dispatch(actions.game.startGame()),
    startGameWithBot: () => dispatch(actions.game.startGameWithBot()),
  }),
)(Menu);
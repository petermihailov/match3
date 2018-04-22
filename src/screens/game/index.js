import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import actions from './../../actions';
import styles from './game.scss';

import {
  Grid,
  StatusBar,
  Container
} from './../../components'

class Game extends Component {
  render() {
    const {grid, players, moveExpireAt, mover, locked} = this.props;
    const {onMove, onMissMove, onRestart, goToMenu} = this.props;

    return (
      <Container className={styles.game}>
        <StatusBar {...{players, moveExpireAt, mover, onMissMove}} />
        <Grid data={grid} onMove={onMove} locked={locked}/>
        <button onClick={onRestart}>Рестарт</button>
        <button onClick={goToMenu}>Меню</button>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game
  }),
  (dispatch) => ({
    onMove: (options) => dispatch(actions.grid.move(options)),
    onMissMove: () => dispatch(actions.game.missMove()),
    onRestart: () => dispatch(actions.game.restartGame()),
    goToMenu: () => dispatch(push('/')),
  }),
)(Game);
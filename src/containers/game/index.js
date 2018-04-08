import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import styles from './game.scss';

import {
  Grid,
  StatusBar
} from './../../components'

class Game extends Component {
  render() {
    const {grid, players, moveExpireAt, mover, locked, onMove, onGameStart, onMissMove} = this.props;

    return (
      <div className={styles.game}>
        <StatusBar {...{players, moveExpireAt, mover, onMissMove}} />
        <Grid data={grid} onMove={onMove} locked={locked}/>
        <button onClick={onGameStart}>Start</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game
  }),
  (dispatch) => ({
    onMove: (options) => dispatch(actions.grid.move(options)),
    onGameStart: () => dispatch(actions.game.startGame()),
    onMissMove: () => dispatch(actions.game.missMove()),
  }),
)(Game);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import styles from './game.scss';

import {
  Grid,
  StatusBar,
} from './../../components'

class Game extends Component {
  render() {
    const {grid, players, moveExpireAt, mover, locked, onMove, startGame, startGameWithBot, onMissMove} = this.props;

    return (
      <div className={styles.game}>
        <StatusBar {...{players, moveExpireAt, mover, onMissMove}} />
        <Grid data={grid} onMove={onMove} locked={locked}/>
        <button onClick={startGame}>Start Game</button>
        <button onClick={startGameWithBot}>Start Game with BOT</button>
        <button onClick={() => {
          console.log(screen.orientation.type);
        }}>lock screen</button>
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
    onMissMove: () => dispatch(actions.game.missMove()),
    startGame: () => dispatch(actions.game.startGame()),
    startGameWithBot: () => dispatch(actions.game.startGameWithBot()),
  }),
)(Game);
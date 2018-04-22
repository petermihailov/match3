import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push, goBack} from 'react-router-redux';
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
    const {onMove, onMissMove, onRestart, goBack} = this.props;

    return (
      <Container className={styles.game}>
        <StatusBar {...{players, moveExpireAt, mover, onMissMove}} />
        <Grid data={grid} onMove={onMove} locked={locked}/>
        <button onClick={onRestart}>Заново</button>
        <button onClick={goBack}>Назад</button>
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
    goBack: () => dispatch(goBack()),
  }),
)(Game);
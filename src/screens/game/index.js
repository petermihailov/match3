import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import actions from './../../actions';
import dict from './../../dict';
import styles from './game.scss';

import {
  Grid,
  Fireworks,
  StatusBar,
  Container,
} from './../../components'

class Game extends Component {
  render() {
    const {lang, isInGame, grid, players, moveExpireAt, mover, locked} = this.props;
    const {onMove, onMissMove, onRestart, goBack} = this.props;

    return (
      <Container className={styles.game}>
        <Fireworks className={styles.fireworks} disabled={isInGame} autoFire={!isInGame}/>
        <StatusBar {...{players, moveExpireAt, mover, onMissMove}} />
        <Grid data={grid} onMove={onMove} locked={locked} isInGame={isInGame}/>
        <button onClick={onRestart}>{dict[lang].restart}</button>
        <button onClick={goBack}>{dict[lang].back}</button>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game,
    lang: state.i18n.lang
  }),
  (dispatch) => ({
    onMove: (options) => dispatch(actions.grid.move(options)),
    onMissMove: () => dispatch(actions.game.missMove()),
    onRestart: () => dispatch(actions.game.restartGame()),
    goBack: () => dispatch(goBack()),
  }),
)(Game);
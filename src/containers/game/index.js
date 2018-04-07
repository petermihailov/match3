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
    const {grid, players, moveExpires, mover, locked, onMove} = this.props;

    return (
      <div className={styles.game}>
        <StatusBar {...{players, moveExpires, mover}} />
        <Grid data={grid} onMove={onMove} locked={locked}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game
  }),
  (dispatch) => ({
    onMove: (options) => dispatch(actions.grid.move(options))
  }),
)(Game);
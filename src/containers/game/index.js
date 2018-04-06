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
    const {grid, players, moveExpires, moveMakes} = this.props;

    return (
      <div className={styles.game}>
        <StatusBar {...{players, moveExpires, moveMakes}} />
        <Grid data={grid} move={this.props.move}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game
  }),
  (dispatch) => ({
    move: (options) => dispatch(actions.grid.move(options))
  }),
)(Game);
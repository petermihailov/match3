import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import cn from 'classnames';
import * as m3 from 'm3lib';
import styles from './grid.scss';

class Grid extends Component {
  state = {
    active: null
  };

  setActive(row, col) {
    const {move} = this.props;
    const {active} = this.state;

    if (active) {
      this.setState({active: null});
      const from = active;
      const to = {row, col};

      if (m3.isNeighbor(from, to)) {
        move({gridNode: this.grid, from, to});
      } else {
        if (active.row !== row && active.col !== col) {
          this.setState({active: {row, col}})
        }
      }
    } else {
      this.setState({active: {row, col}})
    }
  }

  render() {
    const {active} = this.state;
    const {grid} = this.props;

    return (
      <div className={styles.grid} ref={(node) => this.grid = node}>
        {
          grid.map((i, row) => i.map((piece, col) => {
            if (piece !== null) {
              return (
                <span
                  key={'' + col + row}
                  className={cn(
                    styles.piece,
                    styles['type-' + piece.type],
                    {[styles.active]: active && active.row === row && active.col === col}
                  )}
                  data-row={row}
                  data-col={col}
                  onClick={() => this.setActive(row, col)}
                />
              )
            } else {
              return (
                <span
                  key={'' + col + row}
                  className={cn(
                    styles.piece
                  )}
                  data-row={row}
                  data-col={col}
                />
              )
            }
          }))
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...state.grid
  }),
  (dispatch) => ({
    move: (options) => dispatch(actions.grid.move(options))
  }),
)(Grid);
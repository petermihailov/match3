import React, {Component} from 'react';
import cn from 'classnames';
import * as m3 from 'm3lib';
import styles from './grid.scss';

export default class Grid extends Component {
  state = {
    active: null
  };

  setActive(row, col) {
    const {locked, onMove} = this.props;
    const {active} = this.state;

    if (locked) {
      return;
    }

    if (active) {
      this.setState({active: null});
      const from = active;
      const to = {row, col};

      if (m3.isNeighbor(from, to)) {
        onMove({gridNode: this.grid, from, to});
      } else {
        if (active.row !== row || active.col !== col) {
          this.setState({active: {row, col}})
        }
      }
    } else {
      this.setState({active: {row, col}})
    }
  }

  render() {
    const {active} = this.state;
    const {data, locked} = this.props;

    return (
      <div
        ref={(node) => this.grid = node}
        className={cn(
          styles.grid,
          {[styles.locked]: locked}
        )}
      >
        {
          data.map((i, row) => i.map((piece, col) => {
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
                >
                  <span className={styles.score}>{piece.type * 100}</span>
                </span>
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

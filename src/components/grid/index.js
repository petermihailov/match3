import React, {Component} from 'react';
import cn from 'classnames';
import * as m3 from 'm3lib';
import styles from './grid.scss';

export default class Grid extends Component {
  touchstartX = 0;
  touchstartY = 0;
  touchendX = 0;
  touchendY = 0;

  state = {
    active: null
  };

  setActive = (e) => {
    const {locked, onMove} = this.props;

    if (locked) {
      return;
    }

    const pieceNode = e.target.closest('.' + styles.piece);

    if (pieceNode) {
      const {active} = this.state;

      const col = parseInt(pieceNode.dataset.col);
      const row = parseInt(pieceNode.dataset.row);

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
  };

  resetActive = () => this.setState({active: null});

  handleSwipe = () => {
    const {active} = this.state;

    const dHorizontal = this.touchstartX - this.touchendX;
    const dVertical = this.touchstartY - this.touchendY;

    const isSwipe = Math.abs(Math.abs(dHorizontal) - Math.abs(dVertical)) > 10;

    if (isSwipe && active) {
      if (Math.abs(dHorizontal) > Math.abs(dVertical)) {
        if (dHorizontal > 0) {
          this.props.onMove({gridNode: this.grid, from: active, to: {...active, col: active.col - 1}});
        } else {
          this.props.onMove({gridNode: this.grid, from: active, to: {...active, col: active.col + 1}});
        }
      } else if (Math.abs(dHorizontal) < Math.abs(dVertical)) {
        if (dVertical > 0) {
          this.props.onMove({gridNode: this.grid, from: active, to: {...active, row: active.row - 1}});
        } else {
          this.props.onMove({gridNode: this.grid, from: active, to: {...active, row: active.row + 1}});
        }
      }
    }
  };

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
        onClick={this.setActive}
      >
        {
          data.map((i, row) => i.map((piece, col) => {
            if (piece !== null) {
              return (
                <div
                  key={'' + col + row}
                  className={cn(
                    styles.piece,
                    styles['type-' + piece.type],
                    {[styles.active]: active && active.row === row && active.col === col}
                  )}
                  data-row={row}
                  data-col={col}
                  onTouchStart={(event) => {
                    event.preventDefault();
                    this.touchstartX = event.changedTouches[0].screenX;
                    this.touchstartY = event.changedTouches[0].screenY;
                    this.setActive(event);
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    this.touchendX = event.changedTouches[0].screenX;
                    this.touchendY = event.changedTouches[0].screenY;
                    this.handleSwipe();
                    this.resetActive();
                  }}
                >
                  <span className={styles.score}>{piece.type * 100}</span>
                </div>
              )
            } else {
              return (
                <div
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

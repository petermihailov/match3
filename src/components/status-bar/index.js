import React, {Component} from 'react';
import cn from 'classnames';
import styles from './status-bar.scss';

import {
  Player,
  Timer
} from './../';

export default class StatusBar extends Component {
  render() {
    const {players, moveExpires, mover} = this.props;

    return (
      <div className={cn(
        styles['status-bar']
      )}>
        <Player {...players.left}/>
        <Timer expires={moveExpires} arrowPosition={mover}/>
        <Player {...players.right} right/>
      </div>
    );
  }
}

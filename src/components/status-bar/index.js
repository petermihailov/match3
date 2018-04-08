import React, {Component} from 'react';
import cn from 'classnames';
import styles from './status-bar.scss';

import {
  Player,
  Timer
} from './../';

export default class StatusBar extends Component {
  render() {
    const {players, moveExpireAt, mover, onMissMove} = this.props;

    return (
      <div className={cn(
        styles['status-bar']
      )}>
        <Player {...players.left}/>
        <Timer moveExpireAt={moveExpireAt} arrowPosition={mover} onMissMove={onMissMove}/>
        <Player {...players.right} right/>
      </div>
    );
  }
}

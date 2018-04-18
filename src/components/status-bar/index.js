import React from 'react';
import cn from 'classnames';
import styles from './status-bar.scss';

import {
  Player,
  Timer
} from './../';

const StatusBar = ({players, moveExpireAt, mover, onMissMove}) => (
  <div className={cn(
    styles['status-bar']
  )}>
    <Player {...players.left}/>
    <Timer moveExpireAt={moveExpireAt} arrowPosition={mover} onMissMove={onMissMove}/>
    <Player {...players.right} right/>
  </div>
);

export default StatusBar;
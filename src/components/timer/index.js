import React, {Component} from 'react';
import cn from 'classnames';
import styles from './timer.scss';

export default class Timer extends Component {
  render() {
    const {arrowPosition} = this.props;

    return (
      <div className={cn(
        styles.timer
      )}>
        <div className={cn(
          styles['arrow-left'],
          {[styles.active]: arrowPosition === 'left'}
        )}/>
        <div className={cn(
          styles['arrow-right'],
          {[styles.active]: arrowPosition === 'right'}
        )}/>
        <span>00</span>
      </div>
    );
  }
}

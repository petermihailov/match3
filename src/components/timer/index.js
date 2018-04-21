import React, {Component} from 'react';
import cn from 'classnames';
import styles from './timer.scss';

const DEFAULT_SECONDS = 30;

export default class Timer extends Component {
  state = {
    seconds: DEFAULT_SECONDS
  };

  timer = null;

  componentDidMount() {
    const {moveExpireAt} = this.props;
    this.setTimer(moveExpireAt);
  }

  componentWillReceiveProps({moveExpireAt, arrowPosition}) {
    if (this.props.moveExpireAt !== moveExpireAt) {
      this.clearTimer();

      if (moveExpireAt) {
        this.setTimer(moveExpireAt);
      }
    }

    if (this.props.arrowPosition !== arrowPosition) {
      this.setState({seconds: DEFAULT_SECONDS});
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setTimer = (until) => {
    if (until) {
      this.timer = setInterval(() => this.updateCounter(until), 1000)
    }
  };

  updateCounter = (until) => {
    const seconds = Math.ceil((until - Date.now()) / 1000);
    this.setState({seconds});

    if (seconds < 1) {
      this.clearTimer();
      this.props.onMissMove();
    }
  };

  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  };

  render() {
    const {arrowPosition} = this.props;
    const {seconds} = this.state;

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
        <span className={cn({[styles.warning]: this.state.seconds <= 5})}>
          {
            (seconds).toString().padStart(2, "0")
          }
        </span>
      </div>
    );
  }
}

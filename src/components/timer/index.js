import React, {Component} from 'react';
import cn from 'classnames';
import styles from './timer.scss';

export default class Timer extends Component {
  state = {
    seconds: 30
  };

  timer = null;

  componentDidMount() {
    const {moveExpireAt} = this.props;
    this.setTimer(moveExpireAt);
  }

  componentWillReceiveProps({moveExpireAt}) {
    if (this.props.moveExpireAt !== moveExpireAt) {
      this.clearTimer();
      this.setTimer(moveExpireAt);
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

    if (seconds === 0) {
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

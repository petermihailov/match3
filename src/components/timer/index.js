import React, {Component} from 'react';
import cn from 'classnames';
import styles from './timer.scss';

export default class Timer extends Component {
  state = {
    expire: null,
    seconds: 0
  };

  timer = null;

  componentWillReceiveProps({moveExpireAt}) {
    this.clearTimer();

    if (moveExpireAt) {
      this.setState(
        {seconds: Math.round((moveExpireAt - new Date().getTime()) / 1000)},
        () => {
          this.timer = setInterval(this.updateCounter, 1000)
        }
      );
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  updateCounter = () => {
    if (this.state.seconds === 1) {
      this.clearTimer();
      this.props.onMissMove();
    } else {
      this.setState({seconds: this.state.seconds - 1});
    }
  };

  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  };

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
        <span className={cn({[styles.warning]: this.state.seconds <= 5})}>
          {
            this.state.seconds > 0
              ? this.state.seconds.toString().padStart(2, "0")
              : null
          }
        </span>
      </div>
    );
  }
}

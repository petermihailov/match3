import React, {Component} from 'react';
import cn from 'classnames';
import styles from './timer.scss';

export default class Timer extends Component {
  state = {
    seconds: 0
  };

  timer = null;

  componentDidMount() {
    const {moveExpireAt} = this.props;
    this.setTimer(moveExpireAt);
  }

  componentWillReceiveProps({moveExpireAt}) {
    this.clearTimer();
    this.setTimer(moveExpireAt)
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setTimer = (until) => {
    if (until) {
      this.timer = setInterval(this.updateCounter, 1000)
    }
  };

  updateCounter = () => {
    if (this.state.seconds === 1) {
      this.clearTimer();
      this.props.onMissMove();
    } else {
      this.setState({seconds: Math.round((this.props.moveExpireAt - new Date().getTime()) / 1000)});
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
          {(this.state.seconds).toString().padStart(2, "0")}
        </span>
      </div>
    );
  }
}

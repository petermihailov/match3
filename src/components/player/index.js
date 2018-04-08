import React, {Component} from 'react';
import anime from 'animejs';
import cn from 'classnames';
import styles from './player.scss';

export default class Player extends Component {
  componentWillReceiveProps({score}) {
    if (score !== this.props.score) {
      const animatedScore = {value: this.props.score};

      anime({
        targets: animatedScore,
        value: score,
        round: 1,
        easing: 'easeInOutExpo',
        duration: Math.abs(score - this.props.score) / 5,
        update: () => this.score.innerText = animatedScore.value
      });
    }
  }

  render() {
    const {name, right} = this.props;

    return (
      <div className={cn(
        styles.player,
        {
          [styles.right]: right
        }
      )}>
        <span className={styles.name}>{name}</span>
        <span ref={(n) => this.score = n} className={styles.score}>0</span>
      </div>
    );
  }
}

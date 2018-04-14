import React, {Component} from 'react';
import animations from './../../animations'
import cn from 'classnames';
import styles from './player.scss';

export default class Player extends Component {
  componentWillReceiveProps({score}) {
    if (score !== this.props.score) {
      if (score === 0) {
        this.scoreNode.innerText = '0';
      } else {
        animations.game.updateScore(this.scoreNode, this.props.score, score);
      }
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
        <span ref={(n) => this.scoreNode = n} className={styles.score}>0</span>
      </div>
    );
  }
}

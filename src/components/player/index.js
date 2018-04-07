import React, {Component} from 'react';
import cn from 'classnames';
import styles from './player.scss';

export default class Player extends Component {
  render() {
    const {name, score, right} = this.props;

    return (
      <div className={cn(
        styles.player,
        {
          [styles.right]: right
        }
      )}>
        <span className={styles.name}>{name}</span>
        <span className={styles.score}>{(score).toLocaleString('en')}</span>
      </div>
    );
  }
}

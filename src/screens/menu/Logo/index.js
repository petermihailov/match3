import React, {Component} from 'react';
import cn from 'classnames';
import styles from './Logo.scss';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.logoRef = React.createRef();
  }
  preventDefault = (e) => {
    e.preventDefault()
  };

  componentDidMount() {
    this.logoRef.current.addEventListener('touchstart', this.preventDefault);
  }

  componentWillUnmount() {
    this.logoRef.current.removeEventListener('touchstart', this.preventDefault);
  }

  render() {
    const {className} = this.props;

    return (
      <div
        ref={this.logoRef}
        className={cn(styles.logo, className)}
        onTouchStart={(e) => e.preventDefault()}
      >
        <span className={styles.m}>M</span>
        <span className={styles.a}>A</span>
        <span className={styles.t}>T</span>
        <span className={styles.c}>C</span>
        <span className={styles.h}>H</span>
        <span>-</span>
        <span className={styles.three}>3</span>
      </div>
    )
  }
}
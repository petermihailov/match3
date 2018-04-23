import React from 'react';
import cn from 'classnames';
import styles from './Logo.scss';

const Index = ({className}) => (
  <span className={cn(styles.logo, className)}>
        <span className={styles.m}>M</span>
        <span className={styles.a}>A</span>
        <span className={styles.t}>T</span>
        <span className={styles.c}>C</span>
        <span className={styles.h}>H</span>
        <span>-</span>
        <span className={styles.three}>3</span>
  </span>
);

export default Index;
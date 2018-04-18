import React from 'react';
import cn from 'classnames';
import styles from './container.scss';

const Container = ({className, children, ...props}) => (
  <div className={cn(styles.container, className)} {...props}>
    {children}
  </div>
);


export default Container;
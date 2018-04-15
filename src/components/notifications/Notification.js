import React from 'react';
import cn from 'classnames';
import styles from './notifications.scss';

export default class Notification extends React.Component {
  timer = null;

  static defaultProps = {
    type: 'info',
    timeOut: 1500
  };

  componentDidMount = () => {
    const {timeOut} = this.props;
    if (timeOut !== 0) {
      this.timer = setTimeout(this.requestHide, timeOut);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  handleClick = () => {
    this.props.onClick && this.props.onClick();

    this.requestHide();
  };

  requestHide = () => {
    this.props.onRequestHide && this.props.onRequestHide();
  };

  render() {
    const {title, type, message} = this.props;

    return (
      <div
        className={cn(
          styles.notification,
          {[`notification-${type}`]: type}
        )}
        onClick={this.handleClick}
      >
        {
          title && (<h4 className={styles.title}>{title}</h4>)
        }
        <div className={styles.message}>{message}</div>
      </div>
    );
  }
}

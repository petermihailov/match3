import React, {Component} from 'react';
import Notification from './Notification';
import styles from './notifications.scss';

export default class Notifications extends Component {
  static defaultProps = {
    notifications: []
  };

  handleRequestHide = notification => () => {
    const {onRequestHide} = this.props;
    onRequestHide && onRequestHide(notification);
  };

  render() {
    const {notifications} = this.props;

    return (
      <div className={styles.container}>
        {notifications.map((notification) => {
          return (
            <Notification
              {...notification}
              key={notification.id || new Date().getTime()}
              onRequestHide={this.handleRequestHide(notification)}
            />
          );
        })}
      </div>
    );
  }
}

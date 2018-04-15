import React, {Component} from 'react';
import NotificationManager from './NotificationManager';
import Notifications from './Notifications';

export default class NotificationContainer extends Component {
  state = {
    notifications: []
  };

  componentWillMount = () => {
    NotificationManager.addChangeListener(this.handleStoreChange);
  };

  componentWillUnmount = () => {
    NotificationManager.removeChangeListener(this.handleStoreChange);
  };

  handleStoreChange = (notifications) => {
    this.setState({notifications});
  };

  handleRequestHide = (notification) => {
    NotificationManager.remove(notification);
  };

  render() {
    const {notifications} = this.state;

    return (
      <Notifications
        notifications={notifications}
        onRequestHide={this.handleRequestHide}
      />
    );
  }
}

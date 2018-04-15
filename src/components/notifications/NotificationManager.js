import {EventEmitter} from 'events';

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);

    return v.toString(16);
  });
};

const constants = {
  CHANGE: 'change',
  INFO: 'info'
};

class NotificationManager extends EventEmitter {
  constructor() {
    super();
    this.listNotify = [];
  }

  create(notify) {
    const defaultNotify = {
      id: createUUID(),
      type: constants.INFO,
      title: null,
      message: null,
      timeOut: 1500
    };

    if (notify.priority) {
      this.listNotify.unshift(Object.assign(defaultNotify, notify));
    } else {
      this.listNotify.push(Object.assign(defaultNotify, notify));
    }

    this.emitChange();
  }

  info(message, title, timeOut, onClick, priority) {
    this.create({
      type: constants.INFO,
      message,
      title,
      timeOut,
      onClick,
      priority
    });
  }

  remove(notification) {
    this.listNotify = this.listNotify.filter((n) => notification.id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit(constants.CHANGE, this.listNotify);
  }

  addChangeListener(callback) {
    this.addListener(constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(constants.CHANGE, callback);
  }
}

export default new NotificationManager();

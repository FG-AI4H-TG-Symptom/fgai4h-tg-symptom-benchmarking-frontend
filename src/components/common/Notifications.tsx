import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { clearCurrentNotification } from '../../data/application/applicationActions';
import { RootState } from '../../data/rootReducer';
import { Notification } from '../../data/application/applicationReducers';

enum NotificationState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
}

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector<RootState, Notification | undefined>(
    (state) => state.application.notificationQueue[0],
  );
  const [notificationState, setNotificationOpen] = useState<NotificationState>(
    notification ? NotificationState.OPEN : NotificationState.CLOSED,
  );
  useEffect(() => {
    if (notificationState === NotificationState.CLOSED && notification) {
      setNotificationOpen(NotificationState.OPEN);
    }
  }, [notificationState, notification]);

  const handleCloseNotification = (event: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
    // don't close the notification if the user just clicks anywhere
    if (reason === 'clickaway') {
      return;
    }

    setNotificationOpen(NotificationState.CLOSING);
  };
  const handleExitNotification = (): void => {
    setNotificationOpen(NotificationState.CLOSED);
    dispatch(clearCurrentNotification());
  };

  if (!notification) {
    return null;
  }

  return (
    <Snackbar
      open={notificationState === NotificationState.OPEN}
      autoHideDuration={30000}
      onClose={handleCloseNotification}
      onExited={handleExitNotification}
    >
      <Alert severity={notification.type} onClose={handleCloseNotification}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;

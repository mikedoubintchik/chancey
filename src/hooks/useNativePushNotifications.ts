import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';
import { getToken, Messaging, onMessage } from 'firebase/messaging';
import { useCallback, useState } from 'react';

export const useNativePushNotification = () => {
  const nullEntry: any[] = [];
  const [notifications, setNotifications] = useState(nullEntry);
  console.log('Mobile push notifications', notifications);

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg,
    });
  };

  const registerForPushNotifications = () => {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      showToast('Push registration success');
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      setNotifications((notifications) => [
        ...notifications,
        { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' },
      ]);
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      setNotifications((notifications) => [
        ...notifications,
        {
          id: notification.notification.data.id,
          title: notification.notification.data.title,
          body: notification.notification.data.body,
          type: 'action',
        },
      ]);
    });
  };

  const setupPushNotificationsForWeb = useCallback(async (messaging: Messaging) => {
    console.log('Web push notifications', notifications);

    // https://github.com/firebase/quickstart-js/tree/master/messaging
    try {
      const token = await getToken(messaging, {
        vapidKey: 'BF8ZjTBlMtnraYDgmfD5L4v9SX88fT2WOEA1Md9DGQ4bB7CrgEGIkW03Uzk7cFqfEstE-Y-5Ei5AHYJsBz6dIo8',
      });

      if (token) {
        console.log('Push Notification Token', token);
        // TODO: send token to future backend service that will be sending out push notifications
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // Show permission UI.
      }
    } catch (error) {
      console.error('An error occurred while retrieving token. ', error);
    }

    // push notification handler
    onMessage(messaging, (payload) => {
      if (!payload.notification) return console.error('Message failure');

      const {
        messageId,
        notification: { title, body, image },
      } = payload;

      setNotifications((notifications) => [
        ...notifications,
        { id: messageId, title, body, image, type: 'foreground' },
      ]);

      if (title) showToast(title);

      console.log('Message received. ', { title, body, image });
    });
  }, []);

  const setupPushNotificationsForMobile = useCallback(async () => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            showToast('Push Notification permission denied');
          } else {
            showToast('Push Notification permission granted');
            registerForPushNotifications();
          }
        });
      } else {
        registerForPushNotifications();
      }
    });
  }, []);

  return { registerForPushNotifications, setupPushNotificationsForWeb, setupPushNotificationsForMobile };
};

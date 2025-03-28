import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '@/lib/firebase';

const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
}

export function onMessageListener() {
  return new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      resolve(payload);
    });
  });
}

export function showNotification(title: string, options: NotificationOptions = {}) {
  if (!('Notification' in window)) {
    console.log('Browser tidak mendukung notifikasi');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
} 
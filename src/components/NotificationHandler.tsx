'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export default function NotificationHandler() {
  const { t } = useTranslation();
  const [messaging, setMessaging] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initFirebase = async () => {
      try {
        // Cek apakah service worker didukung
        if ('serviceWorker' in navigator) {
          const app = initializeApp(firebaseConfig);
          const messagingInstance = getMessaging(app);
          setMessaging(messagingInstance);

          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const token = await getToken(messagingInstance, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            console.log('Token:', token);
            // TODO: Kirim token ke server
          }
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initFirebase();
  }, []);

  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload: any) => {
      console.log('Message received:', payload);
      // TODO: Tampilkan notifikasi
    });

    return () => unsubscribe();
  }, [messaging]);

  return null;
} 
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface NotificationData {
  title: string;
  body: string;
  data?: {
    policyId?: string;
    type?: string;
  };
}

export const sendNotification = functions.https.onCall(async (data: NotificationData, context: functions.https.CallableContext) => {
  // Pastikan pengguna sudah login
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Pengguna harus login untuk mengirim notifikasi'
    );
  }

  try {
    // Ambil semua token admin
    const adminTokensSnapshot = await admin.firestore()
      .collection('admin_tokens')
      .get();

    const tokens = adminTokensSnapshot.docs.map(doc => doc.data().token);

    if (tokens.length === 0) {
      console.log('Tidak ada token admin yang tersedia');
      return;
    }

    // Kirim notifikasi ke semua admin
    const message = {
      notification: {
        title: data.title,
        body: data.body,
        icon: '/favicon.ico'
      },
      data: data.data || {},
      tokens: tokens
    };

    const response = await admin.messaging().sendMulticast(message);

    // Hapus token yang tidak valid
    const invalidTokens = response.responses
      .map((resp, idx) => {
        if (!resp.success) {
          return tokens[idx];
        }
        return null;
      })
      .filter((token): token is string => token !== null);

    if (invalidTokens.length > 0) {
      const batch = admin.firestore().batch();
      invalidTokens.forEach(token => {
        const query = admin.firestore()
          .collection('admin_tokens')
          .where('token', '==', token);
        query.get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
          });
        });
      });
      await batch.commit();
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Gagal mengirim notifikasi'
    );
  }
}); 
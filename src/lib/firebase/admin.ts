import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return admin;
};

export const adminDb = initializeFirebaseAdmin().firestore();
export const adminAuth = initializeFirebaseAdmin().auth();
export const adminStorage = initializeFirebaseAdmin().storage();

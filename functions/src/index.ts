import * as functions from 'firebase-functions';
const vision = require('@google-cloud/vision');
// const admin = require('firebase-admin');
// var serviceAccount = require('./../../credentials/google_credentials.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://tune-363401-default-rtdb.firebaseio.com',
// });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const Firestore = require('@google-cloud/firestore');

export const getTextFromTicket = functions.https // }) //   // Check tokens continue to your code. //   allowInvalidAppCheckToken: true, // Opt-out: Requests with invalid App // .runWith({
  .onCall(async (data, context) => {
    const { fileName } = data;

    // context.app will be undefined if the request doesn't include an
    // App Check token. (If the request includes an invalid App Check
    // token, the request will be rejected with HTTP error 401.)
    if (context.app == undefined) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called from an App Check verified app.',
      );
    }

    // Checking attribute.
    if (!(typeof fileName === 'string') || fileName.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with ' + 'one arguments "fileName" containing the path to the image.',
      );
    }

    //  if (!context.auth) return { status: 'error', code: 401, message: 'Not signed in' };

    // Checking that the user is authenticated.
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called ' + 'while authenticated.',
      );
    }

    const client = new vision.ImageAnnotatorClient({
      keyFilename: '../credentials/google_credentials.json',
    });

    try {
      // const [result] = await client.textDetection(`gs://tune-363401.appspot.com/tickets/${fileName}.jpg`);
      const [result] = await client.textDetection(
        `gs://tune-363401.appspot.com/tickets/4VfLNhjOjwXwvLEK2qE6t3W9Hgb2/4VfLNhjOjwXwvLEK2qE6t3W9Hgb2-1664245175065.jpg`,
      );
      console.log('🚀 ~ file: index.ts ~ line 52 ~ .onCall ~ result', result);

      const detections = result.textAnnotations;
      // detections?.forEach((text: string) => functions.logger.info(text));

      return detections;
      // TODO: fix any
    } catch (error: any) {
      functions.logger.error(error);
      throw new functions.https.HttpsError('failed-precondition', { ...error });
    }
  });

export const updateRemoteWithMegaData = functions.https.onCall(async (data, context) => {
  // const { fileName } = data;

  // context.app will be undefined if the request doesn't include an
  // App Check token. (If the request includes an invalid App Check
  // token, the request will be rejected with HTTP error 401.)
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.',
    );
  }

  // // Checking attribute.
  // if (!(typeof fileName === 'string') || fileName.length === 0) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError(
  //     'invalid-argument',
  //     'The function must be called with ' + 'one arguments "fileName" containing the path to the image.',
  //   );
  // }

  //  if (!context.auth) return { status: 'error', code: 401, message: 'Not signed in' };

  // Checking that the user is authenticated.
  // if (!context.auth) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError(
  //     'failed-precondition',
  //     'The function must be called ' + 'while authenticated.',
  //   );
  // }

  try {
    const original = 'message';
    const firestore = new Firestore({
      // NOTE: Don't hardcode your project credentials here.
      // If you have to, export the following to your shell:
      //   GOOGLE_APPLICATION_CREDENTIALS=<path>
      keyFilename: '../credentials/google_credentials.json',
    });
    const [result] = await firestore.collection('messages').add({
      message: original,
    });
    // Push the new message into Firestore using the Firebase Admin SDK.
    // const writeResult = await admin.firestore().collection('messages').add({ message: original });

    // Send back a message that we've successfully written the message
    // res.json({ result: `Message with ID: ${writeResult.id} added.` });
    return original;
    // TODO: fix any
  } catch (error: any) {
    functions.logger.error(error);
    throw new functions.https.HttpsError('failed-precondition', { ...error });
  }
});

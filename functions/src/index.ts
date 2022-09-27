import * as functions from 'firebase-functions';
const vision = require('@google-cloud/vision');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https // }) //   // Check tokens continue to your code. //   allowInvalidAppCheckToken: true, // Opt-out: Requests with invalid App // .runWith({
  .onCall(async (data, context) => {
    const { fileName } = data;
    console.log('🚀 ~ file: index.ts ~ line 9 ~ helloWorld ~ fileName', fileName);

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
    // if (!(typeof photos === 'object') || photos.length === 0) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new functions.https.HttpsError(
    //     'invalid-argument',
    //     'The function must be called with ' + 'one arguments "text" containing the message text to add.',
    //   );
    // }

    //  if (!context.auth) return { status: 'error', code: 401, message: 'Not signed in' };

    // // Checking that the user is authenticated.
    // if (!context.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new functions.https.HttpsError(
    //     'failed-precondition',
    //     'The function must be called ' + 'while authenticated.',
    //   );
    // }

    const client = new vision.ImageAnnotatorClient({
      keyFilename: '../credentials/google_credentials.json',
    });

    // const localFile =
    //   '/Users/ninja/Projects/4tune/functions/__tests__/images/4VfLNhjOjwXwvLEK2qE6t3W9Hgb2-1664243751757.jpeg';

    try {
      // const [result] = await client.textDetection(`${localFile}`);
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

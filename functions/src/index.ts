import * as functions from 'firebase-functions';
const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
import axios from 'axios';
import { LotteryDataUtils } from './utils/lottery-utils';
admin.initializeApp();

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
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.',
    );
  }
  try {
    let megaData = await axios.get('https://data.ny.gov/api/views/5xaw-6ayf/rows.json?accessType=DOWNLOAD');
    let records = megaData.data.data;
    // console.log(records[0]);
    const historyDataRef = admin.firestore().collection('historical-data-mega');
    const latest = await historyDataRef.orderBy('date', 'desc').limit(1).get();
    var latestStoredResultData = new Date('01/01/1980');
    if (latest.empty) {
      console.log('No matching documents.');
    } else {
      latestStoredResultData = latest.docs[0].data().date.toDate();
    }
    for (var i = 0; i < records.length; i++) {
      let ldm = LotteryDataUtils.parseMegaRecord(records[i]);

      if (ldm.date > latestStoredResultData) {
        console.log('adding record to store', ldm);
        const result = await historyDataRef.add(ldm);
        console.log(result);
      }
    }
    // console.log(latestStoredResultData);
    return 'Success';
  } catch (error: any) {
    functions.logger.error(error);
    throw new functions.https.HttpsError('failed-precondition', { ...error });
  }
});

import * as functions from 'firebase-functions';
const vision = require('@google-cloud/vision');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info('meow', request.body);
  // functions.logger.info('Hello logs!', { structuredData: true });

  // if (request.method !== 'POST') {
  //   return response.status(401).json({
  //     message: 'Not allowed',
  //   });
  // }
  const client = new vision.ImageAnnotatorClient();

  // TODO: this is for local path, haven't been able to make it work
  const fileName = '/Users/ninja/Downloads/sample.jpeg';

  try {
    const [result] = await client.textDetection(fileName);
    // const [result] = await client.textDetection(`gs://tune-363401.appspot.com/${fileName}`);

    const detections = result.textAnnotations;
    functions.logger.info('Text:');
    detections?.forEach((text: string) => functions.logger.info(text));
    response.status(200).send('Hello from Firebase!');
  } catch (error) {
    functions.logger.error(error);
    response.status(500).send(error);
  }
});

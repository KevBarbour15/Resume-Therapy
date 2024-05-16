const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// check if the user is an employee or not
const checkUserType = async (email) => {
  try {
    const userDoc = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (userDoc.empty) {
      return false;
    } else {
      const userData = userDoc.docs[0].data();
      return userData.employee;
    }
  } catch (err) {
    console.error(err);
    throw new functions.https.HttpsError('unknown', err.message);
  }
};

exports.logInWithEmailAndPassword = functions.https.onCall(
  async (data, context) => {
    const { email, password } = data;
    if (!email || !password) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Please enter a valid email and password',
      );
    }
    console.log(context);
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }

    const status = await checkUserType(email);
    if (status === null) {
      throw new functions.https.HttpsError(
        'unknown',
        'Error checking user type. Please try again.',
      );
    }

    if (status) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'This email is associated with an employee account. Please log in at the employee portal.',
      );
    }

    try {
      await auth.verifyPassword(userRecord.uid, password);
      return { uid: userRecord.uid };
    } catch (err) {
      console.error(err);
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Invalid username or password',
      );
    }
  },
);

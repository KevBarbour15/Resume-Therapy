const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const auth = admin.auth();

exports.logInWithEmailAndPassword = functions.https.onCall(async (data, context) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new functions.https.HttpsError('invalid-argument', 'Please enter a valid email and password');
  }

  console.log(context);

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }

    const status = await checkUserType(email);
    if (status === null) {
      throw new functions.https.HttpsError('unknown', 'Error checking user type. Please try again.');
    }

    if (status) {
      throw new functions.https.HttpsError('permission-denied', 'This email is associated with an employee account. Please log in at the employee portal.');
    }

    // Assuming you have a method to verify the password.
    const isPasswordValid = await verifyPassword(userRecord.uid, password);
    if (!isPasswordValid) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid username or password');
    }

    return { uid: userRecord.uid };
  } catch (err) {
    console.error(err);
    throw new functions.https.HttpsError('unknown', err.message);
  }
});

async function checkUserType(email) {
  // Implement your logic to check user type here
  // Example:
  try {
    const userDoc = await admin.firestore().collection('users').where('email', '==', email).get();
    if (userDoc.empty) {
      return null;
    }
    const userData = userDoc.docs[0].data();
    return userData.employee;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function verifyPassword(uid, password) {
  // Implement your password verification logic here
  // Example:
  const user = await admin.auth().getUser(uid);
  // Compare the provided password with the stored hash
  // This is just a placeholder; you should implement the actual verification
  return true; // Placeholder
}

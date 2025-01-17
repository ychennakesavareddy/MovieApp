// src/scripts/setAdminClaim.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Adjust the path as necessary

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://movieapp-baa92.firebaseio.com",
  projectId: "movieapp-baa92"
});

// Function to set admin custom claim
const setAdminClaim = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim set for user ${user.uid} (${email})`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
};

// Example usage
const userEmail = 'admin@example.com'; // Replace with the actual email of the user
setAdminClaim(userEmail);
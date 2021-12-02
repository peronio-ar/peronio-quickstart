const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} = require('firebase/firestore');

// Set Environments variables as Config
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
//
const claimedRef = collection(db, 'claimed');

// **** FUNCTIONS **** //

/**
 * Checks if this address already claimed
 * @param {String} address Ethereum address
 * @returns
 */
exports.hasAlreadyClaimed = async (address) => {
  console.info('Checking if already claimed...');

  // const q = query(claimedRef);
  const q = query(claimedRef, where('capital', '==', true));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
  return false;
};

/**
 * Stored in firestore the address as claimed
 * @param {String} address Ethereum address
 * @returns
 */
exports.storeAddressAsClaimed = (address) => {
  // console.info('Store address');
  return true;
};

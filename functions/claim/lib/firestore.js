const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
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
exports.hasAlreadyClaimed = async (address, ipAddress) => {
  const q = query(claimedRef, where('address', '==', address));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
};

/**
 * Stored in firestore the address as claimed
 * @param {String} address Ethereum address
 * @returns
 */
exports.storeAddressAsClaimed = async (address, ipAddress) => {
  return await addDoc(claimedRef, {
    address: address,
    ipAddress: ipAddress,
  });
};

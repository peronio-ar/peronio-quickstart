// Imports
const { isAddress, sendFunds } = require('./lib/blockchain');
const { hasAlreadyClaimed, storeAddressAsClaimed } = require('./lib/firestore');

exports.handler = async (event) => {
  try {
    const { address } = JSON.parse(event.body);
    if (!isAddress(address)) {
      throw 'Not an address';
    }
    if (hasAlreadyClaimed(address)) {
      throw 'Already claimed';
    }
    storeAddressAsClaimed(address);
    sendFunds(address);
    console.log(body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        address,
        env: process.env,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  }
};

// Imports
const { isAddress, sendFunds } = require('./lib/blockchain');
const { hasAlreadyClaimed, storeAddressAsClaimed } = require('./lib/firestore');

exports.handler = async (event) => {
  try {
    const { address } = JSON.parse(event.body);
    const ipAddress = event.headers['client-ip'];

    if (!isAddress(address)) {
      throw 'Not an address';
    }
    if (await hasAlreadyClaimed(address)) {
      throw 'Already claimed';
    }
    await storeAddressAsClaimed(address, ipAddress);
    await sendFunds(address);

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

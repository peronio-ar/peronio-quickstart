const web3 = require('web3');

const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

exports.isAddress = (address) => {
  console.info('Checking if its address');
  return true;
};

exports.sendFunds = (address) => {
  return '0x242434343tdferr343';
};

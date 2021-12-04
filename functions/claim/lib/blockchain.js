const Web3 = require('web3');
const path = require('path');
const cjson = require('cjson');
const TX = require('ethereumjs-tx').Transaction;
const Common = require('@ethereumjs/common').default;

console.info('Common: ');
console.dir(Common);
function isAddress(address) {
  console.info('Checking if its address');
  return web3.utils.isAddress(address);
}

async function sendFunds(address) {
  return claim(address);
}

// contract details
const provider = process.env.RPC_ADDRESS;
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
const defaultAccount = process.env.PUBLIC_ADDRESS;
const etherscanLink = 'https://polygonscan.com/tx/';

// initiate the web3
const web3 = new Web3(provider);
// initiate the contract with null valu
var contract = null;
// convert Wei to Eth
function convertWeiToEth(stringValue) {
  if (typeof stringValue != 'string') {
    stringValue = String(stringValue);
  }
  return web3.utils.fromWei(stringValue, 'ether');
}
// Initiate the Contract
function getContract() {
  if (contract === null) {
    var abi = cjson.load(path.resolve(__dirname, '../abi/Faucet.json'));
    var c = new web3.eth.Contract(abi, contractAddress);
    contract = c.clone();
  }
  console.log('Contract Initiated successfully!');
  return contract;
}
// Claim
async function claim(address) {
  if (address) {
    const rawTrans = getContract().methods.claim(address); // contract method
    return sendSignTransaction(rawTrans);
  } else {
    throw 'Wallet address or no. of tokens is missing.';
  }
}

// get the balance of given address
async function getBalance(address) {
  if (address) {
    // get the Ether balance of the given address
    var ethBalance = convertWeiToEth(await web3.eth.getBalance(address)) || '0';
    // get the token balance of the given address
    var tokenBalance =
      (await getContract().methods.balances(address).call()) || '0';
    // response data back to requestor
    return {
      'Ether Balance': ethBalance,
      'Token Balance': tokenBalance,
    };
  }
}
// Send Signed Transaction
async function sendSignTransaction(rawTrans) {
  // Initiate values required by the dataTrans
  if (rawTrans) {
    var txCount = await web3.eth.getTransactionCount(defaultAccount); // needed for nonce
    var abiTrans = rawTrans.encodeABI(); // encoded contract method
    var gas = await rawTrans.estimateGas({ from: defaultAccount });
    var gasPrice = await web3.eth.getGasPrice();
    gasPrice = Number(gasPrice);
    gasPrice = gasPrice * 2;
    var gasLimit = gas * 4;
    // Initiate the transaction data
    var dataTrans = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      to: contractAddress,
      data: abiTrans,
    };

    const customCommon = Common.forCustomChain(
      'mainnet',
      {
        name: 'custom',
        networkId: process.env.CHAIN_ID,
        chainId: process.env.CHAIN_ID,
      },
      'petersburg'
    );

    // sign transaction
    var tx = new TX(dataTrans, { common: customCommon });
    tx.sign(privateKey);
    // after signing send the transaction
    return await sendSigned(tx);
  } else {
    throw new console.error('Encoded raw transaction was not given.');
  }
}
function sendSigned(tx) {
  return new Promise(function (resolve, reject) {
    // send the signed transaction
    web3.eth
      .sendSignedTransaction('0x' + tx.serialize().toString('hex'))
      .once('transactionHash', function (hash) {
        var result = {
          status: 'sent',
          url: etherscanLink + hash,
          message: 'click the given url to verify status of transaction',
        };
        // respond with the result
        resolve(result);
      })
      .then((out) => {
        console.log(out);
      })
      .catch((err) => {
        // respond with error
        reject(err);
      });
  });
}
module.exports = {
  isAddress: isAddress,
  sendFunds: sendFunds,
};

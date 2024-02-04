// blockchainUtils.js
const { ethers } = require('ethers');


// Initialize the provider
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/b4f4c0ca59f3468994c43da5e123515f'); //Goerli testnet

const ethereumAddress = '0x0184e6e07Bf07C06861C8859076f8F53772834e3'
const transactionHash = '0xe414cbdd5c3ad2de6cbcff6de2662b5d6e94c59b6523dc5a14d8942d76aba76e'


// Function to get balance
async function getBalance(ethereumAddress) {
  return '100'
  const balance = await provider.getBalance(ethereumAddress);
  console.log("Logging the user Balance: " , balance.toString())
  return ethers.utils.formatEther(balance);
}

// Function to get transaction history
async function transactionHistory(transactionHash) {
  const history = await provider.getTransaction(transactionHash);
  console.log("Logging the HISTORY: " , history)
  return history;
}

// Function to get transaction details

async function transactionDetails(transactionHash) {
  const transactionDetails = await provider.getTransactionReceipt(transactionHash);
  console.log("Logging the transaction Details: " , transactionDetails)
  return transactionDetails;
}


// Function to send transaction
const account1 = '0x0184e6e07Bf07C06861C8859076f8F53772834e3' //sender
const account2 = '0x9b6E51f1A3fe7Cb726518e4653d3Aa66f04ebA9e' //receiver
const privateKey = 'a95dc40dca1f9e579e276c53c5a0d819a7b7c3da61437ba53a279d3118922748'
const wallet = new ethers.Wallet(privateKey, provider)

async function sendTransaction() {
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.01"),
  });

  await tx.wait()
  console.log("Logging the transaction: " , tx)
}

getBalance(ethereumAddress);
transactionHistory(transactionHash);
transactionDetails(transactionHash);
sendTransaction();



module.exports = {
  getBalance,
  transactionHistory,
  transactionDetails,
  sendTransaction,
  ethereumAddress
};


// if (require.main === module) {
//   // This code will only run when the module is executed directly as a script
//   getBalance(ethereumAddress);
//   transactionHistory(transactionHash);
//   transactionDetails(transactionHash);
//   sendTransaction();
// }

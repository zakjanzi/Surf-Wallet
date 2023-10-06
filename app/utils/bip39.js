const bip39 = require('bip39');
const { ethers } = require('ethers');
const { HDNode } = require('@ethersproject/hdnode');

import WalletAction from '../redux/walletReducer/actions'


const { storePublicKey, storeMasterseed } = WalletAction;

export const generateWallet = async (dispatch) => {

  console.log("generateWallet running");

  // Generate a mnemonic
  const mnemonic = bip39.generateMnemonic();

  // Derive the master seed from the mnemonic
  const masterSeed = bip39.mnemonicToSeedSync(mnemonic);

  // Derive Bitcoin private key
  const bitcoinMasterNode = HDNode.fromSeed(masterSeed);
  const bitcoinNode = bitcoinMasterNode.derivePath("m/44'/0'/0'/0");
  const bitcoinPrivateKey = bitcoinNode.privateKey.toString('hex');

  // Derive Ethereum private key
  const ethereumMasterNode = HDNode.fromSeed(masterSeed);
  const ethereumNode = ethereumMasterNode.derivePath("m/44'/60'/0'/0");
  const ethereumPrivateKey = ethereumNode.privateKey.toString('hex');

  // Create an ethers Wallet instance with the Ethereum private key
  const wallet = new ethers.Wallet(ethereumPrivateKey);

  // Access the public key from the Wallet instance
  const ethereumPublicKey = wallet.publicKey;

  dispatch(storePublicKey(ethereumPublicKey));
  dispatch(storeMasterseed(masterSeed));

  // Return the generated wallet data
  return {
    mnemonic,
    masterSeed: masterSeed.toString('hex'),
    bitcoinPrivateKey,
    ethereumPrivateKey,
    ethereumPublicKey,


  };

  // const wallet =  generateWallet();
  // console.log('Mnemonic:', wallet.mnemonic);
  // console.log('Master Seed:', wallet.masterSeed.toString('hex'));
  // console.log('Ethereum Public Key:', wallet.ethereumPublicKey);
  // console.log('Ethereum Private Key:', wallet.ethereumPrivateKey);
  // console.log('Bitcoin Private Key', wallet.bitcoinPrivateKey);
};



const bip39 = require('bip39');
const { fromSeed } = require('ethereumjs-wallet/hdkey');
const { fromMasterSeed } = require('bitcoinjs-lib');
const { HDNode } = require('ethers').utils;

const generateWallet = () => {
  // Generate a random mnemonic phrase
  const mnemonic = bip39.generateMnemonic();

  // Derive the master seed from the mnemonic
  const masterSeed = bip39.mnemonicToSeedSync(mnemonic);

  // Derive Bitcoin private key
  const bitcoinMasterNode = fromMasterSeed(masterSeed);
  const bitcoinNode = bitcoinMasterNode.derivePath("m/44'/0'/0'/0");
  const bitcoinPrivateKey = bitcoinNode.toWIF();

  // Derive Ethereum private key
  const ethereumMasterNode = fromSeed(masterSeed);
  const ethereumNode = ethereumMasterNode.derivePath("m/44'/60'/0'/0");
  const ethereumPrivateKey = ethereumNode.getWallet().getPrivateKey();

  // Example for USDT (Tether) token using Ethereum derivation path
  const usdtNode = ethereumMasterNode.derivePath("m/44'/60'/0'/0/0");
  const usdtPrivateKey = usdtNode.getWallet().getPrivateKey();

  // Return the generated wallet data or perform any other necessary actions
  return {
    mnemonic,
    bitcoinPrivateKey,
    ethereumPrivateKey,
    usdtPrivateKey,
  };
};

module.exports = {
  generateWallet,
};
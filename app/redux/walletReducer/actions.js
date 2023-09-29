const actions = {
    STORE_PUBLIC_KEY: 'wallet/STORE_PUBLIC_KEY',
  
    walletReducer: publicKey => dispatch =>
      dispatch({
        type: actions.STORE_PUBLIC_KEY,
        publicKey,
      }),
  };
  
  export default actions;
  
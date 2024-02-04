const actions = {
  
  storePublicKey: payload => dispatch =>
    dispatch({
      type: STORE_PUBLIC_KEY,
      payload,
    }),

    storeMasterseed: payload => dispatch =>
    dispatch({
      type: STORE_MASTERSEED,
      payload,
    }),

    storePincode: payload => dispatch =>
    dispatch({
      type: STORE_PINCODE,
      payload,
    }),

    storeWallet: payload => dispatch =>
    dispatch({
      type: STORE_WALLET,
      payload,
    }),

    storeAccessToken: payload => dispatch =>
    dispatch({
      type: STORE_ACCESS_TOKEN,
      payload,
    }),

    storeRefreshToken: payload => dispatch =>
    dispatch({
      type: STORE_REFRESH_TOKEN,
      payload,
    }),

    storeUserBalance: payload => dispatch =>
    dispatch({
      type: STORE_USER_BALANCE,
      payload,
    }),
};

export const STORE_PUBLIC_KEY ='CREATE_WALLET';
export const STORE_MASTERSEED ='STORE_MASTERSEED';
export const STORE_PINCODE ='STORE_PINCODE';
export const STORE_WALLET ='STORE_WALLET';
export const STORE_ACCESS_TOKEN ='STORE_ACCESS_TOKEN';
export const STORE_REFRESH_TOKEN ='STORE_REFRESH_TOKEN';
export const STORE_USER_BALANCE ='STORE_USER_BALANCE';

export default actions;

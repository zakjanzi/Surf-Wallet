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
};

export const STORE_PUBLIC_KEY ='CREATE_WALLET';
export const STORE_MASTERSEED ='STORE_MASTERSEED';
export const STORE_PINCODE ='STORE_PINCODE';

export default actions;

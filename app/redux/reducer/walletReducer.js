import { STORE_PUBLIC_KEY } from '../actions';

const initialState = {
  publicKey: null,
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.publicKey,
      };
    default:
      return state;
  }
}

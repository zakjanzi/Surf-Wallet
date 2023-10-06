import { STORE_MASTERSEED, STORE_PUBLIC_KEY, STORE_PINCODE, STORE_WALLET } from '../walletReducer/actions';

const initialState = {
  publicKey: null,
  masterSeed: null,
  pincode: null,
  wallet:null
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.payload,
      };

      case STORE_MASTERSEED:
        return {
          ...state,
          masterSeed: action.payload,
        };

        case STORE_PINCODE:
          return {
            ...state,
            pincode: action.payload,
          };
        case STORE_WALLET:
          return {
            ...state,
            wallet: action.payload,
          };


    default:
      return state;
  }
}

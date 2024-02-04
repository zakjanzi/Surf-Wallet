import { STORE_MASTERSEED, STORE_PUBLIC_KEY, STORE_PINCODE, STORE_WALLET, STORE_ACCESS_TOKEN, STORE_REFRESH_TOKEN, STORE_USER_BALANCE } from '../walletReducer/actions';

const initialState = {
  publicKey: null,
  masterSeed: null,
  pincode: null,
  wallet: null,
  accessToken: null,
  refreshToken: null, 
  userbalances:[]
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

        case STORE_ACCESS_TOKEN:
          return {
            ...state,
            accessToken: action.payload,
          };

        case STORE_REFRESH_TOKEN:
          return {
            ...state,
            refreshToken: action.payload,
          };
        case STORE_USER_BALANCE:
          return {
            ...state,
            userbalances: action.payload,
          };


    default:
      return state;
  }
}

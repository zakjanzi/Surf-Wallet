import { combineReducers } from 'redux';
import auth from './auth/reducer';
import wallet from './walletReducer';

const rootReducer = combineReducers({
  auth,
  wallet,
});

export default rootReducer;

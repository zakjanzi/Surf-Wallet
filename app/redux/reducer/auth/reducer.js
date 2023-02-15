/* eslint-disable no-console */
import types from './actions';

const initialState = {
  userData: {},
  currentLanguage: 'en',
  dark: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERDATA:
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_DARK:
      return {
        ...state,
        dark: action.dark,
      };
    case types.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.currentLanguage,
      };

    case types.LOGOUT:
      return {
        userData: {},
      };
    default:
      return state;
  }
}

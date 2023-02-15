const actions = {
  SET_USERDATA: 'auth/SET_USERDATA',
  SET_LANGUAGE: 'auth/SET_LANGUAGE',
  SET_DARK: 'auth/SET_DARK',
  LOGOUT: 'auth/LOGOUT',

  setUserData: userData => dispatch =>
    dispatch({
      type: actions.SET_USERDATA,
      userData,
    }),

  setDark: dark => dispatch =>
    dispatch({
      type: actions.SET_DARK,
      dark,
    }),

  setCurrentLanguage: currentLanguage => dispatch =>
    dispatch({
      type: actions.SET_LANGUAGE,
      currentLanguage,
    }),

  // setStoreData: (storeData) => (dispatch) =>
  //   dispatch({
  //     type: actions.SET_STOREDATA,
  //     storeData,
  //   }),

  logout: () => dispatch =>
    dispatch({
      type: actions.LOGOUT,
    }),
};

export default actions;

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'language',
  initialState: { language: 'en' }, //It can be either 'en' or 'ar'
  reducers: {
    changeLanguage: (state, { payload: { lang } }) => {
      if (typeof lang !== 'undefined') {
        state.language = lang
      }
    }
  },
})

export const { changeLanguage } = slice.actions

export default slice.reducer

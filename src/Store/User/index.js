import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'users',
  initialState: { public_address: "", email: "" }, 
  reducers: {
    changeAddress: (state, { payload: { public_address } }) => {
      if (typeof public_address !== 'undefined') {
        state.public_address = public_address
      }
    },
    changeEmail: (state, { payload: { email } }) => {
        if (typeof email !== 'undefined') {
          state.email = email
        }
    }
  },
})

export const { changeLanguage } = slice.actions

export default slice.reducer

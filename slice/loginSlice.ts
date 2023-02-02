import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TLogin {
  access_token: string;
  expires_in: any;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    createLogin(state, action: PayloadAction<any>) {
      return (state = action.payload);
    },
  },
});

export const {createLogin} = loginSlice.actions;

export default loginSlice.reducer;

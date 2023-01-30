import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TLogin {
  id: number;
  userName: string;
  password: string;
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    createLogin(state, action: PayloadAction<TLogin>) {
      return (state = action.payload);
    },
  },
});

export const {createLogin} = loginSlice.actions;

export default loginSlice.reducer;

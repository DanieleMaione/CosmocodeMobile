import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TDeveloper} from '../src/components-shared/types';

const initialState: TDeveloper[] = [];

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<Array<TDeveloper>>) {
      state = action.payload;
    },
  },
});

export const {addUser} = userSlice.actions;

export default userSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TNotification {
  _id: string;
  createdAt: string;
  idGist: string;
  readed: boolean;
  subject: string;
  type: string;
  username: string;
}

export interface TUser {
  user: {
    _id: string;
    about: string | null;
    avatar_url: string;
    createdAt: string;
    email: string;
    idGithub: string;
    isAdmin: boolean;
    isExternalUser: boolean;
    isAmbassador: boolean;
    lastUpdate: string;
    notification: TNotification[];
    popular: boolean;
    registrationNumber: number;
    sponsor: {
      _id: string;
      avatar_url: string;
      username: string;
    };
    tags: string[];
    username: string;
    followers: any[];
    following: any[];
    likedGists: any[];
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    userInfo(state, action: PayloadAction<TUser>) {
      return (state = action.payload);
    },
  },
});

export const {userInfo} = userSlice.actions;

export default userSlice.reducer;

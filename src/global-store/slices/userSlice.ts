import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userInitialState } from '@global-store/initial-states/user';
import { User } from '@blue-prints/global-store/user';

export const userSlice = createSlice({
    name: 'userInitialState',
    initialState: userInitialState,
    reducers: {
        updateEntireUserState: (state: User, action: PayloadAction<User>) => {
            return {
                ...state,
                ...action.payload,
            } as User;
        },
        updateUserName: (state: User, action: PayloadAction<string>) => {
            return {
                ...state,
                name: action.payload,
            } as User;
        },
    },
});

export const { 
    updateEntireUserState,
    updateUserName,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;

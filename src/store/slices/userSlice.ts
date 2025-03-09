import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userInitialState } from '@store/initialStates/user.initial.state';
import { User } from '@store/initialStates/user.initial.state';

export const UserSlice = createSlice({
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
} = UserSlice.actions;

export const UserSliceReducer = UserSlice.reducer;

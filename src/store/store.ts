import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { UserSliceReducer } from '@store/slices/userSlice';

const rootReducer = {
    user: UserSliceReducer,
};

const logger = createLogger();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
    devTools: __DEV__,
});

export default store;
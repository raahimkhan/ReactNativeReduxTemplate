import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { userSliceReducer } from '@global-store/slices/user-slice';

const rootReducer = {
    user: userSliceReducer,
};

const logger = createLogger();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
    devTools: __DEV__,
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';
import authenticateReducer from './features/authenticateSlice';

// The store is created using configureStore from Redux Toolkit. The store is configured with the apiSlice reducer and middleware, as well as the authenticate reducer. The setupListeners function is called with the store.dispatch function to set up the query middleware.
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authenticate: authenticateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export default store;
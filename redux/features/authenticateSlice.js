import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the slice using the initialState object and the localStorage value for the userInfo key
const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

const authenticateSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Define a reducer to set the userInfo state to the payload
        setUserInfo(state, action) {
            // Set the userInfo state to the payload and save it to localStorage
            // Actions are automatically generated for each reducer method defined in the reducers object.
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            const expiration = new Date(
                new Date().getTime() + 1000 * 60 * 60 * 24 * 3
            );
            localStorage.setItem('expiration', expiration.toISOString());
        },
        // Define a reducer to clear the userInfo state
        clearUserInfo(state) {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setUserInfo, clearUserInfo } = authenticateSlice.actions;
export default authenticateSlice.reducer;

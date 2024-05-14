import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: USERS_URL,
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        getCurrentUserProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            }),
        }),
        updateCurrentUserProfile: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body,
            }),
        }),
        // Admin routes
        deleteUserById: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/${body.id}`,
                method: 'DELETE',
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
        }),
        getUserById: builder.query({
            query: (body) => ({
                url: `${USERS_URL}/${body.id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUserById: builder.mutation({
            query: (body) => ({
                url: `${USERS_URL}/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetCurrentUserProfileQuery,
    useUpdateCurrentUserProfileMutation,
    useDeleteUserByIdMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
} = userApiSlice;

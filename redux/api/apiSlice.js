import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query';
import { BASE_URL } from '../constants';

// Create a baseQuery using fetchBaseQuery and the BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an apiSlice using createApi and the baseQuery
export const apiSlice = createApi({
    baseQuery,
    // The tagTypes property is used to define the types of tags that can be used in the endpoints
    tagTypes: ['User'],
    // The endpoints property is used to define the API endpoints, we will inject them later from various slices
    endpoints: () => ({}),
});

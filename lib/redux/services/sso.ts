import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const ssoApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/sso',
    }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (arg) => ({
                url: '/login',
                body: new FormData()
            }),
        })
    })
})

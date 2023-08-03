import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'
import {BaseQueryArg} from '@reduxjs/toolkit/src/query/baseQueryTypes'

export interface DownloadTokenArg {
    jobId: string
    workshopId: string
    credential: string
}

export type DownloadTokenRes = {
    token: string
}

const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/job',
    }),
    endpoints: (build) => ({
        getDownloadToken: build.mutation({
            query(arg: DownloadTokenArg) {
                return {
                    url: `${arg.jobId}/token`,
                    params: {
                        workshopId: arg.workshopId,
                    },
                    method: 'GET',
                    headers: {
                        'X-Kaiwu-Credential-Token': arg.credential,
                    }
                }
            }
        })
    })
})

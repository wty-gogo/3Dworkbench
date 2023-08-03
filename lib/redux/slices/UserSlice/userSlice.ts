import {createSlice} from "@reduxjs/toolkit";

export interface UserState {
    userInfo: any,
    token: string | null
}

const initialState = {
    userInfo: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {

    }
})

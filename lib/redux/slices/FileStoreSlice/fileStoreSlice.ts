import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface FileStoreState {
    index: {
        arrayBuffers: string[],
        files: string[]
    }
}

const initialState: FileStoreState = {
    index: {
        arrayBuffers: [],
        files: []
    }
}

export type IndexType = keyof FileStoreState['index']

export const fileStoreSlice = createSlice({
    name: 'fileStore',
    initialState: initialState,
    reducers: {
        updateIndex: (state, action: PayloadAction<{ type: IndexType, index: string[] }>) => {
            const {type} = action.payload
            state.index[type] = []
        }
    }
})

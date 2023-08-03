/* Instruments */
import {jsonFormSlice, modelSlice, contextMenuSlice, fileStoreSlice} from './slices'

export const reducer = {
    [jsonFormSlice.name]: jsonFormSlice.reducer,
    [modelSlice.name]: modelSlice.reducer,
    [contextMenuSlice.name]: contextMenuSlice.reducer,
    [fileStoreSlice.name]: fileStoreSlice.reducer
}

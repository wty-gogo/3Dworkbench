'use client'
import React, {PropsWithChildren, useRef} from 'react'
import {fileStoreSlice, useDispatch, useSelector} from '@/lib/redux'
import {keys} from 'ramda'

interface FileContextValue {
    arrayBuffers: Record<string, ArrayBuffer>,
    files: Record<string, File>,
    addFile?: (key: string, file: File) => void
    removeFile?: (key: string) => void
    addArrayBuffer?: (key: string, arrayBuffer: ArrayBuffer) => void
    removeArrayBuffer?: (key: string) => void
    indexes: { arrayBuffers: string[], files: string[] }
}

export const FileContext = React.createContext<FileContextValue>({
    arrayBuffers: {},
    files: {},
    indexes: {arrayBuffers: [], files: []}
})

function FileContextWrapper(props: PropsWithChildren) {
    const dispatch = useDispatch()
    const indexes = useSelector(state => state.fileStore.index)
    const {updateIndex} = fileStoreSlice.actions
    const arrayBufferRef = useRef<FileContextValue['arrayBuffers']>({})
    const fileRef = useRef<FileContextValue['files']>({})
    const addArrayBuffer = (key: string, arrayBuffer: ArrayBuffer) => {
        arrayBufferRef.current[key] = arrayBuffer
        dispatch(updateIndex({
            type: 'arrayBuffers',
            index: keys(arrayBufferRef.current)
        }))
    }
    const addFile = (key: string, file: File) => {
        fileRef.current[key] = file
        dispatch(updateIndex({
            type: 'files',
            index: keys(fileRef.current)
        }))
    }
    const removeArrayBuffer = (key: string) => {
        delete arrayBufferRef.current[key]
        dispatch(updateIndex({
            type: 'arrayBuffers',
            index: keys(arrayBufferRef.current)
        }))
    }
    const removeFile = (key: string) => {
        delete fileRef.current[key]
        dispatch(updateIndex({
            type: 'files',
            index: keys(fileRef.current)
        }))
    }
    return (
        <FileContext.Provider value={{
            arrayBuffers: arrayBufferRef.current,
            files: fileRef.current,
            addFile: addFile,
            addArrayBuffer: addArrayBuffer,
            removeFile: removeFile,
            removeArrayBuffer: removeArrayBuffer,
            indexes: indexes
        }}>
            {props.children}
        </FileContext.Provider>
    )
}

export default FileContextWrapper

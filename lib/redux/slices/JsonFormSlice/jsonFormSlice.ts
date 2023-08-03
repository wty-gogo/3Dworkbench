import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {JsonFormType} from '@/lib/JsonForm/type'
import {assocPath} from 'ramda'

export interface SchemaFormState {
    formState: Record<string, {
        value: any,
        json: JsonFormType.Json[]
    }>,
}

const initialState: SchemaFormState = {
    formState: {}
}

export const jsonFormSlice = createSlice({
    name: 'jsonForm',
    initialState,
    reducers: {
        registerForm: (state, action: PayloadAction<{ formId: string, json: JsonFormType.Json[] }>) => {
            state.formState[action.payload.formId] = {
                value: {},
                json: action.payload.json,
            }
        },
        unRegisterForm: (state, action: PayloadAction<{ formId: string }>) => {
            delete state.formState[action.payload.formId]
        },
        setFormValue: (state, action: PayloadAction<{ formId: string, value: any }>) => {
            state.formState[action.payload.formId].value = action.payload.value
        },
        setFormValueByPath: (state, action: PayloadAction<{ formId: string, path: string[], value: any }>) => {
            const {formId, path, value} = action.payload
            return assocPath(path, value, state.formState[formId].value)
        }
    }
})



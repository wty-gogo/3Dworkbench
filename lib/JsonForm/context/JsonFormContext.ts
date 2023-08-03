import React from 'react'
import {JsonFormType} from '@/lib/JsonForm/type'

interface JsonFormContextValue {
    json?: JsonFormType.Json[]
    formId?: string
}

export const JsonFormContext = React.createContext<JsonFormContextValue>({})

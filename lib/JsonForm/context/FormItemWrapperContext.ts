import React from 'react'
import {FormItemWrapperProps} from '@/lib/JsonForm'

export const FormItemWrapperContext = React.createContext<FormItemWrapperProps>({
    widget: ''
})

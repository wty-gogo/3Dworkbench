import React from 'react'
import {Input, InputProps} from 'antd'
import {JsonFormType} from '@/lib/JsonForm/type'


interface InputWidgetProps extends JsonFormType.BaseWidgetProps, InputProps {
    value?: any
    onChange?: (value?: any) => void
}

export function InputWidget(props: InputWidgetProps) {
    const {value, onChange, formId, ...otherProps} = props
    return (
        <Input value={value} onChange={onChange} {...otherProps}/>
    )
}

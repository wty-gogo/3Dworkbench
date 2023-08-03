import React from 'react'
import {Select, SelectProps} from 'antd'
import {JsonFormType} from '@/lib/JsonForm'

type SelectValue = string[] | string

interface SelectWidgetProps extends JsonFormType.BaseWidgetProps, SelectProps {
    value?: SelectValue
    onChange?: (value: SelectValue) => void
    widget?: string
}

export function SelectWidget(props: SelectWidgetProps) {
    const {value, onChange, widget, formId, ...otherProps} = props
    // useWhyDidYouUpdate('SelectWidget', props)
    return (
        <Select value={value} onChange={onChange} {...otherProps}/>
    )
}

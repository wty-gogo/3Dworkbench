import React from 'react'
import {Select} from 'antd'

interface MaterialSelectorProps {
    value?: string[]
    onChange?: (value: string[]) => void
}

export function MaterialSelector(props: MaterialSelectorProps) {
    const {value, onChange} = props
    const triggerChange = (value: string[]) => {
        onChange?.(value)
    }
    const options = [
        {
            label: '测试材料',
            value: '4Rqd6oxcchL'
        }
    ]
    return (
        <Select
            value={value}
            onChange={triggerChange}
            options={options}
            defaultValue={['4Rqd6oxcchL']}
        />
    )
}

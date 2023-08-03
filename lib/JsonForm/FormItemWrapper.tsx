'use client'
import {Form, FormItemProps} from 'antd'
import React, {useCallback, useEffect, useId, useMemo} from 'react'
import Widget from '@/lib/JsonForm/Widget'
import {JsonFormType} from '@/lib/JsonForm/type'
import {FormItemWrapperContext} from '@/lib/JsonForm/context'
import {useWhyDidYouUpdate} from 'ahooks'

export interface FormItemWrapperProps {
    widget: string
    widgetProps?: any,
    formItemProps?: FormItemProps
    json?: JsonFormType.Json
}

export function FormItemWrapper(props: FormItemWrapperProps) {

    const {widget, widgetProps, formItemProps} = props

    const key = useId()

    useWhyDidYouUpdate('FormItemWrapper', props)

    useEffect(() => {
        console.log('FormItemWrapperUpdate', widget)
    })

    return (
        <FormItemWrapperContext.Provider value={props}>
            <Form.Item {...formItemProps}>
                <Widget widget={widget}/>
            </Form.Item>
        </FormItemWrapperContext.Provider>
    )
}

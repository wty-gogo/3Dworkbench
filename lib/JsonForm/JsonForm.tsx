'use client'
import React, {useCallback, useEffect, useId, useMemo} from 'react'
import {FormItemWrapper, JsonFormType, JsonFormContext} from '@/lib/JsonForm'
import {Button, Form, FormItemProps} from 'antd'
import {useRouter} from 'next/navigation'
import {jsonFormSlice, selectValueById, useDispatch, useSelector} from '@/lib/redux'
import {useWhyDidYouUpdate} from 'ahooks'

interface JsonFormProps {
    json: JsonFormType.Json[]
}

const getFormItemProps = (json: JsonFormType.Json) => {
    const formItemProps: FormItemProps = {
        label: json.label,
        name: json.dataIndex,
        hidden: json.hidden,
        tooltip: json.tooltip,
        initialValue: json.defaultValue,
        ...json.formItemProps
    }

    return formItemProps
}

const getWidgetProps = (json: JsonFormType.Json) => {
    const widgetProps: any = {
        ...json.widgetProps
    }
    return widgetProps
}


const renderByJson = (json: JsonFormType.Json[]) => {
    console.log(111)
    return json.map((jsonItem: JsonFormType.Json) => {
        return <FormItemWrapper
            key={jsonItem.dataIndex}
            widget={jsonItem.widget}
            formItemProps={getFormItemProps(jsonItem)}
            widgetProps={{
                ...getWidgetProps(jsonItem),
            }}
            json={jsonItem}
        />
    })
}


/**
 * 通过json表单组件
 */
function JsonForm(props: JsonFormProps) {

    const {json} = props

    const {registerForm, unRegisterForm, setFormValue} = jsonFormSlice.actions

    const dispatch = useDispatch()

    const router = useRouter()

    const formId = 'jk'

    const value = useSelector(selectValueById(formId))


    useEffect(() => {
        dispatch(registerForm({
            formId: formId,
            json: json,
        }))
        return () => {
            dispatch(unRegisterForm({
                formId: formId
            }))
        }
    }, [])

    const renderedJson = useMemo(() => renderByJson(json), [json])

    return (<JsonFormContext.Provider value={{
        json: json,
        formId: formId
    }}>
        <Button onClick={() => router.refresh()}>刷新表单</Button>
        <Form
            fields={value}
            layout={'vertical'}
            onFieldsChange={(changedFields, allFields) => {
                dispatch(setFormValue({
                    formId: formId,
                    value: allFields
                }))
            }}
        >
            {renderedJson}
        </Form>
    </JsonFormContext.Provider>)
}

export default JsonForm

import {FormItemProps} from 'antd'

export declare module JsonFormType {
    interface Json {
        key: string
        dataIndex: string
        widget: string
        widgetProps?: any
        defaultValue?: any
        formItemProps?: any
        label?: string
        tooltip?: string
        rules?: string
        hidden?: boolean
        disabled?: boolean
        readOnly?: boolean
        dependencies?: string[]
        children?: JsonFormType.Json[]
    }
    interface BaseWidgetProps {
        formId: string
    }
}


import React, {memo, useContext, useEffect} from 'react'
import {InputWidget, MaterialSelector, SelectWidget, SurfaceSelector} from '@/lib/JsonForm/widgets'
import {FormItemWrapperContext} from '@/lib/JsonForm/context'
import {pick} from 'ramda'
import {useWhyDidYouUpdate} from 'ahooks'


interface WidgetProps {
    widget: string
    id?: string
    value?: any,
    onChange?: (value: any) => void
}

const getComponentProps = pick(['id', 'value', 'onChange'])

function Widget(props: WidgetProps) {
    const {widget} = props
    const {json, widgetProps: _widgetProps} = useContext(FormItemWrapperContext)
    const componentProps = getComponentProps(props)

    // useWhyDidYouUpdate('Widget', props)

    const widgetProps = {
        ..._widgetProps,
        ...componentProps,
    }

    switch (widget) {
        case 'input' :
            return <InputWidget {...widgetProps}/>
        case 'inputNumber' :
            // TODO: inputNumber
            return <div>inputNumber</div>
        case 'select' :
            return <SelectWidget {...widgetProps}/>
        case 'radio' :
            // TODO: radio
            return <div>radio</div>
        case 'checkbox' :
            return <div>checkbox</div>
        case 'switch' :
            return <div>switch</div>
        case 'surfaceSelector' :
            return <SurfaceSelector json={json} {...widgetProps}/>
        case 'solidSelector':
            return <div>solidSelector</div>
        case 'materialSelector':
            return <MaterialSelector/>
        default:
            return <div>未知组件</div>
    }
}

export default Widget

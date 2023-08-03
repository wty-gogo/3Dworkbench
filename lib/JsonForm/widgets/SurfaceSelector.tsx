import React, {useContext, useEffect} from 'react'
import {Select, Tag} from 'antd'
import {contextMenuSlice, jsonFormSlice, modelSlice, selectTreeMap, useDispatch, useSelector} from '@/lib/redux'
import {FormItemWrapperContext, JsonFormContext} from '@/lib/JsonForm'

const deleteSurface = (surfaces: string[], target: string) => {
    return surfaces.filter(v => v !== target)
}

interface SurfaceSelectorProps {
    value?: string[]
    onChange?: (value: string[]) => void,
}

export function SurfaceSelector(props: SurfaceSelectorProps) {
    const {value = [], onChange, ...otherProps} = props
    const treeMap = useSelector(selectTreeMap)
    const {setFormValue} = jsonFormSlice.actions
    const {registerToExtra, unregisterExtra} = contextMenuSlice.actions
    const {hoverOn, hoverOff} = modelSlice.actions

    const {json} = useContext(FormItemWrapperContext)
    const {formId} = useContext(JsonFormContext)

    const dispatch = useDispatch()

    if (!formId) return <div>无父表单id</div>

    useEffect(() => {
        dispatch(registerToExtra({
            fieldName: json?.dataIndex || '',
            type: 'SurfaceSelector',
            title: json?.label || '未命名',
        }))
        return () => {
            dispatch(unregisterExtra({
                fieldName: json?.dataIndex || '',
                type: 'SurfaceSelector',
            }))
        }
    }, [])
    return (
        <Select
            value={value}
            onChange={onChange}
            mode={'multiple'}
            open={false}
            showArrow={false}
            tagRender={({value: SurfaceId}) => {
                return (
                    <Tag
                        className={'hover:bg-neutral-700'}
                        closable={true}
                        onClose={(e) => {
                            e.preventDefault()
                            dispatch(setFormValue({
                                formId: formId,
                                value: deleteSurface(value, SurfaceId)
                            }))
                            dispatch(hoverOff(SurfaceId))
                        }}
                        onPointerEnter={() => {
                            dispatch(hoverOn(SurfaceId))
                        }}
                        onPointerLeave={() => {
                            dispatch(hoverOff(SurfaceId))
                        }}
                    >
                        {treeMap[SurfaceId].internalSurfaceName}
                    </Tag>)
            }}
        />
    )
}

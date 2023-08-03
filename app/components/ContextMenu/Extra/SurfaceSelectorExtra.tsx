import React from 'react'
import ContextMenuItem from '@/app/components/ContextMenu/ContextMenuItem'
import {jsonFormSlice, useDispatch, useSelector} from '@/lib/redux'
import {append, dropWhile, filter, has, includes, keys} from 'ramda'

//FIXME 待完成
const selectValues = () => {}
const setValueByPath = () => {}

const addSurface = (surfaces: string[] = [], appendedSurface: string) => {
    const exist = includes(appendedSurface, surfaces)
    const result = exist ? surfaces : append(appendedSurface, surfaces)
    return exist ? surfaces : append(appendedSurface, surfaces)
}


function SurfaceSelectorExtra() {
    const dispatch = useDispatch()
    const {setFormValueByPath} = jsonFormSlice.actions
    const context = useSelector(state => state.contextMenu.context)
    const extraConfig = useSelector(state => state.contextMenu.extraConfig?.['SurfaceSelector'])
    const formValue = useSelector(selectValues)

    if (!extraConfig) {
        return <></>
    }

    return (
        <>
            {
                keys(extraConfig).map(v => {
                    return <ContextMenuItem key={v} title={`设置为${extraConfig[v].title}`} onClick={() => {
                        const {fieldName} = extraConfig[v]
                        dispatch(setFormValueByPath({
                            formId: 'jk',
                            path: [fieldName],
                            value: addSurface(formValue?.[fieldName], context?.object?.id)
                        }))
                    }}/>
                })
            }
        </>
    )
}

export default SurfaceSelectorExtra

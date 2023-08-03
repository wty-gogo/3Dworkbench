'use client'
import * as React from 'react'
import {MeshProps} from '@react-three/fiber'
import {useDispatch, useSelector} from '@/lib/redux'
import {modelSlice} from 'lib/redux/slices/ModelSlice'
import {colorFn} from '@/lib/utils'
import {selectNodeById} from "@/lib/redux/slices/ModelSlice/selectors";


export const Points = (props: MeshProps) => {
    const {material, uuid} = props

    if (!uuid) {
        console.error('当前面uuid为空')
        return <></>
    }

    const {hoverOn, hoverOff, select, unselect} = modelSlice.actions

    const dispatch = useDispatch()

    const nodeSelector = selectNodeById(uuid)
    const {hovered, selected, visible} = useSelector(nodeSelector)

    const color = selected ? colorFn(0xf43f5e) : hovered ? colorFn(0xd97706) : colorFn(0x3b82f6)

    return (
        <>
            {
                visible && <points
                    geometry={props.geometry}
                    onPointerEnter={(e) => {
                        e.stopPropagation()
                        dispatch(hoverOn(uuid))
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation()
                        dispatch(hoverOff(uuid))
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!selected) {
                            dispatch(select(uuid))
                        }
                        if (selected) {
                            dispatch(unselect(uuid))
                        }
                    }}
                >
                    <pointsMaterial color={color}/>
                    {/*<meshStandardMaterial color={color}/>*/}
                    {/*<meshBasicMaterial color={color}/>*/}
                </points>
            }
        </>
    )
}

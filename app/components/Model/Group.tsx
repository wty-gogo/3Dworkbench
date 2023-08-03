'use client'
import React, {forwardRef, PropsWithChildren, Ref} from 'react'
import {dissocPath} from 'ramda'
import {GroupProps} from '@react-three/fiber'
import {useSelector} from '@/lib/redux'
import {colorFn} from '@/lib/utils'
import * as THREE from 'three'
import {selectNodeById} from "@/lib/redux/slices/ModelSlice/selectors"


export default forwardRef(
    function Group(props: PropsWithChildren<GroupProps>, ref: Ref<THREE.Group>) {

        const {uuid} = props

        if (!uuid) {
            console.error('当前Group uuid为空')
            return <></>
        }

        const nodeSelector = selectNodeById(uuid)
        const {hovered, selected, visible} = useSelector(nodeSelector)

        const propsWithoutChildren: GroupProps = dissocPath(['children'], props)


        const color = selected ? colorFn(0xf43f5e) : hovered ? colorFn(0xd97706) : colorFn(0x3b82f6)

        return (
            <>
                {visible &&
                    <group
                        {...propsWithoutChildren}
                        // position={position}
                        visible={visible}
                        ref={ref}
                    >
                        {props.children}
                        <meshStandardMaterial color={color}/>
                    </group>
                }
            </>
        )
    })



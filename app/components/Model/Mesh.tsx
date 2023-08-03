'use client'
import * as React from 'react'
import {useRef, useState} from 'react'
import {MeshProps, useFrame} from '@react-three/fiber'
import {contextMenuSlice, selectNodeById, useDispatch, useSelector} from '@/lib/redux'
import {modelSlice} from 'lib/redux/slices/ModelSlice'
import {colorFn} from '@/lib/utils'
import * as THREE from 'three'
import {Lut} from 'three/examples/jsm/math/Lut'
import {Html, useBVH, useTexture} from '@react-three/drei'
import {ContextMenuType} from '@/app/components/ContextMenu/MenuConfigs/type'

const Mesh = (props: MeshProps) => {
    const {material, uuid} = props

    if (!uuid) {
        console.error('当前面uuid为空')
        return <></>
    }

    const mesh = useRef<any>()

    const {hoverOn, hoverOff, select, unselect} = modelSlice.actions

    const dispatch = useDispatch()

    const nodeSelector = selectNodeById(uuid)
    const {hovered, selected, visible} = useSelector(nodeSelector)

    const color = selected ? colorFn(0xf43f5e) : hovered ? colorFn(0xd97706) : colorFn(0x3b82f6)
    const lut = new Lut()

    const colorMap = new THREE.CanvasTexture(lut.createCanvas())
    colorMap.colorSpace = THREE.SRGBColorSpace

    useBVH(mesh, {})
    const img = useTexture({
        map: '1687757580180.jpg'
    })

    return (
        <group>
            {
                visible && <mesh
                    {...props}
                    ref={mesh}
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
                    onContextMenu={(e) => {
                        e.stopPropagation()
                        dispatch(contextMenuSlice.actions.openContextMenu({
                            position: {
                                x: e.x,
                                y: e.y
                            },
                            context: {
                                type: ContextMenuType.MESH,
                                object: {
                                    id: props.uuid
                                }
                            }
                        }))
                    }}
                >
                    <meshStandardMaterial color={color}/>
                    {/*<meshBasicMaterial color={color}/>*/}
                </mesh>
            }
        </group>
    )
}

export default Mesh

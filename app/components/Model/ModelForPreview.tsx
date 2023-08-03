import {modelSlice, useDispatch} from '@/lib/redux'
import React, {useEffect} from 'react'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export interface ModelProps {
    // 开启模型预览模式（无交互，不分层）
    preview?: boolean
    gltf: GLTF
}

function ModelForPreview(props: ModelProps) {

    const {preview, gltf} = props

    const dispatch = useDispatch()

    useEffect(() => {
        const cameraProps = getCameraProps(gltf)
        dispatch(modelSlice.actions.updateCameraState(cameraProps))
        console.log('元数据', gltf)
    }, [gltf])

    // 改变相机视锥体范围，仅适用于正交相机
    const getCameraProps = (gltf: GLTF) => {
        // 计算模型的包围盒
        const box = new THREE.Box3().setFromObject(gltf.scene)

        // 获取边界框的尺寸
        const size = box.getSize(new THREE.Vector3())
        // 获取边界框的最大尺寸
        const maxDimension = Math.max(size.x, size.y, size.z)

        const aspect = window.innerWidth / window.innerHeight
        const cameraHeight = (maxDimension * 2) / 2 // 相机高度为边界框最大尺寸的一半
        const cameraWidth = cameraHeight * aspect

        return {
            left: -cameraWidth,
            right: cameraWidth,
            top: cameraHeight,
            bottom: -cameraHeight,
            position: [0, 0, cameraHeight] as [x: number, y: number, z: number]
        }
    }

    return (
        <>
            {
                <mesh>
                    <primitive object={gltf.scene}/>
                </mesh>
            }
        </>
    )
}

export default ModelForPreview

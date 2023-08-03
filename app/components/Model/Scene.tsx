'use client'
import React, {useEffect, useRef} from 'react'
import {Canvas} from '@react-three/fiber'
import {GizmoHelper, GizmoViewport, Html, OrbitControls, OrthographicCamera, TrackballControls} from '@react-three/drei'

import * as THREE from 'three'
import {modelSlice, useDispatch, useSelector} from '@/lib/redux'
import Model from '@/app/components/Model/Model'
import {ModelConfig, ModelConfigContext} from '@/app/components/Model/context/ModelConfigContext'
import {isNil} from 'ramda'
import ContextMenuWrapper from '@/app/components/ContextMenuWrapper'

function SceneContent() {

    const radius = 100000
    const fov = 50

    const cameraRef = useRef<THREE.OrthographicCamera>()

    const cameraState = useSelector(state => state.model.cameraState)

    const resetCamera = () => {
        if (cameraRef.current) {
            console.log('执行相机重置')
            cameraState?.bottom && (cameraRef.current.bottom = cameraState.bottom)
            cameraState?.top && (cameraRef.current.top = cameraState.top)
            cameraState?.left && (cameraRef.current.left = cameraState.left)
            cameraState?.right && (cameraRef.current.right = cameraState.right)
            cameraState?.position && cameraRef.current.position.set(...cameraState.position)
            // cameraState?.zoom && (cameraRef.current.zoom = cameraState.zoom)
            cameraRef.current.updateProjectionMatrix()
        }
    }

    useEffect(() => {
        resetCamera()
    }, [cameraState])

    const bg = new THREE.Color(0x404040)

    return (
        <group>
            <color attach={'background'} args={[bg.r, bg.g, bg.b]}/>
            <ambientLight intensity={0.5} color={0xffffff}/>
            <directionalLight intensity={0.7} position={[0, 2 * radius, 0]}/>
            <directionalLight intensity={0.7} position={[2 * radius, -2 * radius, 2 * radius]}/>
            <directionalLight intensity={0.7} position={[-2 * radius, -2 * radius, -2 * radius]}/>

            <Model/>

            <GizmoHelper alignment="bottom-center" margin={[100, 100]}>
                <GizmoViewport labelColor="white" axisHeadScale={1}/>
            </GizmoHelper>


            <OrthographicCamera
                ref={cameraRef}
                far={10000}
                near={0}
                makeDefault={true}
            />

            <OrbitControls enableDamping={false} makeDefault/>
        </group>
    )
}

// 包装组件
function Scene(props: ModelConfig) {
    // const dragging = useSelector(state => state.model.dragging)
    // const panning = useSelector(state => state.model.panning)
    // const dispatch = useDispatch()
    // const {dragStop, dragStart, panStop, panStart} = modelSlice.actions

    return (
        <ContextMenuWrapper>
            <ModelConfigContext.Provider value={{...props}}>
                <Canvas
                    gl={{
                        antialias: true,
                        // logarithmicDepthBuffer属性的作用是将深度缓冲区从线性缓冲区转换为对数缓冲区
                        logarithmicDepthBuffer: true
                    }}>
                    <SceneContent/>
                </Canvas>
            </ModelConfigContext.Provider>
        </ContextMenuWrapper>
    )

}

export default Scene

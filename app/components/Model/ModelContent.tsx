import {modelSlice, SceneNodeType, SceneTree, useDispatch, useSelector} from '@/lib/redux'
import React, {useEffect} from 'react'
import * as THREE from 'three'
import {dissocPath, has, keys} from 'ramda'
import Group from '@/app/components/Model/Group'
import {MeshProps} from '@react-three/fiber'
import Mesh from '@/app/components/Model/Mesh'
import {Html} from '@react-three/drei'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'

export interface ModelProps {
    // 开启模型预览模式（无交互，不分层）
    preview?: boolean
    gltf: GLTF
}

  // 改变相机视锥体范围，仅适用于正交相机, 直接修改对象，因为相机对象无法做到可控（相机对象中的所有属性都被control控制，无法跟状态同步）
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
            position: [0, 0, cameraHeight] as [x: number, y: number, z: number],
        }
    }

// 适用于透视投影相机的位置控制
    const changeCameraPosition = (gltf: GLTF) => {
        const box = new THREE.Box3().setFromObject(gltf.scene)

        const size = box.getSize(new THREE.Vector3())

        const center = box.getCenter(new THREE.Vector3())

        const distance = size.length() / Math.sqrt(2)

        const fov_r = 50 * (Math.PI / 180)

        const cameraZ = distance / Math.tan(fov_r / 2)

        // camera.position.set(0, 0, cameraZ)
        //
        // camera.lookAt(center)
    }

function ModelContent(props: ModelProps) {

    const {preview, gltf} = props

    const dispatch = useDispatch()

    const canRender = useSelector(state => !!state.model.sceneTree?.tree)

    useEffect(() => {
        const cameraProps = getCameraProps(gltf)
        dispatch(modelSlice.actions.updateCameraState(cameraProps))
        getSceneTree(gltf)
    }, [gltf])

    const sceneProps: THREE.Group = dissocPath(['children'], gltf.scene)

    const hasChildren = (obj: any) => has('children', obj)

    /**
     * 为mesh添加内部面字段,该方法会改变传入的treeMap
     * @param treeMap
     */
    const mutateAddInternalSurfaceFieldsForMesh = (treeMap: SceneTree['treeMap']) => {
        keys(treeMap)
            .filter(key => treeMap[key].isMesh)
            // .sort((a, b) => {
            //     const objAName = treeMap[a].name.replace('solid','').split('_').map(v => +v)
            //     const objBName = treeMap[b].name.replace('solid','').split('_').map(v => +v)
            //     return objAName[0] > objBName[0] ?
            // })
            .forEach((key, index) => {
                treeMap[key]['internalSurfaceName'] = 'surface' + (index + 1)
                treeMap[key]['internalSurfaceId'] = index + 1
            })
    }

    const getSceneTree = (gltf: GLTF) => {
        const {scene} = gltf
        console.log('源数据：', gltf)
        // 场景树索引表
        const treeMap = {}
        /**
         * 递归遍历生成场景树
         * @param node
         * @param sceneTreeMap -- 不需要map可以不传
         * @param __sceneTree -- 内部变量不传
         */
        const toSceneTree = (node: SceneNodeType, sceneTreeMap: SceneTree['treeMap'] = {}, __sceneTree: SceneTree['tree'] = {}) => {
            const base = {
                id: node.uuid,
                name: node.name,
                selected: false,
                hovered: false,
                visible: true,
                position: node.position.toArray(),
                protoPosition: node.position.toArray()
            }
            if (node.isGroup && hasChildren(node)) {
                __sceneTree[node.uuid] = {
                    ...base,
                    isGroup: node.isGroup,
                    parentId: node?.parent ? node?.parent?.uuid : null,
                    children: node.children.reduce((previousValue, currentValue) => {
                        return Object.assign(previousValue, toSceneTree(currentValue as SceneNodeType, treeMap))
                    }, {})
                }
                // 副作用： 更新场景树索引表
                sceneTreeMap[node.uuid] = __sceneTree[node.uuid]
            }
            if (node?.isMesh) {
                __sceneTree[node.uuid] = {
                    ...base,
                    parentId: node?.parent ? node?.parent?.uuid : null,
                    isMesh: node.isMesh,
                }
                // 副作用： 更新场景树索引表
                sceneTreeMap[node.uuid] = __sceneTree[node.uuid]
            }
            return __sceneTree
        }

        // 场景树
        const sceneTree = toSceneTree(scene as SceneNodeType, treeMap)

        // 为每个面新增自定义命名

        mutateAddInternalSurfaceFieldsForMesh(treeMap)

        dispatch(modelSlice.actions.updateNodeMap({tree: sceneTree, treeMap: treeMap}))
    }

    // 获取渲染树
    const getRenderTree = (obj: THREE.Group & THREE.Mesh) => {
        if (obj?.isGroup && hasChildren(obj)) {

            const typedObj = obj as THREE.Group

            return <Group {...typedObj} key={typedObj.uuid}>
                {typedObj?.children?.map(v => getRenderTree(v as THREE.Mesh & THREE.Group))}
            </Group>
        }
        if (obj?.isMesh) {

            const typedObj: MeshProps = dissocPath(['children'], obj)

            return <Mesh {...typedObj} key={typedObj.uuid}/>
        }
    }

    const box = new THREE.Box3().setFromObject(gltf.scene)
    // // 获取边界框的尺寸
    const size = box.getSize(new THREE.Vector3())
    // // 获取边界框的最大尺寸
    const maxDimension = Math.max(size.x, size.y, size.z)

    const center = box.getCenter(new THREE.Vector3())

    return (
        <>
            {
                canRender && <Group
                    {...sceneProps}
                    // position={box.getCenter(new THREE.Vector3()).negate()}
                >
                    {gltf.scene.children.map(v => getRenderTree(v as THREE.Mesh & THREE.Group))}
                </Group>
            }
        </>
    )
}

export default ModelContent

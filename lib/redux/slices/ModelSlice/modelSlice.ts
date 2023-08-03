import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import * as THREE from 'three'
import {isEmpty, isNil} from 'ramda'


export interface SceneTreeNode {
    id: string
    name: string
    selected: boolean
    hovered: boolean
    visible: boolean
    parentId: string | null
    position: [x: number, y: number, z: number] // 原始坐标,不建议修改
    protoPosition: [x: number, y: number, z: number] // 坐标状态
    children?: Record<string, SceneTreeNode>
    isGroup?: boolean
    isMesh?: boolean
    internalSurfaceName?: string
    internalSurfaceId?: number | string
}

export type SceneTree = {
    tree: Record<string | number, SceneTreeNode>,
    treeMap: Record<string | number, SceneTreeNode>
}

export type SceneNodeType = THREE.Group & THREE.Mesh

export type SelectMode = 'surface' | 'solid'

export type CameraState = {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    position?: [x: number, y: number, z: number],
    zoom?: number
}

export interface ModelState {
    sceneTree: SceneTree | null,
    selectMode: SelectMode,
    cameraState: CameraState
    dragging: boolean
    panning: boolean
}

const initialState: ModelState = {
    sceneTree: null,
    selectMode: 'surface',
    cameraState: {},
    dragging: false,
    panning: false
}

export const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        initialize: (state) => {
            state.sceneTree = null
            state.selectMode = 'surface'
        },
        updateNodeMap: (state, action: PayloadAction<SceneTree>) => {
            state.sceneTree = action.payload
        },
        changeSelectMode: (state, action: PayloadAction<SelectMode>) => {
            state.selectMode = action.payload
        },
        hoverOn: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].hovered = true
        },
        hoverOff: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].hovered = false
        },
        select: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].selected = true
        },
        unselect: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].selected = false
        },
        selectGroup: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }

            const group = state.sceneTree.treeMap[action.payload]
            group.selected = true

            if (isEmpty(group.children) || isNil(group.children)) return

            Object.keys(group.children).forEach((key) => {
                if (isNil(group.children)) return
                group.children[key].selected = true
            })
        },
        unselectGroup: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }

            const group = state.sceneTree.treeMap[action.payload]
            group.selected = false

            if (isEmpty(group.children) || isNil(group.children)) return

            // 设置所有的下级节点都为未选中
            Object.keys(group.children).forEach((key) => {
                if (isNil(group.children)) return
                group.children[key].selected = false
            })

        },
        show: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].visible = true
        },
        hide: (state, action: PayloadAction<keyof SceneTree['treeMap']>) => {
            if (!state.sceneTree) {
                return console.error('状态树未初始化')
            }
            state.sceneTree.treeMap[action.payload].visible = false
        },
        updateCameraState: (state, action: PayloadAction<CameraState>) => {
            state.cameraState = action.payload
        },
        dragStart: state => {
            state.dragging = true
        },
        dragStop: state => {
            state.dragging = false
        },
        panStart: state => {
            state.panning = true
        },
        panStop: state => {
            state.panning = false
        }

    },
})




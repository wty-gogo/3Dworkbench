import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ContextMenuType} from '@/app/components/ContextMenu/MenuConfigs/type'
import {ReactNode} from 'react'
import {assocPath, dissocPath} from 'ramda'

// 右键菜单的定位
export type ContextMenuPosition = {
    x: number, y: number
}

// 右键菜单的上下文对象
export type ContextMenuContext = {
    type: ContextMenuType,
    object: any
} | null

export interface ExtraMenuItem {
    title: string,
    type: string
    fieldName: string
}

export type ExtraConfig = Record<string, Record<string, ExtraMenuItem>>

export interface ContextMenuState {
    open: boolean
    position: ContextMenuPosition
    context: ContextMenuContext
    extraConfig: ExtraConfig
}

export interface OpenContextMenuPayload {
    position: ContextMenuPosition,
    context: ContextMenuContext
}

export interface RegisterExtraPayload {
    type: string
    title: string
    fieldName: string
}

export interface UnregisterExtraPayload {
    type: string
    fieldName: string
}

const initialState: ContextMenuState = {
    open: false,
    position: {
        x: 0,
        y: 0
    },
    context: null,
    extraConfig: {}
}

export const contextMenuSlice = createSlice({
    initialState: initialState,
    name: 'contextMenu',
    reducers: {
        openContextMenu: (state, action: PayloadAction<OpenContextMenuPayload>) => {
            state.open = true
            state.context = action.payload.context
            state.position = action.payload.position
        },
        closeContextMenu: (state) => {
            // 保留extraConfig
            return {...initialState, extraConfig: state.extraConfig}
        },
        // 注册额外的右键菜单
        registerToExtra: (state, action: PayloadAction<RegisterExtraPayload>) => {
            const {type, fieldName, title} = action.payload
            state.extraConfig = assocPath([type, fieldName], {type, fieldName, title}, state.extraConfig)
        },
        // 取消注册额外的右键菜单
        unregisterExtra: (state, action: PayloadAction<UnregisterExtraPayload>) => {
            const {type, fieldName} = action.payload
            state.extraConfig = dissocPath([type, fieldName], state.extraConfig)
        }
    }
})

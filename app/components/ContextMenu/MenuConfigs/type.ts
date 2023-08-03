import {ReactNode} from "react";

export enum ContextMenuType {
    BASE = 'BASE',
    MESH = 'MESH'
}

export type ContextMenuConfigItem = {
    key: string | number,
    title?: ReactNode | string,
    onClick?: () => void,
    isExtra?: boolean,
    render?: () => ReactNode,
}

export type ContextMenuConfig = ContextMenuConfigItem[]


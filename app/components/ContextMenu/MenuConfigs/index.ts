import {ContextMenuConfig, ContextMenuType} from "@/app/components/ContextMenu/MenuConfigs/type";
import {MeshMenuConfig} from '@/app/components/ContextMenu/MenuConfigs/MeshMenu'

export const MenuConfig: Record<keyof typeof ContextMenuType, ContextMenuConfig> = {
    BASE: [],
    MESH: MeshMenuConfig,
}

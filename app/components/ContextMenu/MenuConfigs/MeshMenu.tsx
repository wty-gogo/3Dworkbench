import {ContextMenuConfig, ContextMenuType} from '@/app/components/ContextMenu/MenuConfigs/type'
import SurfaceSelectorExtra from '@/app/components/ContextMenu/Extra/SurfaceSelectorExtra'

export const MeshMenuConfig: ContextMenuConfig = [
    // {
    //     key: 1,
    //     title: '设置为受力面',
    //     onClick: () => {
    //     }
    // },
    {
        key: 'MeshMenuConfigExtra',
        isExtra: true,
        render: () => <SurfaceSelectorExtra key={123}/>
    }
]


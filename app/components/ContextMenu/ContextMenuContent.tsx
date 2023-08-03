import React from 'react'
import {selectContextMenuContext, useSelector} from '@/lib/redux'
import {MenuConfig} from '@/app/components/ContextMenu/MenuConfigs'
import ContextMenuItem from '@/app/components/ContextMenu/ContextMenuItem'

function ContextMenuContent() {
    const context = useSelector(selectContextMenuContext)
    if (!context?.type) {
        return <></>
    }
    const menuConfig = MenuConfig[context?.type]

    return (
        <div className={'w-full p-1 text-white'}>
            {
                menuConfig.map((v, i) => {
                    if (v.isExtra) return <React.Fragment key={v.key || i}>{v.render?.()}</React.Fragment>
                    return <ContextMenuItem key={v.key || i} title={v.title} onClick={v.onClick}/>
                })
            }
        </div>
    )
}

export default ContextMenuContent

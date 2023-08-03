import React from 'react'
import {contextMenuSlice, useDispatch, useSelector} from '@/lib/redux'

const ContextMenuWrapper = (props: React.PropsWithChildren) => {
    const dispatch = useDispatch()
    const fullScreenClassName = 'w-full h-full p-0 m-0'
    const contextMenuOpen = useSelector(state => state.contextMenu.open)
    return (
        <div className={fullScreenClassName}
             onClickCapture={() => contextMenuOpen && dispatch(contextMenuSlice.actions.closeContextMenu())}>
            {props.children}
        </div>
    )
}

export default ContextMenuWrapper

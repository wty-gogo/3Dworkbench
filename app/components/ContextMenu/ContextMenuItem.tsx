import React, {ReactNode} from 'react';

interface ContextMenuItemProps {
    title?: ReactNode | string
    onClick?: () => void
}

function ContextMenuItem(props: ContextMenuItemProps) {
    const {
        title = '',
        onClick
    } = props
    return (
        <div
            className={'w-full h-8 p-1 hover:bg-neutral-600 cursor-pointer'}
            onClickCapture={(e) => {
                e.stopPropagation()
                onClick?.()
            }}>
            {title}
        </div>
    );
}

export default ContextMenuItem;

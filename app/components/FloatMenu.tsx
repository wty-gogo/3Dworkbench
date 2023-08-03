import React, {PropsWithChildren} from 'react'

interface FloatMenuProps extends PropsWithChildren {
    side?: 'left' | 'right'
    className?: string
}

function FloatMenu(props: FloatMenuProps) {
    const {side = 'left', className = ''} = props
    const containerClassName = [`absolute w-44 h-[98%] top-[1%] z-20 bg-neutral-800 rounded ring-1 ring-neutral-600 text-neutral-300 overflow-auto`,
        side === 'left' ? 'left-[1%]' : 'right-[1%]',
        className
    ]
        .join(' ')
    return (
        <div
            className={containerClassName}>
            {props.children}
        </div>
    )
}

export default FloatMenu

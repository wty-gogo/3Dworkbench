/* Components */
import {Providers} from '@/lib/providers'

/* Instruments */
import React from 'react'
import './global.css'
import ContextMenu from '@/app/components/ContextMenu/ContextMenu'

export default function RootLayout(props: React.PropsWithChildren) {
    const fullScreenClassName = 'w-full h-full p-0 m-0'
    return (
        <Providers>
            <html lang="en" className={fullScreenClassName}>
            <body className={fullScreenClassName}>
            {props.children}
            <ContextMenu/>
            </body>
            </html>
        </Providers>
    )
}

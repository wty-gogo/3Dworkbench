'use client'

/* Core */
import {Provider as ReduxProvider} from 'react-redux'

/* Instruments */
//

import {reduxStore} from '@/lib/redux'
import {AntdProvider} from './antd/provider'
import React from 'react'

export const Providers = (props: React.PropsWithChildren) => {
    return <ReduxProvider store={reduxStore}>
        <AntdProvider>
            {props.children}
        </AntdProvider>
    </ReduxProvider>
}

import React, {ReactNode} from 'react'
import FloatMenu from '@/app/components/FloatMenu'
import JsonForm from '@/lib/JsonForm/JsonForm'
import LoadModelFile from '@/app/components/LoadModelFile'
import {Space} from 'antd'

const Loading = () => {
    return <div>loading</div>
}

interface RightSiderProps {
    header?: ReactNode
}

const getJson = async () => {
    const port = process.env.PORT || 3000
    const res = await fetch(`http://127.0.0.1:${port}/api/localtest/json`, {
        cache: 'no-store'
    })
    return res.json()
}

async function RightSider() {
    const json = await getJson()
    return <FloatMenu side={'right'} className={'w-80 overflow-y-auto overflow-x-hidden p-2'}>
        <Space direction={'vertical'}>
            <LoadModelFile/>
            <JsonForm json={json}/>
        </Space>
    </FloatMenu>
}

export default RightSider

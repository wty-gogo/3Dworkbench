'use client'
import React, {useContext} from 'react'
import {useSearchParams} from 'next/navigation'
import {FileContext} from '@/app/components/FileContextWrapper'
import {message, Tooltip} from 'antd'
import {isNil} from 'ramda'

function LoadModelFile() {
    const searchParams = useSearchParams()
    const {addArrayBuffer, addFile} = useContext(FileContext)

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0]
        if (isNil(file)) return message.error('未选择文件')
        if (file) {
            addFile?.('modelFile', file)
        }
    }

    return (
        <Tooltip title={'暂时仅支持glb文件'}>
            <input type={'file'} onChange={handleOnChange}/>
        </Tooltip>
    )
}

export default LoadModelFile

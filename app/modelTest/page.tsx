'use client'
import Scene from '@/app/components/Model/Scene'
import React, {useState} from 'react'
import {ModelFileContext} from '@/app/components/Model/context/ModelFileContext'


function IndexPage() {
    const [file, setFile] = useState<File | null>(null)

    return (
        <ModelFileContext.Provider value={{file: file, setFile: setFile}}>
            <div className="h-full w-full relative bg-neutral-700">
                <input className={'absolute top-0 left-1/2 z-10'} type={'file'}
                       onChange={e => {
                           setFile(e.target.files?.[0] as File)
                       }}
                />
                <Scene mode={'gltf_preview'}/>
            </div>
        </ModelFileContext.Provider>
    )
}

export default IndexPage


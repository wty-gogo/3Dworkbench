'use client'
import React, {useContext, useEffect, useState} from 'react'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {useDispatch} from '@/lib/redux'
import {modelSlice} from 'lib/redux/slices/ModelSlice'
import ModelContent from '@/app/components/Model/ModelContent'
import {ModelConfig, ModelConfigContext} from '@/app/components/Model/context/ModelConfigContext'
import ModelForPreview from '@/app/components/Model/ModelForPreview'
import {FileContext} from '@/app/components/FileContextWrapper'

function Model() {
    const [gltf, setGltf] = useState<GLTF>()
    const {arrayBuffers, files, indexes} = useContext(FileContext)
    const {modelArrayBuffer} = arrayBuffers
    const {modelFile} = files
    const {mode} = useContext(ModelConfigContext)
    const dispatch = useDispatch()

    useEffect(() => {
        const loader = new GLTFLoader()
        if (modelArrayBuffer) {
            loader.parse(modelArrayBuffer, '/', (gltf) => {
                if (!gltf) return
                setGltf(gltf)
            })
            return
        }
        if (modelFile) {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(modelFile)
            fileReader.onload = (e) => {
                if (e.target?.result) {
                    loader.parse(e.target.result, '/', (gltf) => {
                        if (!gltf) return
                        setGltf(gltf)
                    })
                }

            }
            return
        }
        return () => {
            setGltf(undefined)
            dispatch(modelSlice.actions.initialize())
        }
    }, [indexes.arrayBuffers, indexes.files])

    const getModelContent = (mode: ModelConfig['mode'], gltf: GLTF) => {
        if (!gltf) return <></>
        switch (mode) {
            case 'gltf':
                return <ModelContent gltf={gltf}/>
            case 'gltf_preview':
                return <ModelForPreview gltf={gltf}/>
            default:
                return <ModelContent gltf={gltf}/>
        }
    }

    return <>
        {
            gltf && getModelContent(mode, gltf)
        }
    </>
}

export default Model

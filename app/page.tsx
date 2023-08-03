import React from 'react'
import LeftSider from '@/app/components/LeftSider'
import RightSider from '@/app/components/RightSider'
import Scene from '@/app/components/Model/Scene'
import FileContextWrapper from '@/app/components/FileContextWrapper'

function IndexPage() {
    return (
        <div className="h-full w-full relative bg-neutral-700">
            <FileContextWrapper>
                <LeftSider/>
                <RightSider/>
                <Scene/>
            </FileContextWrapper>
        </div>
    )
}


// 这样设计会导致首页不能作为server side 用context共享文件形式更好
/*function IndexPage() {
    const [file, setFile] = useState<File | null>(null)
    const searchParams = useSearchParams()
    const jobId = searchParams.get('jobId')
    const workshopId = searchParams.get('workshopId')
    const credential = searchParams.get('credential')

    const fetchToken = async (jobId: any, workshopId: any, credential: any) => {
        const response = await fetch(`/api/v1/job/${jobId}/token?workshopId=${workshopId}`, {
            method: 'get',
            // @ts-ignore
            headers: {
                'X-Kaiwu-Credential-Token': credential
            }
        })
        const {token} = await response.json()
        return token
    }

    const fetchFile = async (jobId: any, workshopId: any, credential: any, token: any) => {
        const response = await fetch(`/api/v1/job/${jobId}/file?workshopId=${workshopId}&path=mesh_only.glb&offset=0&length=0&token=${token}`, {
            method: 'get',
            // @ts-ignore
            headers: {
                'X-Kaiwu-Credential-Token': credential
            }
        })
        return await response.arrayBuffer()
    }

    return (
        <ModelFileContext.Provider value={{file: file, setFile: setFile}}>
            <div className="h-full w-full relative bg-neutral-700">
                <ContextMenuWrapper>
                    <input className={'absolute top-0 left-1/2 z-10'} type={'file'}
                           onChange={e => {
                               setFile(e.target.files?.[0] as File)
                           }}
                    />
                    <Scene/>
                    <LeftSider/>
                    <RightSider/>
                </ContextMenuWrapper>
            </div>
        </ModelFileContext.Provider>
    )
}*/

export default IndexPage



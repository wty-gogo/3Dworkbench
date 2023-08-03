'use client'
import React, {useState} from 'react'
import {Divider, Empty, Tree, TreeNodeProps} from 'antd'
import {useDispatch, useSelector} from '@/lib/redux'
import {modelSlice, SceneTree, SceneTreeNode} from 'lib/redux/slices/ModelSlice'
import {has, isEmpty, keys, not, values} from 'ramda'
import {classNames} from '@/lib/utils'
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons'
import {selectedHoveredObj, selectSelectedObj, selectTree, selectTreeMap} from '@/lib/redux/slices/ModelSlice/selectors'
import Link from 'next/link'

interface VisibleIconProps {
    id: string | number
}

const VisibleIcon = (props: VisibleIconProps) => {
    const {id} = props
    const [hover, setHover] = useState<boolean>(false)
    const dispatch = useDispatch()
    const visible = useSelector(state => state.model.sceneTree?.treeMap[props.id]?.visible ?? false)
    return <span
        className={classNames('text-sm', 'cursor-pointer', hover ? 'text-blue-500' : 'text-gray-500')}
        onClick={(event) => {
            event.stopPropagation()
            if (visible) {
                dispatch(modelSlice.actions.hide(id))
            } else {
                dispatch(modelSlice.actions.show(id))
            }
        }}
        onMouseEnter={(event) => {
            event.stopPropagation()
            setHover(true)
        }}
        onMouseLeave={(event) => {
            event.stopPropagation()
            setHover(false)
        }}
    >
        {visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
    </span>
}

function Controller() {

    const {select, unselect,} = modelSlice.actions
    const dispatch = useDispatch()
    const tree = useSelector(selectTree)
    const treeMap = useSelector(selectTreeMap)
    const selectedKeys = useSelector(selectSelectedObj)
    const hoveredKeys = useSelector(selectedHoveredObj)

    const toTreeData = (tree: SceneTree): TreeNodeProps[] => {
        const transformNode = (treeNode: SceneTreeNode): TreeNodeProps => {
            const hasChildren = has('children', treeNode)
            const node = {
                key: treeNode.id,
                icon: () => treeNode.isGroup && <VisibleIcon id={treeNode.id}/>,
                title: treeNode.internalSurfaceName || treeNode.name || 'Unnamed',
            }
            if (hasChildren) {
                return {
                    ...node,
                    children: values(treeNode?.children ?? {}).map(v => transformNode(v))
                } as TreeNodeProps
            }
            return node as TreeNodeProps
        }
        const root = keys(tree).map(v => treeMap[v]).find(v => v.parentId === null)

        if (!root) {
            return []
        }

        return [transformNode(root)]
    }

    return (
        <div>
            <div className={'text-center'}>
                <Link href={'/modelTest'}>去模型预览页</Link>
            </div>
            <Divider className={'my-2'}/>
            {
                not(isEmpty(tree)) ?
                    <>
                        <Tree
                            showIcon
                            multiple
                            height={800}
                            selectedKeys={selectedKeys.map(v => v.id)}
                            onSelect={(_, e) => {
                                if (e.node.selected) {
                                    dispatch(unselect(e.node.key))
                                }
                                if (!e.node.selected) {
                                    dispatch(select(e.node.key))
                                }
                            }}
                            // @ts-ignore
                            treeData={toTreeData(tree)}
                        />
                        <Divider className={'my-2'}/>
                        <div className={'overflow-auto'}>
                            <div className={''}>
                                当前hovered：{hoveredKeys[0]?.internalSurfaceName ?? ''}
                            </div>
                            <div>
                                当前已选中：{
                                selectedKeys.map(v =>
                                    <div
                                        className={'hover:bg-neutral-700 cursor-pointer'}
                                        key={v.id}
                                        onClick={() => {
                                            dispatch(unselect(v.id))
                                        }}
                                    >
                                        {v.internalSurfaceName}
                                    </div>)
                            }
                            </div>
                        </div>
                    </>
                    :
                    <Empty description={'暂无模型数据'}/>
            }
        </div>
    )
}

export default Controller

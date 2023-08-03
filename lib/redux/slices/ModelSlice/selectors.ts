import {createSelector} from "@reduxjs/toolkit";
import {ReduxState} from "@/lib/redux";
import {keys} from "ramda";

const _selectTree = (state: ReduxState) => state.model.sceneTree?.tree
const _selectTreeMap = (state: ReduxState) => state.model.sceneTree?.treeMap

export const selectTree = createSelector([_selectTree], (tree) => {
    return Object.assign({}, tree)
})

export const selectTreeMap = createSelector([_selectTreeMap], (treeMap) => {
    return Object.assign({}, treeMap)
})

export const selectSelectedObj = createSelector([selectTree, selectTreeMap], (tree, treeMap) => {
    if (!treeMap) {
        return []
    }
    return keys(treeMap).filter(v => treeMap[v].selected).map(v => treeMap[v])
})

export const selectedHoveredObj = createSelector([selectTree, selectTreeMap], (tree, treeMap) => {
    if (!treeMap) {
        return []
    }
    return keys(treeMap).filter(v => treeMap[v].hovered).map(v => treeMap[v])
})

export const selectNodeById = (id: string | number) => createSelector([selectTreeMap], (treeMap) => {
    return treeMap[id]
})

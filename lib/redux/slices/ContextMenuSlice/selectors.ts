import {ReduxState} from "@/lib/redux";

export const selectContextMenuOpen = (state: ReduxState) => {
    return state.contextMenu.open
}

export const selectContextMenuPosition = (state: ReduxState) => {
    return state.contextMenu.position
}

export const selectContextMenuContext = (state: ReduxState) => {
    return state.contextMenu.context
}

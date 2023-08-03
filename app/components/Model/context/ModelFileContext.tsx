import {createContext} from "react";

export const ModelFileContext = createContext<{
    file: null | File,
    setFile: (file: File) => void
}>({
    file: null,
    setFile: (file: File) => {
    }
})

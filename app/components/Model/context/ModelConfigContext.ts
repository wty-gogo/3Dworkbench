import React from "react";

export interface ModelConfig {
    mode?: 'gltf' | 'gltf_preview'
}

export const ModelConfigContext = React.createContext<ModelConfig>({
    mode: 'gltf'
});

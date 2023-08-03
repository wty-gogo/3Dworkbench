import {ConfigProvider,theme} from "antd";
import {PropsWithChildren} from "react";

export const AntdProvider = (props: PropsWithChildren) => (<ConfigProvider
        theme={{
            token: {
                borderRadius: 2,
                colorPrimary: '#4e4e4e'
            },
            algorithm: theme.darkAlgorithm
        }}
    >
        {props.children}
    </ConfigProvider>
)

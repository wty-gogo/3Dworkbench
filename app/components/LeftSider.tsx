import React from 'react'
import FloatMenu from "@/app/components/FloatMenu";
import Controller from "@/app/components/Model/Controller";

function LeftSider() {
    return (
        <FloatMenu side={'left'} className={'p-2'}>
            <Controller/>
        </FloatMenu>
    )
}

export default LeftSider

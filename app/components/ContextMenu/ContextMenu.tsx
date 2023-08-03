'use client'
import React, {useEffect, useRef} from 'react';
import {selectContextMenuOpen, selectContextMenuPosition, useSelector} from "@/lib/redux";
import ContextMenuContent from "@/app/components/ContextMenu/ContextMenuContent";
import {useSize} from "ahooks";

function ContextMenu() {
    const open = useSelector(selectContextMenuOpen)
    const {x, y} = useSelector(selectContextMenuPosition)

    const divRef = useRef<HTMLDivElement>(null)

    const size = useSize(divRef)

    const divHeight = size?.height || 0
    const divWidth = size?.width || 0

    if (typeof document === 'undefined') {
        return <></>
    }

    const isOverflowX = (x + divWidth) > document.body.offsetWidth
    const isOverflowY = (y + divHeight) > document.body.offsetHeight

    const calculatedPosition = {
        x: isOverflowX ? x - divWidth : x,
        y: isOverflowY ? y - divHeight : y
    }

    useEffect(() => {
        console.log('ContextMenu.tsx: useEffect: open: ', open)
    }, [open])

    return (
        <>
            {
                open ?
                    <div
                        onContextMenu={(e) => {
                            e.preventDefault()
                        }}
                        className={'fixed z-[10000] w-32 bg-neutral-900'}
                        style={{
                            left: calculatedPosition.x,
                            top: calculatedPosition.y,
                        }}
                        ref={divRef}
                    >
                        <ContextMenuContent/>
                    </div>
                    :
                    <></>
            }
        </>
    );
}

export default ContextMenu;

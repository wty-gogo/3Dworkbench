import {join} from "ramda";

export const classNames = (...args: string[]) => {
    return join(' ', args)
}

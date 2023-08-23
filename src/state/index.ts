import { atom } from "recoil";

export const fileState = atom({
    key: 'fileState',
    default: [] as File[]
})
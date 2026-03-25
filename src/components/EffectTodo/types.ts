import { ComponentType } from 'react'

export interface ChapterDef {
    number: number
    title: string
    subtitle: string
    tag: string
    component: ComponentType
}

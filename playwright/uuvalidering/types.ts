import { Result } from 'axe-core'

export interface IgnoreRule {
    selector: string
    rules: string[]
}

export interface ColorInfo {
    r: number
    g: number
    b: number
    a?: number
}

export interface ValidationOptions {
    browserName: string
    disableRules?: string[]
    ignoreRules?: IgnoreRule[]
}

export interface ViolationContext {
    violations: Result[]
    url: string
}

export interface ScreenshotData {
    violationId: string
    nodeIndex: number
    highlighted: Buffer
    element: Buffer
}

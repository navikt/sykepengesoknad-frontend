import { ReactNode } from 'react'

import { cn } from '../../../utils/tw-utils'

export function jaNeiStorStyle(value: string, watch: any, error: boolean, mt = false) {
    return cn(
        'focus-within:shadow-focus mb-2 block w-full [&>label]:rounded-sm [&>label]:border-2 [&>label]:border-border-default [&>label]:px-4 [&>label]:py-4 text-text-default hover:[&>label]:bg-surface-action-subtle-hover md:mb-0 md:w-1/2 rounded-sm focus:outline-hidden focus:ring-3 focus:ring-blue-800 focus:ring-opacity-50',
        {
            '[&>label]:bg-surface-action-subtle [&>label]:border-border-selected': watch === value,
            'mt-4': mt,
            '[&>label]:border-b-border-danger [&>label]:border-border-danger text-text-danger': error,
        },
    )
}

export function JaNeiStyle({ children }: { children: ReactNode[] | ReactNode }) {
    return (
        <div
            key="ja-nei-stor-style"
            style={
                {
                    '--a-shadow-focus': '0 0 0 0',
                } as React.CSSProperties
            }
        >
            {children}
        </div>
    )
}

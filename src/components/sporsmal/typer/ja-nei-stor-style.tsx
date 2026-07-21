import { ReactNode } from 'react'

import { cn } from '../../../utils/tw-utils'

export function jaNeiStorStyle(value: string, watch: any, error: boolean, mt = false) {
    return cn(
        'focus-within:outline focus-within:outline-[3px] focus-within:outline-ax-border-focus focus-within:outline-offset-[3px] mb-2 block w-full [&>label]:rounded-sm [&>label]:border-2 [&>label]:border-ax-border-neutral [&>label]:px-4 [&>label]:py-4 text-ax-text-neutral hover:[&>label]:bg-ax-bg-accent-moderate-hover ax-md:mb-0 ax-md:w-1/2 rounded-sm focus:outline-hidden focus:ring-3 focus:ring-ax-accent-900 focus:ring-opacity-50',
        {
            '[&>label]:bg-ax-bg-accent-soft [&>label]:border-ax-border-accent': watch === value,
            'mt-4': mt,
            '[&>label]:border-b-ax-border-danger [&>label]:border-ax-border-danger text-ax-text-danger-subtle': error,
        },
    )
}

export function JaNeiStyle({ children }: { children: ReactNode[] | ReactNode }) {
    return <div key="ja-nei-stor-style">{children}</div>
}

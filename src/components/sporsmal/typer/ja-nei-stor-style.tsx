import { ReactNode } from 'react'

import { cn } from '../../../utils/tw-utils'

export function jaNeiStorStyle(value: string, watch: any, error: boolean, mt = false) {
    return cn(
        '[&:focus-within::after]:hidden focus-within:outline focus-within:outline-[3px] focus-within:outline-ax-border-focus focus-within:outline-offset-[3px] relative mb-2 grid w-full grid-cols-[auto_1fr] items-center rounded-sm border-2 border-ax-border-neutral px-4 py-4 text-ax-text-neutral hover:bg-ax-bg-accent-moderate-hover ax-md:mb-0 ax-md:w-1/2 [&>label]:absolute [&>label]:inset-0 [&>label]:flex [&>label]:cursor-pointer [&>label]:items-center [&>label]:rounded-sm [&>label]:pl-12 [&>label]:pr-4',
        {
            'bg-ax-bg-accent-soft border-ax-border-accent': watch === value,
            'mt-4': mt,
            'border-ax-border-danger text-ax-text-danger-subtle': error,
        },
    )
}

export function JaNeiStyle({ children }: { children: ReactNode[] | ReactNode }) {
    return <div key="ja-nei-stor-style">{children}</div>
}

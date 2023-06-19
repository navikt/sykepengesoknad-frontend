import React, { cloneElement, ReactElement } from 'react'

import { Begrepsforklarer, BegrepsforklarerProps } from './begrepsforklarer'

interface BegrepsforklarerReplacerProps {
    text: string
    replacements: BegrepsforklarerProps[]
}

export const BegrepsforklarerReplacer: React.FC<BegrepsforklarerReplacerProps> = ({ text, replacements }) => {
    // Lag en lookup map for effektivitet
    const replacementsMap = new Map<string, ReactElement>()
    replacements.forEach((replacement) => replacementsMap.set(replacement.inlinetekst, Begrepsforklarer(replacement)))

    const pattern = new RegExp(replacements.map(({ inlinetekst }) => `(${inlinetekst})`).join('|'), 'g')

    const nodes = text.split(pattern).map((fragment, index) => {
        return replacementsMap.has(fragment) ? cloneElement(replacementsMap.get(fragment)!, { key: index }) : fragment
    })

    return <>{nodes}</>
}

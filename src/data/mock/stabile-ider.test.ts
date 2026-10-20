import { expect, test } from 'vitest'

import { testpersoner } from './testperson'

const alleIder = (): string[] => {
    const ider: string[] = []
    const samle = (verdi: unknown): void => {
        if (Array.isArray(verdi)) verdi.forEach(samle)
        else if (verdi && typeof verdi === 'object') {
            Object.entries(verdi).forEach(([nokkel, barn]) => {
                if (nokkel === 'id' && typeof barn === 'string') ider.push(barn)
                samle(barn)
            })
        }
    }
    samle(testpersoner())
    return ider
}

test('demo-dataene har faste id-er som ikke endres mellom kall', () => {
    expect(alleIder()).toEqual(alleIder())
})

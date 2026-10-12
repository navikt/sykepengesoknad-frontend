import { describe, expect, it } from 'vitest'

import {
    erLandIEuEos,
    erLandIEuEosEllerStorbritannia,
    erStorbritanniaLand,
    harAlleLandIEuEosEllerStorbritannia,
} from './land-utils'

describe('land-utils', () => {
    it('gjenkjenner Storbritannia-land', () => {
        expect(erStorbritanniaLand('Storbritannia')).toBe(true)
        expect(erStorbritanniaLand('Skottland')).toBe(true)
        expect(erStorbritanniaLand('Danmark')).toBe(false)
    })

    it('gjenkjenner EU/EØS-land', () => {
        expect(erLandIEuEos('Danmark')).toBe(true)
        expect(erLandIEuEos('Sverige')).toBe(true)
        expect(erLandIEuEos('England')).toBe(false)
    })

    it('gjenkjenner EU/EØS eller Storbritannia', () => {
        expect(erLandIEuEosEllerStorbritannia('Danmark')).toBe(true)
        expect(erLandIEuEosEllerStorbritannia('England')).toBe(true)
        expect(erLandIEuEosEllerStorbritannia('USA')).toBe(false)
    })

    it('sjekker om alle land er innenfor EU/EØS eller Storbritannia', () => {
        expect(harAlleLandIEuEosEllerStorbritannia(['Danmark', 'Sverige'])).toBe(true)
        expect(harAlleLandIEuEosEllerStorbritannia(['England', 'Danmark'])).toBe(true)
        expect(harAlleLandIEuEosEllerStorbritannia(['Danmark', 'USA'])).toBe(false)
    })
})

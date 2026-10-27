import { describe, expect, it } from 'vitest'

import {
    erLandIEuEos,
    erLandIEuEosEllerStorbritannia,
    erStorbritanniaLand,
    harAlleLandIEuEosEllerStorbritannia,
} from './land-utils'
import { landlisteUtenforEøsMedlemskap } from './landliste'

describe('landlisteUtenforEøsMedlemskap', () => {
    it.each(['Storbritannia', 'Færøyene', 'Grønland', 'Åland', 'Gibraltar', 'USA'])('inneholder %s', (land) => {
        expect(landlisteUtenforEøsMedlemskap).toContain(land)
    })

    it.each(['Danmark', 'Sveits', 'Réunion', 'Mayotte'])('inneholder ikke %s', (land) => {
        expect(landlisteUtenforEøsMedlemskap).not.toContain(land)
    })
})

describe('land-utils', () => {
    it('gjenkjenner Storbritannia-land', () => {
        expect(erStorbritanniaLand('Storbritannia')).toBe(true)
        expect(erStorbritanniaLand('Skottland')).toBe(true)
        expect(erStorbritanniaLand('Danmark')).toBe(false)
    })

    it('gjenkjenner EU/EØS-land', () => {
        expect(erLandIEuEos('Danmark')).toBe(true)
        expect(erLandIEuEos('Sverige')).toBe(true)
        expect(erLandIEuEos('USA')).toBe(false)
    })

    it.each(['Mayotte', 'Réunion', 'Saint-Martin (Fransk del)', 'Færøyene', 'Grønland', 'Åland', 'Sveits'])(
        'behandler %s som innenfor EU/EØS',
        (land) => {
            expect(erLandIEuEos(land)).toBe(true)
        },
    )

    it.each(['Gibraltar', 'Jersey', 'Man', 'Saint-Barthélemy', 'Bouvetøya', 'Nord-Kypros'])(
        'behandler %s som utenfor EU/EØS',
        (land) => {
            expect(erLandIEuEos(land)).toBe(false)
        },
    )

    it.each(['England', 'Nord-Irland', 'Skottland', 'Storbritannia', 'Wales'])(
        'behandler %s som innenfor EU/EØS',
        (land) => {
            expect(erLandIEuEos(land)).toBe(true)
        },
    )

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

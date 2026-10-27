import { describe, expect, it } from 'vitest'

import { hentAlertTekst } from './combobox-multiple'

describe('hentAlertTekst', () => {
    const britiskeLand = ['England', 'Nord-Irland', 'Skottland', 'Storbritannia', 'Wales']

    it('returnerer EØS-teksten for Danmark og Sverige', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['Danmark', 'Sverige'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Du har valgt land innenfor EU/EØS og trenger derfor ikke å søke.')
    })

    it.each(britiskeLand)('returnerer Storbritannia-teksten for bare %s', (land) => {
        expect(
            hentAlertTekst({
                valgtLand: [land],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til Storbritannia trenger du ikke å søke.')
    })

    it('returnerer Storbritannia-teksten for alle fem britiske land', () => {
        expect(
            hentAlertTekst({
                valgtLand: britiskeLand,
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til Storbritannia trenger du ikke å søke.')
    })

    it.each(britiskeLand)('returnerer Storbritannia + EØS-teksten for %s sammen med Danmark', (land) => {
        expect(
            hentAlertTekst({
                valgtLand: [land, 'Danmark'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til EU-/EØS-land og Storbritannia trenger du ikke å søke.')
    })

    it('returnerer Storbritannia + EØS-teksten for alle fem britiske land sammen med Danmark', () => {
        expect(
            hentAlertTekst({
                valgtLand: [...britiskeLand, 'Danmark'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til EU-/EØS-land og Storbritannia trenger du ikke å søke.')
    })

    it.each([
        { valgtLand: ['USA'] },
        { valgtLand: ['Danmark', 'USA'] },
        { valgtLand: [...britiskeLand, 'USA'] },
        { valgtLand: [...britiskeLand, 'Danmark', 'USA'] },
    ])('returnerer ingen tekst når $valgtLand inneholder land utenfor EU/EØS og Storbritannia', ({ valgtLand }) => {
        expect(
            hentAlertTekst({
                valgtLand,
                utlandskSykmeldingTrygd: false,
            }),
        ).toBeUndefined()
    })

    it('returnerer ingen tekst når ingen land er valgt', () => {
        expect(
            hentAlertTekst({
                valgtLand: [],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBeUndefined()
    })

    it.each([
        { valgtLand: ['Danmark', 'Sverige'] },
        { valgtLand: britiskeLand },
        { valgtLand: [...britiskeLand, 'Danmark'] },
    ])('returnerer ingen tekst for $valgtLand når utlandskSykmeldingTrygd er true', ({ valgtLand }) => {
        expect(
            hentAlertTekst({
                valgtLand,
                utlandskSykmeldingTrygd: true,
            }),
        ).toBeUndefined()
    })
})

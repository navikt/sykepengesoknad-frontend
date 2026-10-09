import { describe, expect, it } from 'vitest'

import { hentAlertTekst } from './combobox-multiple'

describe('hentAlertTekst', () => {
    it('returnerer EØS-teksten for Danmark og Sverige', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['Danmark', 'Sverige'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Du har valgt land innenfor EU/EØS og trenger derfor ikke å søke.')
    })

    it('returnerer Storbritannia-teksten for bare Storbritannia', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['England'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til Storbritannia trenger du ikke å søke.')
    })

    it('returnerer Storbritannia + EØS-teksten for blanding', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['England', 'Danmark'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBe('Ved reiser til Storbritannia og EU/EØS-land trenger du ikke å søke.')
    })

    it('returnerer ingen tekst for land utenfor EU/EØS og Storbritannia', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['USA'],
                utlandskSykmeldingTrygd: false,
            }),
        ).toBeUndefined()
    })

    it('returnerer ingen tekst når utlandskSykmeldingTrygd er true', () => {
        expect(
            hentAlertTekst({
                valgtLand: ['Danmark', 'Sverige'],
                utlandskSykmeldingTrygd: true,
            }),
        ).toBeUndefined()
    })
})

import { describe, expect, it } from 'vitest'

import { arbeidsgiverUtland } from './arbeidsgiver-utland'
import { bilTilDaglig } from './bil-til-daglig'
import { brukteReisetilskuddet } from './brukte-reisetilskuddet'
import { kvitteringer } from './kvitteringer'
import { land } from './land'
import { offentligTransportBelop, offentligTransportTilDaglig } from './offentlig-transport'
import { periodeUtland } from './periodeutland'
import { reiseMedBil } from './reise-med-bil'
import { transportTilDaglig } from './transport-til-daglig'
import { tilbakeIArbeid } from './tilbake-i-arbeid'
import { typeTransport } from './type-transport'
import { utbetaling } from './utbetaling'

describe('Spørsmålsbyggere for reisetilskudd og opphold i utlandet', () => {
    it('lager spørsmål om bilreise med tekst og datogrenser for samme måned', () => {
        const sporsmal = reiseMedBil({ fom: '2020-04-01', tom: '2020-04-24' })

        expect(sporsmal.sporsmalstekst).toBe(
            'Reiste du med egen bil, leiebil eller kollega til jobben mellom 1. – 24. april 2020?',
        )
        expect(sporsmal.undersporsmal[0]).toMatchObject({
            min: '2020-04-01',
            max: '2020-04-24',
            sporsmalstekst: 'Hvilke dager reiste du med bil i perioden 1. – 24. april 2020?',
        })
    })

    it('lager spørsmål om kvitteringer med periode på tvers av måneder', () => {
        const sporsmal = kvitteringer({ fom: '2020-04-28', tom: '2020-05-03' })

        expect(sporsmal.sporsmalstekst).toBe(
            'Last opp kvitteringer for reiser til og fra jobben mellom 28. april – 3. mai 2020.',
        )
    })

    it('lager spørsmål om bilreise med periode på tvers av år', () => {
        const sporsmal = reiseMedBil({ fom: '2020-12-23', tom: '2021-01-07' })

        expect(sporsmal.sporsmalstekst).toBe(
            'Reiste du med egen bil, leiebil eller kollega til jobben mellom 23. desember 2020 – 7. januar 2021?',
        )
        expect(sporsmal.undersporsmal[0]).toMatchObject({ min: '2020-12-23', max: '2021-01-07' })
    })

    it('bevarer id-overstyringer og svar for reisetilskudd', () => {
        const svar = [{ id: 'svar-1', verdi: 'NEI' }]
        const sporsmal = utbetaling({ id: 'egen-id', svar })

        expect(sporsmal.id).toBe('egen-id')
        expect(sporsmal.svar).toBe(svar)
    })

    it('bevarer nestede svar for transportspørsmål', () => {
        const transportSvar = [{ verdi: 'JA' }]
        const belopSvar = [{ verdi: '1500' }]
        const sporsmal = transportTilDaglig({
            svar: transportSvar,
            typeTransportSporsmal: typeTransport({
                undersporsmal: [
                    offentligTransportTilDaglig({ belop: offentligTransportBelop({ svar: belopSvar }) }),
                    bilTilDaglig(),
                ],
            }),
        })

        expect(sporsmal.svar).toBe(transportSvar)
        expect(sporsmal.undersporsmal[0].undersporsmal[0].undersporsmal[0].svar).toBe(belopSvar)
    })

    it('lager opphold-utland-spørsmål med gitte datogrenser og svar', () => {
        const svar = [{ verdi: 'NOR' }]
        const sporsmal = periodeUtland({
            fom: '2020-03-03',
            tom: '2020-12-31',
            id: 'periode-id',
            svar,
        })

        expect(sporsmal).toMatchObject({
            id: 'periode-id',
            min: '2020-03-03',
            max: '2020-12-31',
            svar,
        })
    })

    it('lar varianter dekke eksisterende tekster og svartypene for opphold i utlandet', () => {
        expect(brukteReisetilskuddet().sporsmalstekst).toBe('Hadde du ekstra reiseutgifter mens du var sykmeldt?')
        expect(brukteReisetilskuddet({ tekstvariant: 'brukt-reisetilskuddet' }).sporsmalstekst).toBe(
            'Har du brukt reisetilskuddet mens du var sykmeldt?',
        )
        expect(land({ id: 'land-id', undertekst: null, svartype: 'LAND' })).toMatchObject({
            id: 'land-id',
            undertekst: null,
            svartype: 'LAND',
        })
        expect(arbeidsgiverUtland().undersporsmal[0].tag).toBe('FERIE')
        expect(bilTilDaglig({ kriterieForVisningAvUndersporsmal: 'CHECKED' }).kriterieForVisningAvUndersporsmal).toBe(
            'CHECKED',
        )
    })

    it('lager samme innhold som første reisetilskudd-forekomst med tankestrek', () => {
        expect(reiseMedBil({ fom: '2020-12-23', tom: '2021-01-07' })).toEqual({
            id: '1566444',
            tag: 'REISE_MED_BIL',
            sporsmalstekst:
                'Reiste du med egen bil, leiebil eller kollega til jobben mellom 23. desember 2020 – 7. januar 2021?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1566445',
                    tag: 'BIL_DATOER',
                    sporsmalstekst: 'Hvilke dager reiste du med bil i perioden 23. desember 2020 – 7. januar 2021?',
                    undertekst: null,
                    svartype: 'DATOER',
                    min: '2020-12-23',
                    max: '2021-01-07',
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '1566446',
                    tag: 'BIL_BOMPENGER',
                    sporsmalstekst: 'Hadde du utgifter til bompenger?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [],
                    undersporsmal: [
                        {
                            id: '1566447',
                            tag: 'BIL_BOMPENGER_BELOP',
                            sporsmalstekst: 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?',
                            undertekst: null,
                            svartype: 'BELOP',
                            min: '0',
                            max: null,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                    ],
                },
                {
                    id: '1566448',
                    tag: 'KM_HJEM_JOBB',
                    sporsmalstekst: 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?',
                    undertekst: null,
                    svartype: 'KILOMETER',
                    min: '0',
                    max: null,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        })
    })

    it('bevarer spesialtekst og id-er for tilbake i arbeid', () => {
        const sporsmal = tilbakeIArbeid({
            fom: '2020-04-01',
            tom: '2020-04-24',
            arbeidsgiver: 'SNILL TORPEDO',
            id: '1547216',
            tilbakeNarId: '1547217',
            sporsmalstekst: 'Var du tilbake i ditt vanlige arbeid uten ekstra reiseutgifter før 25. april?',
            tilbakeNarTekst: 'Når var du tilbake?',
        })

        expect(sporsmal).toMatchObject({
            id: '1547216',
            sporsmalstekst: 'Var du tilbake i ditt vanlige arbeid uten ekstra reiseutgifter før 25. april?',
        })
        expect(sporsmal.undersporsmal[0]).toMatchObject({
            id: '1547217',
            sporsmalstekst: 'Når var du tilbake?',
            min: '2020-04-01',
            max: '2020-04-24',
        })
    })

    it('lager arbeidsgivertreet med sykmeldingsgrad før ferie', () => {
        const sporsmal = arbeidsgiverUtland({ variant: 'sykmeldingsgrad-og-ferie' })

        expect(sporsmal.undersporsmal.map((barn) => barn.tag)).toEqual(['SYKMELDINGSGRAD', 'FERIE'])
    })
})

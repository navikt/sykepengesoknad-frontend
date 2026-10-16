import { describe, expect, test } from 'vitest'

import { andreInntektskilderV2 } from './andre-inntektskilder-v2'
import { andreInntektskilder } from './andre-inntektskilder'
import { arbeidUnderveis100Prosent } from './arbeid-underveis-100-prosent'
import { enkeltstaendeBehandlingsdager } from './enkeltstaende-behandlingsdager'
import { feriePermisjonUtland } from './ferie-permisjon-utland'
import { friskmeldt } from './friskmeldt'
import { fravarForSykmeldingen, fravarForSykmeldingenV2 } from './fravar-for-sykmeldingen'
import { permittertNaa, permittertPeriode } from './permittert'
import { tilbakeIArbeid } from './tilbake-i-arbeid'
import { tilSlutt } from './til-slutt'
import { utdanning } from './utdanning'

describe('Spørsmålsbyggere for arbeidsledig og selvstendige', () => {
    test('lager friskmeldt med periodegrenser, svar og overstyrt id', () => {
        const sporsmal = friskmeldt({ fom: '2020-04-01', tom: '2020-04-24', id: 'annen-id', svar: [{ verdi: 'JA' }] })

        expect(sporsmal).toMatchObject({
            id: 'annen-id',
            sporsmalstekst: 'Brukte du hele sykmeldingen fram til 24. april 2020?',
            svar: [{ verdi: 'JA' }],
        })
        expect(sporsmal.undersporsmal[0]).toMatchObject({ min: '2020-04-01', max: '2020-04-24' })
    })

    test('formaterer perioder i samme måned, på tvers av måneder og på tvers av år', () => {
        expect(enkeltstaendeBehandlingsdager({ fom: '2020-04-01', tom: '2020-04-24' }).sporsmalstekst).toContain(
            '1. - 24. april 2020',
        )
        expect(utdanning({ fom: '2020-04-28', tom: '2020-05-03' }).sporsmalstekst).toContain('28. april - 3. mai 2020')
        expect(feriePermisjonUtland({ fom: '2020-12-28', tom: '2021-01-03' }).sporsmalstekst).toContain(
            '28. desember 2020 - 3. januar 2021',
        )
    })

    test('lager behandlingsdager med indeksert tagg og oppgitte ukegjenstander', () => {
        const sporsmal = enkeltstaendeBehandlingsdager({
            fom: '2020-04-01',
            tom: '2020-04-24',
            index: 2,
            uker: [{ fom: '2020-04-20', tom: '2020-04-24' }],
        })

        expect(sporsmal.tag).toBe('ENKELTSTAENDE_BEHANDLINGSDAGER_2')
        expect(sporsmal.undersporsmal[0]).toMatchObject({
            tag: 'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE_0',
            min: '2020-04-20',
            max: '2020-04-24',
        })
    })

    test('lar inntektskilder styre barne-taggene og beholder svar', () => {
        const sporsmal = andreInntektskilder({
            fom: '2020-04-01',
            tom: '2020-04-24',
            svar: [{ verdi: 'NEI' }],
            kilder: [
                { tag: 'INNTEKTSKILDE_ANNET', id: 'annet-id' },
                { tag: 'INNTEKTSKILDE_ARBEIDSFORHOLD', id: 'arbeidsforhold-id', erDuSykmeldtId: 'sykmeldt-id' },
            ],
        })
        const kilder = sporsmal.undersporsmal[0].undersporsmal

        expect(sporsmal.svar).toEqual([{ verdi: 'NEI' }])
        expect(kilder.map((kilde) => kilde.tag)).toEqual(['INNTEKTSKILDE_ANNET', 'INNTEKTSKILDE_ARBEIDSFORHOLD'])
        expect(kilder[1].undersporsmal[0].tag).toBe('INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT')
    })

    test('gjenskaper første forekomst av fravær og permittering', () => {
        const fravar = fravarForSykmeldingen({
            fom: '2020-04-01',
            tom: '2020-04-24',
            narMin: '2019-10-01',
            narMax: '2020-03-31',
        })
        const permittert = permittertNaa({ sykmeldtFom: '2021-01-04', min: '2019-12-01', max: '2020-04-24' })

        expect(fravar.undersporsmal[0]).toMatchObject({ min: '2019-10-01', max: '2020-03-31' })
        expect(permittert).toMatchObject({
            sporsmalstekst: 'Var du permittert av arbeidsgiveren din da du ble sykmeldt 4. januar 2021?',
        })
        expect(permittertPeriode({ fom: '2020-10-22', tom: '2020-11-22' }).undersporsmal[0]).toMatchObject({
            min: '2020-10-22',
            max: '2020-11-22',
        })
        expect(fravarForSykmeldingenV2({ fom: '2020-04-01' }).undertekst).toBe(
            'Gjelder sammenhengende fravær gjennom alle fire ukene.',
        )
    })

    test('lager tilbake i arbeid for frilanser uten arbeidsgiver', () => {
        const sporsmal = tilbakeIArbeid({
            fom: '2020-04-01',
            tom: '2020-04-24',
            tekstvariant: 'frilanser',
        })

        expect(sporsmal.sporsmalstekst).toBe(
            'Var du tilbake i fullt arbeid som frilanser før sykmeldingsperioden utløp 24. april 2020?',
        )
    })

    test('lager arbeid underveis for selvstendig næringsdrivende uten arbeidsgiver', () => {
        const sporsmal = arbeidUnderveis100Prosent({
            fom: '2020-04-01',
            tom: '2020-04-24',
            tekstvariant: 'selvstendigNaeringsdrivende',
        })

        expect(sporsmal.sporsmalstekst).toBe(
            'I perioden 1. - 24. april 2020 var du 100% sykmeldt som selvstendig næringsdrivende. Jobbet du noe i denne perioden?',
        )
        expect(sporsmal.undersporsmal[0].undersporsmal[0].undersporsmal[0].sporsmalstekst).toBe(
            'Oppgi hvor mange prosent av din normale arbeidstid du jobbet i perioden 1. - 24. april 2020?',
        )
    })

    test('lager fiskers avsluttende oppsummeringstekst', () => {
        const sporsmal = tilSlutt({
            sporsmalstekst: 'Viktig å være klar over:',
        })

        expect(sporsmal).toMatchObject({
            sporsmalstekst: 'Viktig å være klar over:',
            svartype: 'OPPSUMMERING',
        })
    })

    test('lager femårsvarianten av andre inntektskilder med samme undertre', () => {
        const sporsmal = andreInntektskilderV2({ variant: 'fem-aar' })
        const selvstendig = sporsmal.undersporsmal[0].undersporsmal[1]

        expect(sporsmal.sporsmalstekst).toBe('Har du andre inntektskilder enn nevnt over?')
        expect(selvstendig.undersporsmal[0]).toMatchObject({
            tag: 'INNTEKTSKILDE_SELVSTENDIG_N_AR',
            sporsmalstekst: 'Har du vært næringsdrivende i mer enn 5 år?',
        })
    })

    test('lager fireårsvarianten av andre inntektskilder med overstyrt id', () => {
        const sporsmal = andreInntektskilderV2({
            id: 'aa6a8e85-07c2-30c3-99d0-2aad85124890',
            variant: 'fire-aar',
        })
        const selvstendig = sporsmal.undersporsmal[0].undersporsmal[1]

        expect(sporsmal.id).toBe('aa6a8e85-07c2-30c3-99d0-2aad85124890')
        expect(selvstendig.undersporsmal[0]).toMatchObject({
            tag: 'INNTEKTSKILDE_SELVSTENDIG_4_AR',
            sporsmalstekst: 'Har du vært næringsdrivende i mer enn 4 år?',
        })
    })
})

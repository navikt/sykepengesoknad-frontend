import { describe, expect, it } from 'vitest'

import { arbeidUnderveis100Prosent } from './arbeid-underveis-100-prosent'
import { egenmeldinger } from './egenmeldinger'
import { ferieV2 } from './ferie-v2'
import { jobbetDuGradert } from './jobbet-du-gradert'
import { oppholdUtenforEos } from './opphold-utenfor-eos'
import { permisjonV2 } from './permisjon-v2'
import { tilbakeIArbeid } from './tilbake-i-arbeid'
import { utland } from './utland'

describe('Spørsmålsbyggere for arbeidstaker', () => {
    it('lager spørsmål for samme måned med stabile datostrenger', () => {
        const sporsmal = tilbakeIArbeid({
            fom: '2020-04-01',
            tom: '2020-04-24',
            arbeidsgiver: 'Posten Norge AS, Bærum',
        })

        expect(sporsmal.sporsmalstekst).toBe(
            'Var du tilbake i fullt arbeid hos Posten Norge AS, Bærum i løpet av perioden 1. – 24. april 2020?',
        )
        expect(sporsmal.undersporsmal[0]).toMatchObject({
            id: '687342',
            min: '2020-04-01',
            max: '2020-04-24',
        })
    })

    it('lager spørsmål for perioder som går over måneder og år', () => {
        const ferie = ferieV2({ fom: '2020-04-01', tom: '2020-05-03' })
        const permisjon = permisjonV2({ fom: '2020-12-31', tom: '2021-01-02' })

        expect(ferie.sporsmalstekst).toBe('Tok du ut feriedager i tidsrommet 1. april – 3. mai 2020?')
        expect(permisjon.sporsmalstekst).toBe(
            'Tok du permisjon mens du var sykmeldt 31. desember 2020 – 2. januar 2021?',
        )
        expect(permisjon.undersporsmal[0]).toMatchObject({ min: '2020-12-31', max: '2021-01-02' })
    })

    it('bruker indeks, overstyrt id og svar på hele arbeidstreet', () => {
        const sporsmal = arbeidUnderveis100Prosent({
            fom: '2020-04-01',
            tom: '2020-04-24',
            arbeidsgiver: 'Posten Norge AS, Bærum',
            index: 2,
            id: 'tilpasset-id',
            svar: { hoved: [{ verdi: 'JA' }], timerVerdi: [{ verdi: '12' }] },
        })

        expect(sporsmal).toMatchObject({
            id: 'tilpasset-id',
            tag: 'ARBEID_UNDERVEIS_100_PROSENT_2',
            svar: [{ verdi: 'JA' }],
        })
        expect(sporsmal.undersporsmal[0].undersporsmal[1].undersporsmal[0]).toMatchObject({
            tag: 'HVOR_MYE_TIMER_VERDI_2',
            svar: [{ verdi: '12' }],
        })
    })

    it('videresender svar og periodegrenser uten tidssoneavhengighet', () => {
        const sporsmal = oppholdUtenforEos({
            fom: '2020-04-01',
            tom: '2020-04-24',
            svar: [{ verdi: 'NEI' }],
            oppholdNarSvar: [{ verdi: '2020-04-02/2020-04-03' }],
        })
        const egenmelding = egenmeldinger({
            fom: '2020-05-04',
            tom: '2020-05-19',
            sykmeldtDato: '2020-05-20',
            min: '2019-11-20',
            max: '2020-05-19',
        })

        expect(sporsmal.svar).toEqual([{ verdi: 'NEI' }])
        expect(sporsmal.undersporsmal[0]).toMatchObject({
            min: '2020-04-01',
            max: '2020-04-24',
            svar: [{ verdi: '2020-04-02/2020-04-03' }],
        })
        expect(egenmelding.undersporsmal[0].undersporsmal[0].undersporsmal[0]).toMatchObject({
            min: '2019-11-20',
            max: '2020-05-19',
        })
    })

    it('lager utland med søknad om sykepenger', () => {
        const sporsmal = utland({
            fom: '2020-04-01',
            tom: '2020-04-24',
            inkluderSoktSykepenger: true,
        })

        expect(sporsmal.undersporsmal.map((undersporsmal) => undersporsmal.tag)).toEqual([
            'PERIODER',
            'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
        ])
    })

    it('lager utlandstekst med EU og EØS', () => {
        const sporsmal = utland({
            fom: '2020-04-01',
            tom: '2020-04-24',
            tekstvariant: 'utenforEuEos',
        })

        expect(sporsmal.sporsmalstekst).toBe('Har du vært utenfor EU/EØS mens du var sykmeldt 1. – 24. april 2020?')
    })

    it('beholder avvikende tekster i arbeid underveis', () => {
        const sporsmal = arbeidUnderveis100Prosent({
            fom: '2021-08-12',
            tom: '2021-08-29',
            arbeidsgiver: 'Butikken',
            arbeidsgiverFormulering: 'uten',
            hovedtekstvariant: 'uten-arbeidsgiver-i-andre-setning',
            prosentVerdiTekstvariant: 'totalt-prosent',
            prosentUndertekst: 'Eksempel 40%',
            timerUndertekst: 'Eksempel 12 timer',
        })

        expect(sporsmal.sporsmalstekst).toBe(
            'I perioden 12. – 29. august 2021 var du 100 % sykmeldt fra Butikken. Jobbet du noe i denne perioden?',
        )
        expect(sporsmal.undersporsmal[0].undersporsmal[0].undersporsmal[0]).toMatchObject({
            sporsmalstekst: 'Oppgi totalt prosent du jobbet i perioden 12. – 29. august 2021 hos Butikken?',
            undertekst: 'Eksempel 40%',
        })
        expect(sporsmal.undersporsmal[0].undersporsmal[1].undersporsmal[0].undertekst).toBe('Eksempel 12 timer')
    })

    it('bruker backendtekst for gradert arbeid', () => {
        const sporsmal = jobbetDuGradert({
            fom: '2020-05-20',
            tom: '2020-06-05',
            arbeidsgiver: '995816598 sitt orgnavn :)',
            grad: 20,
        })

        expect(sporsmal.sporsmalstekst).toBe(
            'I perioden 20. mai – 5. juni 2020 sier sykmeldingen at du kunne jobbe 20 % i jobben din hos 995816598 sitt orgnavn :). Jobbet du mer enn det?',
        )
        expect(sporsmal.undersporsmal[1]).toMatchObject({
            sporsmalstekst: 'Hvor mye jobbet du tilsammen 20. mai – 5. juni 2020 ?',
            undertekst: 'Velg timer eller prosent',
        })
        expect(sporsmal.undersporsmal[1].undersporsmal.map((undersporsmal) => undersporsmal.sporsmalstekst)).toEqual([
            'Prosent',
            'Timer',
        ])
    })
})

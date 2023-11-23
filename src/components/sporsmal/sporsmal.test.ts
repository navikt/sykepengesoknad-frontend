import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { tekst } from '../../utils/tekster'
import { veldigLangSoknad } from '../../data/mock/data/soknad/veldig-land-soknad'
import { rsToSoknad } from '../../types/mapping'
import { testpersoner } from '../../data/mock/testperson'

import { hentGeneriskFeilmelding } from './sporsmal-utils'

test('Alle tags har global feilmelding', () => {
    let tags = kjenteTags
    let manglerFeilmelding = false

    tags = tags.filter((skipTag) => {
        return (
            skipTag !== 'VAER_KLAR_OVER_AT' && // Svartype: IKKE_RELEVANT
            skipTag !== 'TIL_SLUTT' && // Svartype: IKKE_RELEVANT
            skipTag !== 'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON' && // Svartype: IKKE_RELEVANT
            skipTag !== 'BEKREFT_OPPLYSNINGER_UTLAND_INFO' && // Svartype: IKKE_RELEVANT
            skipTag !== 'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING' && // Svartype: GRUPPE_AV_UNDERSPORSMAL
            skipTag !== 'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING' && // Svartype: GRUPPE_AV_UNDERSPORSMAL
            skipTag !== 'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING' && // Svartype: GRUPPE_AV_UNDERSPORSMAL
            skipTag !== 'ENKELTSTAENDE_BEHANDLINGSDAGER' &&
            skipTag !== 'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_JA' &&
            skipTag !== 'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_NEI' &&
            skipTag !== 'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_VET_IKKE'
        ) // Svartype: INFO_BEHANDLINGSDAGER
    })

    tags.forEach((tag) => {
        if (tekst(`soknad.feilmelding.${tag}` as any) === undefined) {
            // eslint-disable-next-line no-console
            console.log('Mangler feilmelding for tag:', tag)
            manglerFeilmelding = true
        }
    })

    expect(manglerFeilmelding).toBeFalsy()
})

test('Alle svartyper har generiskfeilmelding', () => {
    const svartyper = Object.values(RSSvartype)
    let manglerFeilmelding = false

    svartyper.forEach((svartype) => {
        if (hentGeneriskFeilmelding(svartype, { message: 'test' } as any) === undefined) {
            // eslint-disable-next-line no-console
            console.log('Mangler generisk feilmelding for svartype:', svartype)
            manglerFeilmelding = true
        }
    })

    expect(manglerFeilmelding).toBeFalsy()
})

test('Alle sporsmal tag ligger i veldigLangSoknad', () => {
    const soknad: Soknad = rsToSoknad(veldigLangSoknad)
    const sporsmalTagsUtenIndex = hentAlleTags(soknad.sporsmal)
    const tagsSomSkalStottes = kjenteTags.filter((skipTag) => {
        // TODO: Sjekk at disse tagene fortsatt er i bruk, legg de inn i søknaden
        return (
            skipTag !== 'BETALER_ARBEIDSGIVER' && // Kan fjernes?
            skipTag !== 'HVOR_MANGE_TIMER' && // Finnes i syfosoknad, men brukes ikke
            skipTag !== 'BEKREFT_OPPLYSNINGER_UTLAND' && // Kan bare inneholde en sisteside, dekkes av andre tester
            skipTag !== 'BEKREFT_OPPLYSNINGER_UTLAND_INFO' &&
            skipTag !== 'VAER_KLAR_OVER_AT'
        ) // Kan bare inneholde en sisteside
    })
    let manglerTagsISoknad = false

    // Mangler tags i soknaden
    tagsSomSkalStottes.forEach((tag) => {
        if (!sporsmalTagsUtenIndex.has(tag)) {
            // eslint-disable-next-line no-console
            console.log(`Mangler sporsmal tag i veldigLangSoknad [ ${tag} ]`)
            manglerTagsISoknad = true
        }
    })
    expect(manglerTagsISoknad).toBeFalsy()
})

test('Alle sporsmal tag fra testdata ligger i kjenteTags', () => {
    let manglerTagsIKoden = false

    const testdataTags = new Set<string>()
    const personer = testpersoner()
    for (const g in personer) {
        const persona = personer[g as keyof typeof personer]
        if (persona) {
            persona.soknader.forEach((soknad) => {
                const soknadtags = hentAlleTags(rsToSoknad(soknad).sporsmal)

                soknadtags.forEach((tag) => {
                    testdataTags.add(tag)
                })
            })
        }
    }

    // Mangler tags i koden
    const kjenteTagsSet = new Set(kjenteTags)
    testdataTags.forEach((tag) => {
        if (!kjenteTagsSet.has(tag)) {
            // eslint-disable-next-line no-console
            console.log(`Mangler sporsmal tag i kjenteTags [ ${tag} ]`)
            manglerTagsIKoden = true
        }
    })
    expect(manglerTagsIKoden).toBeFalsy()
})
const hentAlleTags = (sporsmal: ReadonlyArray<Sporsmal>): Set<string> => {
    const flatSoknad = flattenSporsmal(sporsmal)
    const tags = new Set<string>()
    flatSoknad.forEach((spm) => {
        tags.add(spm.tag)
    })
    return tags
}

const kjenteTags = [
    'ANDRE_INNTEKTSKILDER',
    'ANDRE_INNTEKTSKILDER_V2',
    'ANSVARSERKLARING',
    'ARBEID_UTENFOR_NORGE',
    'ARBEIDSGIVER',
    'ARBEIDSLEDIG_UTLAND',
    'BEKREFT_OPPLYSNINGER',
    'BEKREFT_OPPLYSNINGER_UTLAND',
    'BEKREFT_OPPLYSNINGER_UTLAND_INFO',
    'BETALER_ARBEIDSGIVER',
    'EGENMELDINGER',
    'EGENMELDINGER_NAR',
    'FRAVAR_FOR_SYKMELDINGEN',
    'FRAVAR_FOR_SYKMELDINGEN_NAR',
    'ENKELTSTAENDE_BEHANDLINGSDAGER',
    'ENKELTSTAENDE_BEHANDLINGSDAGER_UKE',
    'FERIE',
    'FERIE_NAR',
    'FERIE_NAR_V2',
    'FERIE_PERMISJON_UTLAND',
    'FERIE_PERMISJON_UTLAND_HVA',
    'FERIE_V2',
    'FRAVER_FOR_BEHANDLING',
    'FRISKMELDT',
    'FRISKMELDT_START',
    'FULLTIDSSTUDIUM',
    'HVILKE_ANDRE_INNTEKTSKILDER',
    'HVOR_MANGE_TIMER',
    'HVOR_MANGE_TIMER_PER_UKE',
    'HVOR_MYE_HAR_DU_JOBBET',
    'HVOR_MYE_PROSENT',
    'HVOR_MYE_PROSENT_VERDI',
    'HVOR_MYE_TIMER',
    'HVOR_MYE_TIMER_VERDI',
    'IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON',
    'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
    'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_JOBBET_I_DET_SISTE',
    'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_ANNET',
    'INNTEKTSKILDE_ARBEIDSFORHOLD',
    'INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_FOSTERHJEM',
    'INNTEKTSKILDE_FOSTERHJEM_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_FRILANSER',
    'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_FRILANSER_SELVSTENDIG',
    'INNTEKTSKILDE_FRILANSER_SELVSTENDIG_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_JORDBRUKER',
    'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_OMSORGSLONN',
    'INNTEKTSKILDE_OMSORGSLONN_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_SELVSTENDIG',
    'INNTEKTSKILDE_SELVSTENDIG_4_AR',
    'INNTEKTSKILDE_SELVSTENDIG_N_AR',
    'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE',
    'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_JA',
    'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_NEI',
    'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_VET_IKKE',
    'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
    'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
    'INNTEKTSKILDE_STYREVERV',
    'JOBBET_DU_100_PROSENT',
    'ARBEID_UNDERVEIS_100_PROSENT',
    'JOBBET_DU_GRADERT',
    'JOBBER_DU_NORMAL_ARBEIDSUKE',
    'LAND',
    'PAPIRSYKMELDING_NAR',
    'PERIODER',
    'PERIODEUTLAND',
    'PERMISJON',
    'PERMISJON_NAR',
    'PERMISJON_NAR_V2',
    'PERMISJON_V2',
    'PERMITTERT_NAA',
    'PERMITTERT_NAA_NAR',
    'PERMITTERT_PERIODE',
    'PERMITTERT_PERIODE_NAR',
    'SYKMELDINGSGRAD',
    'TIDLIGERE_EGENMELDING',
    'TIDLIGERE_PAPIRSYKMELDING',
    'TIDLIGERE_SYK',
    'TILBAKE_I_ARBEID',
    'TILBAKE_NAR',
    'UTDANNING',
    'UTDANNING_START',
    'UTLAND',
    'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
    'UTLAND_NAR',
    'UTLAND_NAR_V2',
    'UTLAND_V2',
    'VAER_KLAR_OVER_AT',
    'TIL_SLUTT',
    'BRUKTE_REISETILSKUDDET',
    'TRANSPORT_TIL_DAGLIG',
    'TYPE_TRANSPORT',
    'BIL_TIL_DAGLIG',
    'KM_HJEM_JOBB',
    'OFFENTLIG_TRANSPORT_TIL_DAGLIG',
    'OFFENTLIG_TRANSPORT_BELOP',
    'REISE_MED_BIL',
    'BIL_DATOER',
    'BIL_BOMPENGER',
    'BIL_BOMPENGER_BELOP',
    'KVITTERINGER',
    'UTBETALING',
    'UTENLANDSK_SYKMELDING_BOSTED',
    'UTENLANDSK_SYKMELDING_CO',
    'UTENLANDSK_SYKMELDING_VEGNAVN',
    'UTENLANDSK_SYKMELDING_BYGNING',
    'UTENLANDSK_SYKMELDING_BY',
    'UTENLANDSK_SYKMELDING_REGION',
    'UTENLANDSK_SYKMELDING_LAND',
    'UTENLANDSK_SYKMELDING_TELEFONNUMMER',
    'UTENLANDSK_SYKMELDING_GYLDIGHET_ADRESSE',
    'UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE',
    'UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST',
    'UTENLANDSK_SYKMELDING_TRYGD_UTENFOR_NORGE',
    'UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND',
    'YRKESSKADE',
    'YRKESSKADE_V2',
    'YRKESSKADE_V2_VELG_DATO',
    'YRKESSKADE_V2_DATO',
    'YRKESSKADE_SAMMENHENG',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_GRUPPE',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_VEDTAKSDATO',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_PERMANENT',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_PERMANENT_DATO',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_MIDLERTIDIG',
    'MEDLEMSKAP_OPPHOLDSTILLATELSE_MIDLERTIDIG_PERIODE',
    'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE',
    'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_GRUPPERING',
    'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_ARBEIDSGIVER',
    'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_HVOR',
    'MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE_NAAR',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_GRUPPERING',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_HVOR',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_STUDIE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_FERIE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_BO',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_EKTEFELLE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_ANNET',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_BEGRUNNELSE_ANNET_FRITEKST',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE_NAAR',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_GRUPPERING',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_HVOR',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_STUDIE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_FERIE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_BO',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_EKTEFELLE',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_ANNET',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_BEGRUNNELSE_ANNET_FRITEKST',
    'MEDLEMSKAP_OPPHOLD_UTENFOR_EOS_NAAR',
    'KJENTE_INNTEKTSKILDER',
    'KJENTE_INNTEKTSKILDER_GRUPPE',
    'KJENTE_INNTEKTSKILDER_GRUPPE_TITTEL',
    'KJENTE_INNTEKTSKILDER_JOBBER_FORTSATT',
    'KJENTE_INNTEKTSKILDER_JOBBER_FORTSATT_JA',
    'KJENTE_INNTEKTSKILDER_UTFORT_ARBEID',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET',
    'KJENTE_INNTEKTSKILDER_JOBBER_FORTSATT_NEI',
    'KJENTE_INNTEKTSKILDER_DATO_SLUTTET',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_SYKMELDT',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_TURNUS',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_FERIE',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_AVSPASERING',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_PERMITTERT',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_PERMISJON',
    'KJENTE_INNTEKTSKILDER_ARSAK_IKKE_JOBBET_ANNEN',
]

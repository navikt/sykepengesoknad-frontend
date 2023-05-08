import { TagTyper } from '../../types/enums'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { Soknad, Sporsmal } from '../../types/types'
import { flattenSporsmal } from '../../utils/soknad-utils'
import { tekst } from '../../utils/tekster'
import { veldigLangSoknad } from '../../data/mock/data/veldig-land-soknad'

import { fjernIndexFraTag, hentGeneriskFeilmelding } from './sporsmal-utils'

test('Alle tags har global feilmelding', () => {
    let tags = Object.values(TagTyper)
    let manglerFeilmelding = false

    tags = tags.filter((skipTag) => {
        // Spørsmål som har svartype IKKE_RELEVANT. Disse har ikke feilmelding.
        return (
            skipTag !== TagTyper.VAER_KLAR_OVER_AT &&
            skipTag !== TagTyper.IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON &&
            skipTag !== TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO &&
            skipTag !== TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER
        )
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
    const soknad: Soknad = new Soknad(veldigLangSoknad as any)
    const sporsmalTagsUtenIndex = hentAlleTagsUtenIndex(soknad.sporsmal)
    const tagsSomSkalStottes = Object.values(TagTyper).filter((skipTag) => {
        return (
            // VAER_KLAR_OVER_AT kan fortsatt returners fra backend, men filtrerers bort.
            skipTag !== 'VAER_KLAR_OVER_AT' &&
            skipTag !== 'BETALER_ARBEIDSGIVER' &&
            skipTag !== 'HVOR_MANGE_TIMER' &&
            skipTag !== 'BEKREFT_OPPLYSNINGER_UTLAND' &&
            skipTag !== 'BEKREFT_OPPLYSNINGER_UTLAND_INFO'
        )
    })
    let manglerTagsISoknad = false
    let manglerTagsIKoden = false

    // Mangler tags i soknaden
    tagsSomSkalStottes.forEach((tag) => {
        if (!sporsmalTagsUtenIndex.has(tag)) {
            // eslint-disable-next-line no-console
            console.log(`Mangler sporsmal tag i veldigLangSoknad [ ${tag} ]`)
            manglerTagsISoknad = true
        }
    })
    expect(manglerTagsISoknad).toBeFalsy()

    // Mangler tags i koden
    sporsmalTagsUtenIndex.forEach((tag: any) => {
        if (!tagsSomSkalStottes.includes(tag)) {
            // eslint-disable-next-line no-console
            console.log(`Mangler sporsmal tag i TagTyper [ ${tag} ]`)
            manglerTagsIKoden = true
        }
    })
    expect(manglerTagsIKoden).toBeFalsy()
})

const hentAlleTagsUtenIndex = (sporsmal: Sporsmal[]) => {
    const flatSoknad = flattenSporsmal(sporsmal)
    const tags = new Set()
    flatSoknad.forEach((spm) => {
        tags.add(fjernIndexFraTag(spm.tag))
    })
    return tags
}

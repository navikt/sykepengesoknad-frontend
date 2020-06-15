import { TagTyper } from '../../types/enums'
import { RSSvartype } from '../../types/rs-types/rs-svartype'
import { tekst } from '../../utils/tekster'
import { hentGeneriskFeilmelding } from './sporsmal-utils'

test('Alle tags har global feilmelding', () => {
    let tags = Object.values(TagTyper)
    let manglerFeilmelding = false

    tags = tags.filter(skipTag => {
        return skipTag !== TagTyper.VAER_KLAR_OVER_AT                       // Svartype: IKKE_RELEVANT
            && skipTag !== TagTyper.IKKE_SOKT_UTENLANDSOPPHOLD_INFORMASJON  // Svartype: IKKE_RELEVANT
            && skipTag !== TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO        // Svartype: IKKE_RELEVANT
            && skipTag !== TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER          // Svartype: INFO_BEHANDLINGSDAGER
            && skipTag !== TagTyper.ER_DU_SYKMELDT                          // Er ikke en egen tag, men legges til på andre tags
    })

    tags.forEach(tag => {
        if (tekst(`soknad.feilmelding.${tag}`) === undefined) {
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

    svartyper.forEach(svartype => {
        if(hentGeneriskFeilmelding(svartype) === undefined) {
            // eslint-disable-next-line no-console
            console.log('Mangler generisk feilmelding for svartype:', svartype)
            manglerFeilmelding = true
        }
    })

    expect(manglerFeilmelding).toBeFalsy()
})

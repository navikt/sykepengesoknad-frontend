import { logger } from '@navikt/next-logger'

import AvbrytSoknadModalTekster from '../components/avbryt-soknad-modal/avbryt-soknad-modal-tekster'
import AvsluttOgFortsettSenereTekster from '../components/avslutt-og-fortsett-senere/avslutt-og-fortsett-senere-tekster'
import BannerTekster from '../components/banner/banner-tekster'
import { EldreUsendtTekster } from '../components/eldre-usendt/eldre-usendt-tekster'
import { EndreknappTekster } from '../components/endreknapp/endreknapp-tekster'
import RefreshHvisFeilStateTekster from '../components/feil/refresh-hvis-feil-state-tekster'
import FilOpplasterTekster from '../components/filopplaster/fil-opplaster/fil-opplaster-tekster'
import FilListeTekster from '../components/filopplaster/fil-liste/fil-liste-tekster'
import OpplastingTekster from '../components/filopplaster/kvittering-modal/opplasting-tekster'
import FristSykepengerTekster from '../components/frist-sykepenger/frist-sykepenger-tekster'
import { GjenstaendeSoknaderTekster } from '../components/gjenstaende-soknader/gjenstaende-soknader-tekster'
import { KvitteringTekster } from '../components/kvittering/kvittering-tekster'
import OmReisetilskuddTekster from '../components/om-reisetilskudd/om-reisetilskudd-tekster'
import OmSykepengerTekster from '../components/om-sykepenger/om-sykepenger-tekster'
import OpplysningerTekster from '../components/opplysninger-fra-sykmelding/opplysninger-tekster'
import OpprettUtlandTekster from '../components/opprett-utland/opprett-utland-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import SoknadenTekster from '../components/soknad/soknaden-tekster'
import ListevisningTekster from '../components/listevisning/listevisning-tekster'
import TeaserTekster from '../components/listevisning/teaser-tekster'
import GuidepanelTekster from '../components/sporsmal/guidepanel/guidepanel-tekster'
import { EkspanderbarHjelpTekster } from '../components/hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp-tekst'
import { EndringUtenEndringTekster } from '../components/sporsmal/endring-uten-endring/endring-uten-endring-tekster'
import KnapperadTekster from '../components/sporsmal/sporsmal-form/knapperad-tekster'
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster'

const tekster = {
    ...OpplysningerTekster,
    ...KvitteringTekster,
    ...ListevisningTekster,
    ...BannerTekster,
    ...GuidepanelTekster,
    ...KnapperadTekster,
    ...SoknadenTekster,
    ...SporsmalTekster,
    ...TeaserTekster,
    ...AvbrytSoknadModalTekster,
    ...EndreknappTekster,
    ...EkspanderbarHjelpTekster,
    ...EndringUtenEndringTekster,
    ...OmSykepengerTekster,
    ...OppsummeringTekster,
    ...OpprettUtlandTekster,
    ...RefreshHvisFeilStateTekster,
    ...OmReisetilskuddTekster,
    ...FilListeTekster,
    ...FilOpplasterTekster,
    ...OpplastingTekster,
    ...EldreUsendtTekster,
    ...GjenstaendeSoknaderTekster,
    ...AvsluttOgFortsettSenereTekster,
    ...FristSykepengerTekster,
}

export const tekst = (tekst: keyof typeof tekster): string => {
    const verdi = tekster[tekst]
    if (verdi === undefined && !tekst.includes('soknad.feilmelding')) {
        logger.error(`Mangler teksten [ ${tekst} ].`)
        return undefined as any
    }
    return verdi
}

export const getLedetekst = (text: string, data: any): string => {
    if (text === undefined || data === undefined) {
        return ''
    }
    let newtext = text
    Object.keys(data).forEach((key) => {
        const regex = new RegExp(key, 'g')
        newtext = newtext.replace(regex, data[key])
    })
    return newtext
}

export function forsteBokstavStor(tekst: string): string {
    return tekst.charAt(0).toUpperCase() + tekst.slice(1).toLowerCase()
}

export function forsteBokstavLiten(tekst: string): string {
    return tekst.charAt(0).toLowerCase() + tekst.slice(1)
}

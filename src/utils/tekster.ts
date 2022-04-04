import AvbrytSoknadModalTekster from '../components/avbryt-soknad-modal/avbryt-soknad-modal-tekster'
import AvsluttOgFortsettSenereTekster from '../components/avslutt-og-fortsett-senere/avslutt-og-fortsett-senere-tekster'
import BannerTekster from '../components/banner/banner-tekster'
import EldreUsendtTekster from '../components/eldre-usendt-soknad/eldre-usendt-soknad-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilListeTekster from '../components/filopplaster/fil-liste/fil-liste-tekster'
import OpplastingTekster from '../components/filopplaster/kvittering-modal/opplasting-tekster'
import HvorforSoknadSykepengerTekster from '../components/hvorfor-soknad-sykepenger/hvorfor-soknad-sykepenger-tekster'
import KvitteringTekster from '../components/kvittering/kvittering-tekster'
import OmReisetilskuddTekster from '../components/om-reisetilskudd/om-reisetilskudd-tekster'
import OmSykepengerTekster from '../components/om-sykepenger/om-sykepenger-tekster'
import OpplysningerTekster from '../components/opplysninger-fra-sykmelding/opplysninger-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import PersonvernLesMerTekster from '../components/soknad-intro/personvern-les-mer-tekster'
import ViktigInformasjonTekster from '../components/soknad-intro/viktig-informasjon-tekster'
import SoknadMedToDelerTekster from '../components/soknad-med-to-deler/soknad-med-to-deler-tekster'
import TeaserTekster from '../components/soknader/teaser/teaser-tekster'
import BjornTekster from '../components/sporsmal/bjorn/bjorn-tekster'
import { EkspanderbarHjelpTekster } from '../components/sporsmal/ekspanderbar-hjelp/ekspanderbar-hjelp-tekst'
import { EndringUtenEndringTekster } from '../components/sporsmal/endring-uten-endring/endring-uten-endring-tekster'
import KnapperadTekster from '../components/sporsmal/sporsmal-form/knapperad-tekster'
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster'
import RefreshHvisFeilStateTekster from '../pages/feil/refresh-hvis-feil-state-tekster'
import OpprettUtlandTekster from '../pages/opprett-utland/opprett-utland-tekster'
import SoknadenTekster from '../pages/soknad/soknaden-tekster'
import SoknaderTekster from '../pages/soknader/soknader-tekster'
import { logger } from './logger'

const tekster = {
    ...OpplysningerTekster,
    ...KvitteringTekster,
    ...PersonvernLesMerTekster,
    ...SoknaderTekster,
    ...BannerTekster,
    ...BjornTekster,
    ...KnapperadTekster,
    ...SoknadenTekster,
    ...SporsmalTekster,
    ...TeaserTekster,
    ...AvbrytSoknadModalTekster,
    ...EkspanderbarHjelpTekster,
    ...EndringUtenEndringTekster,
    ...OmSykepengerTekster,
    ...OppsummeringTekster,
    ...OpprettUtlandTekster,
    ...RefreshHvisFeilStateTekster,
    ...OmReisetilskuddTekster,
    ...FilListeTekster,
    ...DragAndDropTekster,
    ...OpplastingTekster,
    ...EldreUsendtTekster,
    ...AvsluttOgFortsettSenereTekster,
    ...SoknadMedToDelerTekster,
    ...ViktigInformasjonTekster,
    ...HvorforSoknadSykepengerTekster,
}

export const tekst = (tekst: keyof typeof tekster): string => {
    const verdi = tekster[tekst]
    // Generiskfeilmelding har ingen tekst
    if (!verdi === undefined && !tekst.includes('soknad.feilmelding')) {
        // eslint-disable-next-line no-console
        console.log(`Mangler teksten [ ${tekst} ]`)
        logger.error(`Mangler teksten [ ${tekst} ]`)
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

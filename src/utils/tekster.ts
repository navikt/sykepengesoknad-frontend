import BannerTekster from '../components/banner/banner-tekster'
import EldreUsendtTekster from '../components/eldre-usendt-soknad/eldre-usendt-soknad-tekster'
import DragAndDropTekster from '../components/filopplaster/drag-and-drop/drag-and-drop-tekster'
import FilListeTekster from '../components/filopplaster/fil-liste/fil-liste-tekster'
import OpplastingTekster from '../components/filopplaster/kvittering-modal/opplasting-tekster'
import KvitteringTekster from '../components/kvittering/kvittering-tekster'
import OmReisetilskuddTekster from '../components/om-reisetilskudd/om-reisetilskudd-tekster'
import OmSykepengerTekster from '../components/om-sykepenger/om-sykepenger-tekster'
import OpplysningerTekster from '../components/opplysninger-fra-sykmelding/opplysninger-tekster'
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster'
import SoknadIntroTekster from '../components/soknad-intro/soknad-intro-tekster'
import { ViktigInformasjonTekster } from '../components/soknad-intro/viktig-informasjon-tekster'
import TeaserTekster from '../components/soknader/teaser/teaser-tekster'
import BjornTekster from '../components/sporsmal/bjorn/bjorn-tekster'
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
    ...SoknadIntroTekster,
    ...SoknaderTekster,
    ...BannerTekster,
    ...BjornTekster,
    ...KnapperadTekster,
    ...SoknadenTekster,
    ...SporsmalTekster,
    ...TeaserTekster,
    ...OmSykepengerTekster,
    ...OppsummeringTekster,
    ...OpprettUtlandTekster,
    ...RefreshHvisFeilStateTekster,
    ...OmReisetilskuddTekster,
    ...FilListeTekster,
    ...DragAndDropTekster,
    ...OpplastingTekster,
    ...EldreUsendtTekster,
    ...ViktigInformasjonTekster,
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

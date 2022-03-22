import './viktig-informasjon.less'

import { GuidePanel } from '@navikt/ds-react'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import VeilederSVG from './veileder'

export const ViktigInformasjon = () => {

    const { valgtSoknad } = useAppStore()

    if (!valgtSoknad) {
        return null
    }

    const merknadsTyperSomVarsles = [ 'UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER' ]

    if (valgtSoknad.merknaderFraSykmelding?.some(a => merknadsTyperSomVarsles.includes(a.type))) {

        return (
            <div className="viktig-informasjon">
                <GuidePanel poster illustration={VeilederSVG}>
                    <Element tag="h2">{tekst('viktig-informasjon.overskrift')}</Element>
                    <Normaltekst>{tekst('viktig-informasjon.avsnitt.1')}</Normaltekst>
                    <Normaltekst>{tekst('viktig-informasjon.avsnitt.2')}</Normaltekst>
                    <Element tag="h3">{tekst('viktig-informasjon.under-overskrift')}</Element>
                    <Normaltekst>{tekst('viktig-informasjon.avsnitt.3')}</Normaltekst>
                </GuidePanel>
            </div>

        )
    }
    return null
}

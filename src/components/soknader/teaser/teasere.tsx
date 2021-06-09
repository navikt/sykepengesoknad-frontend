import parser from 'html-react-parser'
import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Lenke from 'nav-frontend-lenker'
import { Select } from 'nav-frontend-skjema'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../../types/types'
import { sorterEtterNyesteTom, sorterEtterSendt, sorterEtterStatus } from '../../../utils/sorter-soknader'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import FremtidigeSoknaderTeaser from './fremtidige-soknader-teaser'
import Teaser from './teaser'
import TidligereSoknaderTeaser from './tidligere-soknader-teaser'
import UtgaattSoknaderTeaser from './utgatt-soknader-teaser'

interface SoknaderTeasereProps {
    soknader: Soknad[];
    className?: string;
    tittel: string;
    tomListeTekst?: string;
    id: string;
    kanSorteres?: boolean;
}

enum Sortering {
    Dato = 'Dato',
    Status = 'Status',
    Sendt = 'Sendt',
}

const Teasere = ({ soknader, className, tittel, tomListeTekst, id, kanSorteres = false }: SoknaderTeasereProps) => {
    const [ sortering, setSortering ] = useState<Sortering>(Sortering.Dato)

    const sorterteSoknader = () => {
        if (kanSorteres) {
            if (sortering === 'Dato') {
                return soknader.sort(sorterEtterNyesteTom)
            } else if (sortering === 'Status') {
                return soknader.sort(sorterEtterStatus)
            } else if (sortering === 'Sendt') {
                return soknader.sort(sorterEtterSendt)
            }
        }
        return soknader
    }

    return (
        <>
            <header className="teasere__header">
                <Ekspanderbartpanel tittel={
                    <Undertittel tag="h2">{tekst('om.sykepenger.tittel')}</Undertittel>
                } apen={false} className="om_sykepenger">
                    <Normaltekst>{tekst('om.sykepenger.tekst1')}</Normaltekst>
                    <Normaltekst>{tekst('om.sykepenger.tekst2')}</Normaltekst>
                    <Element tag="h3">{tekst('om.sykepenger.hvorfor')}</Element>
                    <Normaltekst>{tekst('om.sykepenger.tekst3')}</Normaltekst>

                    <Ekspanderbartpanel tittel={tekst('om.sykepenger.arbeidstakere.tittel')} apen={false}>
                        <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst1')}</Normaltekst>
                        <Normaltekst>{tekst('om.sykepenger.arbeidstakere.tekst2')}</Normaltekst>
                        <AlertStripeInfo>{tekst('om.sykepenger.arbeidstakere.alertstripe')}</AlertStripeInfo>
                    </Ekspanderbartpanel>

                    <Ekspanderbartpanel tittel={tekst('om.sykepenger.selvstendige.tittel')} apen={false}>
                        <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst1'))}</Normaltekst>
                        <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst2')}</Normaltekst>
                        <Normaltekst>{tekst('om.sykepenger.selvstendige.tekst3')}</Normaltekst>
                        <Element tag="h3">{tekst('om.sykepenger.selvstendige.husk')}</Element>
                        <Normaltekst>{parser(tekst('om.sykepenger.selvstendige.tekst4'))}</Normaltekst>
                        <AlertStripeInfo>{parser(tekst('om.sykepenger.selvstendige.alertstripe'))}</AlertStripeInfo>
                    </Ekspanderbartpanel>

                    <Element tag="h3">{tekst('om.sykepenger.tittel2')}</Element>
                    <Normaltekst>
                        <Lenke href={tekst('om.sykepenger.lenke1.url')}>
                            {tekst('om.sykepenger.lenke1')}
                        </Lenke>
                    </Normaltekst>
                    <Normaltekst>
                        <Lenke href={tekst('om.sykepenger.lenke2.url')}>
                            {tekst('om.sykepenger.lenke2')}
                        </Lenke>
                    </Normaltekst>

                </Ekspanderbartpanel>

                <Vis hvis={kanSorteres && sorterteSoknader().length > 0}
                    render={() =>
                        <Select label="Sorter etter"
                            className="inngangspanel__sortering"
                            onChange={(event) => setSortering(event.target.value as Sortering)}
                        >
                            {Object.values(Sortering).map((sort, idx) => {
                                return <option value={sort} key={idx}>{sort}</option>
                            })}
                        </Select>
                    }
                />

                <Vis hvis={sorterteSoknader().length > 0 || tomListeTekst}
                    render={() =>
                        <Undertittel tag="h2" className="teasere__header__tittel">
                            {tittel}
                        </Undertittel>
                    }
                />
            </header>

            <div id={id} className={className}>
                {sorterteSoknader().map((soknad, idx) => {
                    switch (soknad.status) {
                        case RSSoknadstatus.FREMTIDIG:
                            return <FremtidigeSoknaderTeaser key={idx} soknad={soknad} />
                        case RSSoknadstatus.SENDT:
                        case RSSoknadstatus.AVBRUTT:
                            return <TidligereSoknaderTeaser key={idx} soknad={soknad} />
                        case RSSoknadstatus.UTGAATT:
                            return <UtgaattSoknaderTeaser key={idx} soknad={soknad} />
                        default:
                            return <Teaser key={idx} soknad={soknad} />
                    }
                })}
                <Vis hvis={soknader.length === 0}
                    render={() =>
                        <Element className="inngangspanel inngangspanel--tomListe">
                            {tomListeTekst}
                        </Element>
                    }
                />
            </div>
        </>
    )
}

export default Teasere

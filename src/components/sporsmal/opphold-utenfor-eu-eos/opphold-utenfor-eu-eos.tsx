import { Accordion, BodyLong, ReadMore } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedIkon } from '../../lenke-med-ikon/LenkeMedIkon'
import { RSSoknadstypeType } from '../../../types/rs-types/rs-soknadstype'

import { SjekkLandEuEos } from './sjekk-land-eu-eos'

interface OppholdUtenforEUEOSProps {
    soknadstype: RSSoknadstypeType
}

export const OppholdUtenforEUEOS = ({ soknadstype }: OppholdUtenforEUEOSProps) => {
    const erSelvstendigNaringsdrivende = soknadstype === 'SELVSTENDIGE_OG_FRILANSERE'

    return (
        <>
            <BodyLong spacing>
                Reiste du til et land utenfor EU/EØS mens du var sykmeldt, må du søke om å beholde sykepengene.
            </BodyLong>
            {erSelvstendigNaringsdrivende ? (
                <ReadMore header="Var reisen en behandlingsreise i regi av Oslo Universitetssykehus?">
                    <BodyLong spacing>
                        Reiste du til utlandet i forbindelse med behandlingsreise i regi av Oslo Universitetssykehus
                        trenger du ikke søke om å beholde sykepengene på reise.
                    </BodyLong>
                    <BodyLong spacing>
                        For behandlingsreiser i privat regi eller gjennom andre organisasjoner, må du søke om å beholde
                        sykepengene utenfor EU/EØS.
                    </BodyLong>
                    <LenkeMedIkon
                        href="https://www.oslo-universitetssykehus.no/behandlingsreiser"
                        text="Les mer om behandlingsreise i regi av Oslo Universitetsykehus"
                    />
                </ReadMore>
            ) : (
                <Accordion className="my-8">
                    <Accordion.Item>
                        <Accordion.Header>Var reisen i forbindelse med ferie?</Accordion.Header>
                        <Accordion.Content>
                            Når du tar ut lovbestemt ferie, skal du ikke søke om å beholde sykepengene selv om du skal
                            reise utenfor EU/EØS. Da krysser du bare av for ferie i søknaden om sykepenger.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>
                            Var reisen en behandlingsreise i regi av Oslo Universitetssykehus?
                        </Accordion.Header>
                        <Accordion.Content>
                            <BodyLong spacing>
                                Reiste du til utlandet i forbindelse med behandlingsreise i regi av Oslo
                                Universitetssykehus trenger du ikke søke om å beholde sykepengene på reise.
                            </BodyLong>
                            <BodyLong spacing>
                                For behandlingsreiser i privat regi eller gjennom andre organisasjoner, må du søke om å
                                beholde sykepengene utenfor EU/EØS.
                            </BodyLong>
                            <LenkeMedIkon
                                href="https://www.oslo-universitetssykehus.no/behandlingsreiser"
                                text="Les mer om behandlingsreise i regi av Oslo Universitetsykehus"
                            />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            )}
            <SjekkLandEuEos />
        </>
    )
}

import { Accordion, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Utvidbar from '../utvidbar/utvidbar'
import EksempelFrist from './eksempel-frist'
import HvorforSoknadSykepenger from './hvorfor-soknad-sykepenger'

interface FristSykepengerProps {
    soknadstype: RSSoknadstype
}

const FristSykepenger = ({ soknadstype }: FristSykepengerProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    return (
        <Accordion>
            <Accordion.Item open={open} className="frist-sykepenger">
                <Accordion.Header
                    onClick={() => {
                        logEvent(
                            open ? 'accordion lukket' : 'accordion åpnet',
                            { component: tekst('frist-sykepenger.overskrift') }
                        )
                        setOpen(!open)
                    }}
                >
                    <Heading size="small" level="2">
                        {tekst('frist-sykepenger.overskrift')}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong>{tekst('frist-sykepenger.innsending')}</BodyLong>
                    <BodyLong>
                        {parser(tekst('frist-sykepenger.hovedregel'))}
                    </BodyLong>
                    <BodyLong>
                        {parser(tekst('frist-sykepenger.ulike.måneder'))}
                    </BodyLong>

                    <Utvidbar
                        erApen={false}
                        type="intern"
                        tittel="Vis eksempler"
                        amplitudeProps={{ component: 'Eksempel' }}
                    >
                        <Heading size="xsmall" level="3">
                            {tekst('frist-sykepenger.eksempel.en.tittel')}
                        </Heading>
                        <BodyShort>
                            {tekst('frist-sykepenger.eksempel.en.tekst')}
                        </BodyShort>
                        <EksempelFrist
                            normalTekst="Frist for sykedager i mai: "
                            boldTekst="31.august"
                            mndEn="Mai"
                            mndTo="Juni"
                            mndTre="Juli"
                            mndFire="August"
                        />

                        <Heading size="xsmall" level="3">
                            {tekst('frist-sykepenger.eksempel.to.tittel')}
                        </Heading>
                        <BodyShort>
                            {tekst('frist-sykepenger.eksempel.to.tekst')}
                        </BodyShort>
                        <EksempelFrist
                            normalTekst="Frist for sykedager i januar: "
                            boldTekst="30.april"
                            mndEn="Januar"
                            mndTo="Februar"
                            mndTre="Mars"
                            mndFire="April"
                        />
                        <EksempelFrist
                            normalTekst="Frist for sykedager i februar: "
                            boldTekst="31.mai"
                            mndEn="Februar"
                            mndTo="Mars"
                            mndTre="April"
                            mndFire="Mai"
                        />
                    </Utvidbar>

                    <BodyLong spacing>
                        {tekst('frist-sykepenger.husk')}
                    </BodyLong>

                    <HvorforSoknadSykepenger soknadstype={soknadstype} />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default FristSykepenger

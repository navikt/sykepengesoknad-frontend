import { Accordion, BodyLong, BodyShort, Heading, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { Soknad } from '../../types/types'
import { parserWithReplace } from '../../utils/html-react-parser-utils'

import EksempelFrist from './eksempel-frist'
import HvorforSoknadSykepenger from './hvorfor-soknad-sykepenger'

const FristSykepenger = ({ soknad }: { soknad: Soknad }) => {
    const [open, setOpen] = useState<boolean>(false)
    if (soknad.utenlandskSykmelding) {
        return null
    }
    return (
        <Accordion className={'mb-4 border border-gray-400'}>
            <Accordion.Item open={open} className="frist-sykepenger">
                <Accordion.Header
                    onClick={() => {
                        logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                            component: tekst('frist-sykepenger.overskrift'),
                        })
                        setOpen(!open)
                    }}
                >
                    <Heading size="small" level="2">
                        {tekst('frist-sykepenger.overskrift')}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong>{tekst('frist-sykepenger.innsending')}</BodyLong>
                    <BodyLong>{parserWithReplace(tekst('frist-sykepenger.hovedregel'))}</BodyLong>
                    <BodyLong>{parserWithReplace(tekst('frist-sykepenger.ulike.måneder'))}</BodyLong>

                    <ReadMore header={'Vis eksempler'}>
                        <Heading size="xsmall" level="3" className={'pt-4'}>
                            {tekst('frist-sykepenger.eksempel.en.tittel')}
                        </Heading>
                        <BodyShort>{tekst('frist-sykepenger.eksempel.en.tekst')}</BodyShort>
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
                        <BodyShort>{tekst('frist-sykepenger.eksempel.to.tekst')}</BodyShort>
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
                    </ReadMore>

                    <BodyLong spacing>{tekst('frist-sykepenger.husk')}</BodyLong>

                    <HvorforSoknadSykepenger soknadstype={soknad.soknadstype} />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default FristSykepenger

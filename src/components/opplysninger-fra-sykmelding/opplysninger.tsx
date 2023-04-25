import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, Heading } from '@navikt/ds-react'

import { tekst } from '../../utils/tekster'
import useSoknad from '../../hooks/useSoknad'
import useSykmelding from '../../hooks/useSykmelding'
import { logEvent } from '../amplitude/amplitude'
import { RouteParams } from '../../app'

import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'
import Egenmeldingsdager from './sykmelding-egenmeldingsdager'
import SykmeldingOppdelt from './sykmelding-oppdelt'
import SykmeldingOverlapp from './sykmelding-overlapp'

interface OpplysningerProps {
    ekspandert: boolean
    steg: string
}

const Opplysninger = ({ ekspandert, steg }: OpplysningerProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)
    const [open, setOpen] = useState<boolean>(ekspandert)

    const tittel = tekst('sykepengesoknad.sykmelding-utdrag.tittel')

    if (!valgtSoknad || !valgtSykmelding) return null

    return (
        <Accordion className={'my-4 border border-gray-400'} data-cy="opplysninger-fra-sykmeldingen">
            <Accordion.Item open={open}>
                <Accordion.Header
                    className={'md:pl-8'}
                    onClick={() => {
                        logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                            component: tittel,
                            steg: steg,
                        })
                        setOpen(!open)
                    }}
                >
                    <Heading size="small" level="2">
                        {tittel}
                    </Heading>
                </Accordion.Header>

                <Accordion.Content className={'md:pl-8'}>
                    <SykmeldingPerioder valgtSykmelding={valgtSykmelding} />
                    <SykmeldingOppdelt valgtSykmelding={valgtSykmelding} valgtSoknad={valgtSoknad} />
                    <SykmeldingOverlapp valgtSoknad={valgtSoknad} />
                    <ArbeidsgiverInfo valgtSoknad={valgtSoknad} />
                    <SykmeldingDato valgtSykmelding={valgtSykmelding} />
                    <ArbeidssituasjonInfo valgtSykmelding={valgtSykmelding} />
                    <FravaersperioderInfo valgtSykmelding={valgtSykmelding} />
                    <ForsikringInfo valgtSykmelding={valgtSykmelding} />
                    <Egenmeldingsdager valgtSykmelding={valgtSykmelding} />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Opplysninger

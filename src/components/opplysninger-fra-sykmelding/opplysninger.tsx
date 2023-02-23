import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, Heading } from '@navikt/ds-react'

import { tekst } from '../../utils/tekster'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'
import useSykmelding from '../../hooks/useSykmelding'
import { logEvent } from '../amplitude/amplitude'

import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'
import styles from './opplysninger.module.css'

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
        <Accordion className={styles.accordionWrapper} data-cy="opplysninger-fra-sykmeldingen">
            <Accordion.Item open={open}>
                <Accordion.Header
                    className={styles.contentPadding}
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
                <Accordion.Content className={styles.contentPadding}>
                    <div className="opplysninger">
                        <SykmeldingPerioder valgtSoknad={valgtSoknad} valgtSykmelding={valgtSykmelding} />
                        <ArbeidsgiverInfo valgtSoknad={valgtSoknad} />
                        <SykmeldingDato valgtSykmelding={valgtSykmelding} />
                        <ArbeidssituasjonInfo valgtSykmelding={valgtSykmelding} />
                        <FravaersperioderInfo valgtSykmelding={valgtSykmelding} />
                        <ForsikringInfo valgtSykmelding={valgtSykmelding} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Opplysninger

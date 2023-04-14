import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Accordion, BodyShort, Heading, Label } from '@navikt/ds-react'

import { tekst } from '../../utils/tekster'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'
import useSykmelding from '../../hooks/useSykmelding'
import { logEvent } from '../amplitude/amplitude'
import Vis from '../vis'
import { erOppdelt } from '../../utils/periode-utils'

import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'
import styles from './opplysninger.module.css'
import Egenmeldingsdager from './sykmelding-egenmeldingsdager'

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

    const oppdelt = erOppdelt(valgtSoknad, valgtSykmelding)
    const klippet = true

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
                    <SykmeldingPerioder valgtSykmelding={valgtSykmelding} />

                    <Vis
                        hvis={oppdelt && !klippet}
                        render={() => (
                            <>
                                <Label size="small" as="h3" className="mt-4">
                                    Sykmeldingen er delt opp
                                </Label>
                                <BodyShort>
                                    Når sykmeldingen går over en måned deles den opp, slik at du kan søke om sykepenger
                                    før hele perioden er ferdig. Dette gjør at du slipper å vente lenge på sykepengene
                                    dine.
                                </BodyShort>
                            </>
                        )}
                    />

                    <Vis
                        hvis={klippet}
                        render={() => (
                            <>
                                <Label size="small" as="h3" className="mt-4">
                                    Overlappende sykmelding
                                </Label>
                                <BodyShort>
                                    Deler av denne perioden overlapper med en annen sykmelding. Den overlappende delen
                                    er derfor erstattet med den nyeste sykmeldingen. Dette gjøres for å unngå å sende
                                    inn søknad om sykepenger for samme periode.
                                </BodyShort>
                            </>
                        )}
                    />

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

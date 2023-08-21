import React, { useState } from 'react'
import { ExpansionCard, Heading } from '@navikt/ds-react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { UseSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

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
    steg?: string
}

const Opplysninger = ({ ekspandert }: OpplysningerProps) => {
    const { valgtSykmelding, valgtSoknad, sporsmal } = UseSoknadMedDetaljer()

    const [open, setOpen] = useState<boolean>(ekspandert)

    const tittel = tekst('sykepengesoknad.sykmelding-utdrag.tittel')

    if (!valgtSoknad || !valgtSykmelding) return null
    return (
        <ExpansionCard className="my-8" data-cy="opplysninger-fra-sykmeldingen" open={open} aria-label={tittel}>
            <ExpansionCard.Header
                onClick={() => {
                    logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                        component: tittel,
                        steg: sporsmal?.tag,
                    })
                    setOpen(!open)
                }}
            >
                <Heading size="small" level="2" className="flex h-full items-center">
                    {tittel}
                </Heading>
            </ExpansionCard.Header>

            <ExpansionCard.Content>
                <SykmeldingPerioder valgtSykmelding={valgtSykmelding} />
                <SykmeldingOppdelt valgtSykmelding={valgtSykmelding} valgtSoknad={valgtSoknad} />
                <SykmeldingOverlapp valgtSoknad={valgtSoknad} />
                <ArbeidsgiverInfo valgtSoknad={valgtSoknad} />
                <SykmeldingDato valgtSykmelding={valgtSykmelding} />
                <ArbeidssituasjonInfo valgtSykmelding={valgtSykmelding} />
                <FravaersperioderInfo valgtSykmelding={valgtSykmelding} />
                <ForsikringInfo valgtSykmelding={valgtSykmelding} />
                <Egenmeldingsdager valgtSykmelding={valgtSykmelding} />
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default Opplysninger

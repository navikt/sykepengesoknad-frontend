import { BodyShort, ExpansionCard, Heading, ReadMore, Skeleton } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import { tekstMedHtml } from '../../utils/html-react-parser-utils'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

import EksempelFrist from './eksempel-frist'
import HvorforSoknadSykepenger from './hvorfor-soknad-sykepenger'

const FristSykepenger = () => {
    const { valgtSoknad } = useSoknadMedDetaljer()
    const [open, setOpen] = useState<boolean>(false)

    if (!valgtSoknad) return <Skeleton variant="rectangle" className="mb-4 rounded-xl" height="82px"></Skeleton>

    if (valgtSoknad.utenlandskSykmelding) {
        return null
    }

    const tittel = tekst('frist-sykepenger.overskrift')
    return (
        <ExpansionCard className="frist-sykepenger mb-4" open={open} aria-label={tittel}>
            <ExpansionCard.Header
                onClick={() => {
                    logEvent(open ? 'accordion lukket' : 'accordion åpnet', {
                        component: tittel,
                    })
                    setOpen(!open)
                }}
            >
                <Heading size="small" level="2" className="flex h-full items-center">
                    {tittel}
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyShort spacing>{tekst('frist-sykepenger.innsending')}</BodyShort>
                <BodyShort spacing>{tekstMedHtml(tekst('frist-sykepenger.hovedregel'))}</BodyShort>
                <BodyShort spacing>{tekstMedHtml(tekst('frist-sykepenger.ulike.måneder'))}</BodyShort>
                <BodyShort>{tekst('frist-sykepenger.husk')}</BodyShort>

                <ReadMore header="Vis eksempler" className="my-4">
                    <Heading spacing size="xsmall" level="3" className="pt-4">
                        {tekst('frist-sykepenger.eksempel.en.tittel')}
                    </Heading>
                    <BodyShort spacing>{tekst('frist-sykepenger.eksempel.en.tekst')}</BodyShort>
                    <EksempelFrist
                        normalTekst="Frist for sykedager i mai: "
                        boldTekst="31.august"
                        mndEn="Mai"
                        mndTo="Juni"
                        mndTre="Juli"
                        mndFire="August"
                    />

                    <Heading spacing size="xsmall" level="3">
                        {tekst('frist-sykepenger.eksempel.to.tittel')}
                    </Heading>
                    <BodyShort spacing>{tekst('frist-sykepenger.eksempel.to.tekst')}</BodyShort>
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

                <HvorforSoknadSykepenger soknadstype={valgtSoknad.soknadstype} />
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default FristSykepenger

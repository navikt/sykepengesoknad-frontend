import { BodyLong, ExpansionCard, Heading, Label } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../utils/tekster'
import { logEvent } from '../umami/umami'
import { LenkeMedIkon } from '../lenke-med-ikon/LenkeMedIkon'

const OmSykepenger = () => {
    const [open1, setOpen1] = useState<boolean>(false)

    const tittel = tekst('om.sykepenger.tittel')
    return (
        <ExpansionCard open={open1} aria-label={tittel} className="mb-8">
            <ExpansionCard.Header
                onClick={() => {
                    logEvent(open1 ? 'accordion lukket' : 'accordion åpnet', {
                        tekst: tekst('om.sykepenger.tittel'),
                        komponent: 'listevisning søkad - om sykepenger',
                    })
                    setOpen1(!open1)
                }}
            >
                <Heading size="small" level="2" className="flex h-full items-center">
                    {tittel}
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyLong spacing>{tekst('om.sykepenger.tekst2')}</BodyLong>
                <Label as="h3">{tekst('om.sykepenger.hvorfor')}</Label>
                <BodyLong spacing>{tekst('om.sykepenger.tekst3')}</BodyLong>

                <Label as="h3" className="mb-2">
                    {tekst('om.sykepenger.tittel2')}
                </Label>
                <LenkeMedIkon href={tekst('om.sykepenger.lenke1.url')} text={tekst('om.sykepenger.lenke1')} />

                <LenkeMedIkon
                    className="mt-8"
                    href={tekst('om.sykepenger.lenke2.url')}
                    text={tekst('om.sykepenger.lenke2')}
                />
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default OmSykepenger

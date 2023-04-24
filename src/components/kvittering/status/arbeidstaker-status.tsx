import { Detail, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../../utils/tekster'
import Avkrysset from '../../oppsummering/utdrag/avkrysset'
import Vis from '../../vis'
import useSoknad from '../../../hooks/useSoknad'
import { RouteParams } from '../../../app'

import { Mottaker } from './kvittering-status'

const ArbeidstakerStatus = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    let medKopi = tekst('kvittering.med-kopi-til-nav')
    if (valgtSoknad!.sendtTilArbeidsgiverDato && valgtSoknad!.sendtTilNAVDato) {
        medKopi = ''
    }

    const tilNavDato = () => {
        const datoNav = dayjs(valgtSoknad?.sendtTilNAVDato).format('dddd D. MMM, kl HH:mm')
        return datoNav.charAt(0).toUpperCase() + datoNav.slice(1)
    }

    const tilArbDato = () => {
        const datoArb = dayjs(valgtSoknad?.sendtTilArbeidsgiverDato).format('dddd D. MMM, kl HH:mm')
        return datoArb.charAt(0).toUpperCase() + datoArb.slice(1)
    }

    const tilArbNavn = () => {
        return valgtSoknad?.arbeidsgiver?.navn ? valgtSoknad?.arbeidsgiver?.navn : Mottaker.ARBEIDSGIVER
    }

    const tilOrg = () => {
        return valgtSoknad?.arbeidsgiver?.orgnummer ? `(Org.nr. ${valgtSoknad.arbeidsgiver.orgnummer})` : ''
    }

    if (!valgtSoknad) return null

    return (
        <Vis
            hvis={valgtSoknad.sendtTilArbeidsgiverDato || valgtSoknad.sendtTilNAVDato}
            render={() => (
                <div className="sendt-inner">
                    <Vis
                        hvis={valgtSoknad.sendtTilArbeidsgiverDato}
                        render={() => (
                            <>
                                <Label as="h3" className="sendt-tittel">
                                    {tekst('kvittering.sendt-til')}
                                </Label>
                                <Avkrysset tekst={`${tilArbNavn()} ${tilOrg()}${medKopi}`} />
                                <Detail size="small">{tilArbDato()}</Detail>
                            </>
                        )}
                    />
                    <Vis
                        hvis={valgtSoknad.sendtTilNAVDato}
                        render={() => (
                            <>
                                <Avkrysset tekst={Mottaker.NAV} />
                                <Detail size="small">{tilNavDato()}</Detail>
                            </>
                        )}
                    />
                </div>
            )}
        />
    )
}

export default ArbeidstakerStatus

import { Button, Label } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import useForceUpdate from 'use-force-update'
import { PlusIcon } from '@navikt/aksel-icons'

import { tekst } from '../../../utils/tekster'
import { hentPerioder } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'

import PeriodeKomp from './periode-komp'

const Perioder = ({ sporsmal }: SpmProps) => {
    const { unregister } = useFormContext()
    const [lokal, setLokal] = useState<number[]>([0])
    const periodeliste = useRef<HTMLUListElement>(null)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        const svar = hentPerioder(sporsmal)
        setLokal(svar.length > 0 ? svar : lokal)
        // eslint-disable-next-line
    }, [sporsmal])

    const slettPeriode = (e: any, idx: number) => {
        e.preventDefault()
        const index = lokal.findIndex((value) => value === idx)
        lokal.splice(index, 1)
        setLokal(lokal)
        unregister(sporsmal.id + '_' + idx, { keepValue: false })
    }

    const leggTilPeriode = (e: any) => {
        e.preventDefault()
        lokal.push(lokal[lokal.length - 1] + 1)
        setLokal(lokal)
        forceUpdate()
    }

    return (
        <div data-cy="perioder" className="mt-8">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>

            <ul className="list-none" ref={periodeliste}>
                {lokal.map((idx) => (
                    <PeriodeKomp
                        sporsmal={sporsmal}
                        index={idx}
                        slettPeriode={slettPeriode}
                        key={sporsmal.id + '_' + idx}
                    />
                ))}
            </ul>
            <Vis
                hvis={sporsmal.svartype === RSSvartype.PERIODER}
                render={() => (
                    <Button
                        type="button"
                        icon={<PlusIcon aria-hidden={true} />}
                        size="small"
                        variant="tertiary"
                        className="mt-4"
                        onClick={leggTilPeriode}
                    >
                        {tekst('sykepengesoknad.periodevelger.legg-til-ekstra')}
                    </Button>
                )}
            ></Vis>

            <div aria-live="assertive">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default Perioder

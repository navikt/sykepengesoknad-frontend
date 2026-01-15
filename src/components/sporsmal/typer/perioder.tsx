import { Button, Label } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PlusIcon } from '@navikt/aksel-icons'

import { hentPerioder } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import useForceUpdate from '../../../hooks/useForceUpdate'

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
        setLokal([...lokal]) // Ensure state updates correctly
        unregister(sporsmal.id + '_' + idx, { keepValue: false })
    }

    const leggTilPeriode = (e: any) => {
        e.preventDefault()
        lokal.push(lokal[lokal.length - 1] + 1)
        setLokal([...lokal]) // Ensure state updates correctly
        forceUpdate()
    }

    return (
        <div data-cy="perioder" className="mt-8">
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>

            <ul className="list-none mt-2 flex flex-col gap-4" ref={periodeliste}>
                {lokal.map((idx) => (
                    <PeriodeKomp
                        sporsmal={sporsmal}
                        index={idx}
                        slettPeriode={slettPeriode}
                        key={sporsmal.id + '_' + idx}
                        antallPerioder={lokal.length}
                    />
                ))}
            </ul>

            {sporsmal.svartype === RSSvartype.PERIODER && (
                <Button
                    type="button"
                    icon={<PlusIcon aria-hidden />}
                    size="small"
                    variant="tertiary"
                    className="mt-4"
                    onClick={leggTilPeriode}
                >
                    Legg til ekstra periode
                </Button>
            )}

            <div aria-live="assertive">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default Perioder

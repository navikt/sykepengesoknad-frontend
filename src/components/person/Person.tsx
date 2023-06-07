import { BodyShort, Link, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
import { PersonCircleIcon } from '@navikt/aksel-icons'
import { useNavigate } from 'react-router'

import { isMockBackend, isOpplaering } from '../../utils/environment'
import { personas } from '../../data/mock/testperson'

const Person = () => {
    const [open, setOpen] = useState<boolean>(false)
    const person = useRef<HTMLButtonElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()
    const navigate = useNavigate()

    if (!kanVelgePerson) return null

    return (
        <div className="hidden cursor-pointer md:block">
            <button
                id="listelink"
                className="hidden"
                onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                }}
            >
                TestLink
            </button>
            <button aria-label="Velg testperson" ref={person}>
                <PersonCircleIcon
                    onClick={() => {
                        setOpen(!open)
                    }}
                    aria-label="Velg testperson"
                    className="h-12 w-12"
                />
            </button>
            <Popover
                open={open}
                anchorEl={person.current as HTMLElement}
                placement="bottom"
                onClose={() => setOpen(false)}
            >
                <Popover.Content>
                    <ul>
                        {Object.keys(personas).map((p, idx) => (
                            <BodyShort as="li" key={idx}>
                                <Link href={`/syk/sykepengesoknad/?testperson=${p}`}>{p}</Link>
                            </BodyShort>
                        ))}
                    </ul>
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default Person

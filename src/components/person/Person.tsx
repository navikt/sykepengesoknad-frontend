import { BodyShort, Link, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
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
        <div className="person">
            <div style={{ display: 'none' }} id="listelink" onClick={() => navigate('/')}>
                TestLink
            </div>
            <button
                aria-label="Velg person"
                className="lenkeknapp"
                ref={person}
                onClick={() => {
                    setOpen(true)
                }}
            >
                <img src="/syk/sykepengesoknad/static/person.svg" className="person__ikon" alt="" />
            </button>
            <Popover
                open={open}
                anchorEl={person.current as HTMLElement}
                placement="bottom"
                onClose={() => setOpen(false)}
            >
                <Popover.Content>
                    <ul>
                        {Object.keys(personas)
                            .sort()
                            .map((p, idx) => (
                                <BodyShort size="medium" as="li" key={idx}>
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

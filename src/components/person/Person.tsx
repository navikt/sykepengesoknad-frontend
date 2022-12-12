import { BodyShort, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { isMockBackend, isOpplaering } from '../../utils/environment'
import { personas } from '../../data/mock/testperson'

const Person = () => {
    const [open, setOpen] = useState<boolean>(false)
    const person = useRef<HTMLButtonElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    if (!kanVelgePerson) return null

    return (
        <div className="person">
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
                        {Object.keys(personas).map((p, idx) => (
                            <BodyShort size="medium" as="li" key={idx}>
                                <a href={`?testperson=${p}`}>{p}</a>
                            </BodyShort>
                        ))}
                    </ul>
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default Person

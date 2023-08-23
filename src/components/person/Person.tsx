import { BodyShort, Button, Link, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
import { PersonCircleIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'

import { isMockBackend, isOpplaering } from '../../utils/environment'
import { PersonaKeys } from '../../data/mock/testperson'
import { useTestpersonQuery } from '../../hooks/useTestpersonQuery'

const Person = () => {
    const [open, setOpen] = useState<boolean>(false)
    const person = useRef<HTMLButtonElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()
    const router = useRouter()
    const testpersonQuery = useTestpersonQuery()

    if (!kanVelgePerson) return null

    return (
        <div className="hidden cursor-pointer md:block">
            <button
                id="listelink"
                className="hidden"
                onClick={(e) => {
                    e.preventDefault()

                    router.push(`/${testpersonQuery.query()}`)
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
                        {Object.keys(PersonaKeys).map((p, idx) => (
                            <BodyShort as="li" key={idx}>
                                <Link href={`/syk/sykepengesoknad/?testperson=${p.valueOf()}`}>{p}</Link>
                            </BodyShort>
                        ))}
                    </ul>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            document.cookie = 'mock-session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/'
                            window.location.reload()
                        }}
                    >
                        Reset testdata
                    </Button>
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default Person

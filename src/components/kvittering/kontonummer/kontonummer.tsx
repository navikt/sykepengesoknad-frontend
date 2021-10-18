import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { Personalia } from '../../../types/types'
import env from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

const Kontonummer = () => {
    const [ kontonummer, setKontonummer ] = useState<string>()

    useEffect(() => {
        hentKontonummer()
    }, [])

    async function hentKontonummer() {
        if (env.isProd()) {
            const res = await fetch('https://www.nav.no/person/personopplysninger-api/personalia', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            const data: Personalia = await res.json()
            setKontonummer(data?.personalia?.kontonr)
        }

        if(env.isMockBackend()) {
            setKontonummer('12332112332')
        }
    }

    const formatterKontonr = (kontonummer: string) =>
        kontonummer.length === 11
            ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3')
            : kontonummer

    return (
        <>
            <Element tag="h2">
                {tekst('kvittering.kontonummer.tittel')}
            </Element>

            <Vis hvis={!kontonummer}
                render={() =>
                    <Normaltekst>
                        {parser(tekst('kvittering.kontonummer.mangler'))}
                    </Normaltekst>
                }
            />

            <Vis hvis={kontonummer}
                render={() =>
                    <>
                        <Normaltekst>
                            <strong>{formatterKontonr(kontonummer!)}</strong>
                        </Normaltekst>
                        <Normaltekst>
                            {parser(tekst('kvittering.kontonummer.endre'))}
                        </Normaltekst>
                    </>
                }
            />
        </>
    )
}

export default Kontonummer

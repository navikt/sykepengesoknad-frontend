import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { harForsikring, harSpmOmForsikring,hentArbeidssituasjon } from '../../utils/sykmelding-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const ForsikringInfo = () => {
    const { valgtSykmelding } = useAppStore()

    const arbeidssituasjon = hentArbeidssituasjon(valgtSykmelding)
    const forsikring = harForsikring(valgtSykmelding)

    return (
        <Vis hvis={(arbeidssituasjon === RSArbeidssituasjon.FRILANSER || arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE) && harSpmOmForsikring(valgtSykmelding)}
            render={() =>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">
                        {tekst('sykepengesoknad.sykmelding-utdrag.forsikring')}
                    </UndertekstBold>
                    <Normaltekst>
                        {tekst(forsikring
                            ? 'sykepengesoknad.sykmelding-utdrag.forsikring-ja'
                            : 'sykepengesoknad.sykmelding-utdrag.forsikring-nei'
                        )}
                    </Normaltekst>
                </div>
            }
        />
    )
}

export default ForsikringInfo

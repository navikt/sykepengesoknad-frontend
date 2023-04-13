import { BodyLong } from '@navikt/ds-react'

import { EkspanderbarHjelpTekster } from './ekspanderbar-hjelp-tekst'

export const YrkesskadeBody = () => {
    return (
        <>
            <BodyLong>{EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body1']}</BodyLong>
            <BodyLong className={'mt-4'}>
                {EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body2']}
                <Link href={'https://www.nav.no/yrkesskade'} target={'_blank'}>
                    {EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.hva-er-lenke']}
                </Link>
            </BodyLong>
            <BodyLong className={'mt-4'}>{EkspanderbarHjelpTekster['ekspanderbarhjelp.yrkesskade.body3']}</BodyLong>
        </>
    )
}

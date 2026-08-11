import React from 'react'
import { BodyShort, Box, HStack, Skeleton } from '@navikt/ds-react'
import { InformationIcon } from '@navikt/aksel-icons'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { sorterEtterNyesteFom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { Banner } from '../banner/banner'
import OmSykepenger from '../om-sykepenger/om-sykepenger'
import useSoknader from '../../hooks/useSoknader'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { STANDARD_TESTPERSON, testpersoner } from '../../data/mock/testperson'
import { isMockBackend, isOpplaering } from '../../utils/environment'

import Teasere from './teasere'
import { useTestpersonQuery } from '../../hooks/useTestpersonQuery'

const personer = testpersoner()

function erTestpersonNokkel(testperson: string): testperson is keyof typeof personer {
    return testperson in personer
}

function hentPersonaBeskrivelse(testperson: string | string[] | undefined): string | undefined {
    // Mock-backend bruker standardpersonen når ingen er valgt i demomenyen
    const valgtTestperson = (Array.isArray(testperson) ? testperson[0] : testperson) ?? STANDARD_TESTPERSON

    if (!valgtTestperson || !erTestpersonNokkel(valgtTestperson)) {
        return undefined
    }

    return personer[valgtTestperson]?.beskrivelse
}

const Listevisning = () => {
    const { data: soknader, isPending } = useSoknader()
    const testpersonQuery = useTestpersonQuery()
    const erDemo = isMockBackend() || isOpplaering()

    useUpdateBreadcrumbs(() => [], [])

    const personaBeskrivelse = hentPersonaBeskrivelse(testpersonQuery.testperson)

    const nyeSoknader = (soknader || [])
        .filter(
            (soknad) =>
                soknad.status === RSSoknadstatus.NY ||
                soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING ||
                soknad.status === RSSoknadstatus.FREMTIDIG,
        )
        .sort(sorterEtterNyesteFom)
        .reverse()

    const tidligereSoknader = (soknader || [])
        .filter(
            (soknad) =>
                soknad.status === RSSoknadstatus.SENDT ||
                soknad.status === RSSoknadstatus.AVBRUTT ||
                soknad.status === RSSoknadstatus.UTGAATT,
        )
        .sort(sorterEtterNyesteFom)

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />
            {erDemo && personaBeskrivelse && (
                <Box
                    background="meta-lime-moderate"
                    borderColor="meta-lime-subtle"
                    borderWidth="1"
                    borderRadius="4"
                    padding="space-12"
                    marginBlock="space-0 space-16"
                >
                    <HStack gap="space-8" wrap={false} align="center">
                        <InformationIcon aria-hidden fontSize="1.5rem" />
                        <BodyShort size="small">Demoinfo: {personaBeskrivelse}</BodyShort>
                    </HStack>
                </Box>
            )}

            <OmSykepenger />

            <QueryStatusPanel />
            {isPending && (
                <>
                    <div className="mb-12">
                        <Skeleton variant="rectangle" className="mb-6" width="25%" height="32px" />
                        <Skeleton variant="rectangle" className="h-[138px] max-[560px]:h-[150px]" />
                    </div>
                </>
            )}
            {soknader && (
                <>
                    <Teasere
                        soknader={nyeSoknader}
                        tittel={tekst('soknader.nye.tittel')}
                        tomListeTekst={tekst('soknader.nye.ingen-soknader')}
                    />

                    {tidligereSoknader.length > 0 && (
                        <Teasere
                            soknader={tidligereSoknader}
                            tittel={tekst('soknader.sendt.tittel')}
                            kanSorteres={true}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default Listevisning

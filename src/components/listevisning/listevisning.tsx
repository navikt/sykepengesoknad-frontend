import React, { useState } from 'react'
import { Skeleton } from '@navikt/ds-react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { sorterEtterNyesteFom } from '../../utils/sorter-soknader'
import { tekst } from '../../utils/tekster'
import { Banner } from '../banner/banner'
import OmSykepenger from '../om-sykepenger/om-sykepenger'
import useSoknader from '../../hooks/useSoknader'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { FlexjarSurveyModal } from '../flexjar/flexjar-survey'
import { skjulFlexjarSurvey } from '../flexjar/utils'

import Teasere from './teasere'

const Listevisning = () => {
    const router = useRouter()
    const { data: soknader, isLoading } = useSoknader()
    const [visSurvey, setVisSurvey] = useState(router.query.visSurvey === 'true')

    useUpdateBreadcrumbs(() => [], [])

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

    const svarAlternativer = [
        'Jeg har allerede sendt inn søknaden på papir',
        'Jeg vil lage en ny søknad',
        'Arbeidsgiveren min betaler for hele sykefraværet',
        'Jeg skal svare på søknaden senere',
        'Jeg vil ikke søke',
        'Annet',
    ]

    return (
        <>
            <Banner overskrift={tekst('soknader.sidetittel')} />

            <OmSykepenger />

            <QueryStatusPanel />
            {isLoading && (
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
            <FlexjarSurveyModal
                modalTittel="Du har avbrutt søknaden"
                visSurvey={visSurvey}
                surveySporsmal="Hvorfor ønsket du å avbryte denne søknaden?"
                svarAlternativer={svarAlternativer}
                onSubmit={() => {
                    skjulFlexjarSurvey(router).then(() => setVisSurvey(false))
                }}
                feedbackId="sykpengesoknad-avbryt-survey"
            ></FlexjarSurveyModal>
        </>
    )
}

export default Listevisning

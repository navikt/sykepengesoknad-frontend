import { ParsedUrlQuery } from 'querystring'

import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'
import { DependencyList, useCallback, useEffect, useRef } from 'react'

import { minSideUrl, basePath, sykefravaerUrl } from '../utils/environment'
import { tekst } from '../utils/tekster'

type Breadcrumb = { title: string; url: string }
type LastCrumb = { title: string }
type CompleteCrumb = Parameters<typeof setBreadcrumbs>[0][0]

function createCompleteCrumbs(
    breadcrumbs: [...Breadcrumb[], LastCrumb] | [],
    query: string | undefined,
): CompleteCrumb[] {
    const baseCrumb: CompleteCrumb[] = [
        { title: 'Min side', url: minSideUrl(), handleInApp: false },
        { title: 'Ditt sykefravær', url: sykefravaerUrl(), handleInApp: false },
        {
            title: tekst('soknader.sidetittel'),
            url: basePath() + '/' + (query || ''),
            handleInApp: true,
        },
    ]

    const prefixedCrumbs: CompleteCrumb[] = breadcrumbs.map(
        (it): CompleteCrumb => ({
            ...it,
            url: 'url' in it ? `${basePath()}${it.url}` : '/',
            handleInApp: true,
        }),
    )

    return [...baseCrumb, ...prefixedCrumbs]
}

function skapTestpersonQuery(query: ParsedUrlQuery): string | undefined {
    const testpersonQuery = query['testperson']
    if (testpersonQuery) {
        return `?testperson=${testpersonQuery}`
    }
    return undefined
}

export function useUpdateBreadcrumbs(makeCrumbs: () => [...Breadcrumb[], LastCrumb] | [], deps?: DependencyList): void {
    const makeCrumbsRef = useRef(makeCrumbs)
    const router = useRouter()

    useEffect(() => {
        makeCrumbsRef.current = makeCrumbs
    }, [makeCrumbs])

    useEffect(() => {
        ;(async () => {
            try {
                const prefixedCrumbs = createCompleteCrumbs(makeCrumbsRef.current(), skapTestpersonQuery(router.query))
                await setBreadcrumbs(prefixedCrumbs)
            } catch (e) {
                logger.error(`klarte ikke å oppdatere breadcrumbs på ${location.pathname}`)
                logger.error(e)
            }
        })()
        // Custom hook that passes deps array to useEffect, linting will be done where useUpdateBreadcrumbs is used
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export function useHandleDecoratorClicks(): void {
    const router = useRouter()
    const callback = useCallback(
        (breadcrumb: Breadcrumb) => {
            // router.push automatically pre-pends the base route of the application
            router.push(breadcrumb.url.replace(basePath() || '', '') || '/')
        },
        [router],
    )

    useEffect(() => {
        onBreadcrumbClick(callback)
    })
}

export const soknadBreadcrumb = { title: tekst('soknad.sidetittel') }
export const kvitteringBreadcrumb = { title: tekst('kvittering.sidetittel') }

export enum SsrPathVariants {
    Root = '/',
    NotFound = '/404',
    ServerError = '/500',
    App = '/[[...app]]',
    SykepengesoknadUtland = '/sykepengesoknad-utland',
}

export function createInitialServerSideBreadcrumbs(
    pathname: SsrPathVariants | string,
    query: ParsedUrlQuery,
): CompleteCrumb[] {
    switch (pathname) {
        case SsrPathVariants.Root:
        case SsrPathVariants.NotFound:
        case SsrPathVariants.ServerError:
        case SsrPathVariants.SykepengesoknadUtland:
        case SsrPathVariants.App:
            return createCompleteCrumbs([], skapTestpersonQuery(query))
        default:
            logger.error(`Unknown initial path (${pathname}), defaulting to just base breadcrumb`)
            return createCompleteCrumbs([], skapTestpersonQuery(query))
    }
}

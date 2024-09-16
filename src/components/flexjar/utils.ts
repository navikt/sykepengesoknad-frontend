import { NextRouter } from 'next/router'

export async function skjulFlexjarSurvey(router: NextRouter): Promise<void> {
    await router.push(
        {
            pathname: router.pathname,
            query: { ...router.query, visSurvey: 'false' },
        },
        undefined,
        { shallow: true },
    )
}

export async function visFlexjarSurvey(
    router: NextRouter,
    grunnPath?: string,
    eksisterendeParams?: string,
): Promise<void> {
    const ekstraParams = new URLSearchParams(eksisterendeParams)
    const ekstraParamsObj: Record<string, string> = {}
    ekstraParams.forEach((value, key) => {
        ekstraParamsObj[key] = value
    })
    await router.push(
        {
            pathname: grunnPath || router.pathname,
            query: { ...router.query, ...ekstraParamsObj, visSurvey: 'true' },
        },
        undefined,
        { shallow: true },
    )
}

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

export async function visFlexjarSurvey(router: NextRouter): Promise<void> {
    await router.push(
        {
            pathname: router.pathname,
            query: { ...router.query, visSurvey: 'true' },
        },
        undefined,
        { shallow: true },
    )
}

import { useRouter } from 'next/router'

export function useTestpersonQuery() {
    const router = useRouter()
    const testpersonQuery = router.query['testperson']

    return {
        query: () => {
            if (testpersonQuery) {
                return `?testperson=${testpersonQuery}`
            }
            return ''
        },
        testperson: testpersonQuery,
    }
}

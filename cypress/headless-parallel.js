/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cypress = require('cypress')

const startTime = new Date().getTime()

async function startRun(runNumber) {
    return await cypress.run({
        config: {
            watchForFileChanges: false,
            trashAssetsBeforeRuns: false,
            specPattern: `**/run-${runNumber}/**.cy.ts`,
        },
    })
}

const alleRuns = [startRun(0), startRun(1), startRun(2), startRun(3)]
Promise.all(alleRuns).then((runs) => {
    const endTime = new Date().getTime()
    let passed = 0
    let failed = 0

    runs.forEach((run) => {
        passed += run.totalPassed
        failed += run.totalFailed
    })

    console.log(`Alle tester kjørt på ${(endTime - startTime) / 1000} s`)

    console.log('Antall tester kjørt: ' + (passed + failed))
    console.log('Antall tester som feilet: ' + failed)
    console.log('Antall tester som gikk bra: ' + passed)

    if (failed !== 0) {
        process.exit(1)
    }
})

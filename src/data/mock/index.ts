import * as uuid from 'uuid'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'
import dayjs from 'dayjs'

import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { feilVedSlettingAvKvittering } from './data/reisetilskudd'
import { Persona, soknaderOpplaering } from './personas'

const setUpMock = (person: Persona) => {
    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: MiddlewareUtils.combine(MiddlewareUtils.loggingMiddleware()),
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/opprettSoknadUtland', (req, res, ctx) => {
        const soknad = person.soknader.find(
            (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
        )
        if (soknad) {
            return res(ctx.json(soknad))
        }
        const soknadOriginal = jsonDeepCopy(
            soknaderOpplaering.find(
                (sok: RSSoknad) => sok.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && sok.status === RSSoknadstatus.NY,
            )!,
        )
        soknadOriginal.id = uuid.v4()
        soknadOriginal.status = RSSoknadstatus.NY
        person.soknader.push(soknadOriginal)

        return res(ctx.json(soknadOriginal))
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/ettersendTilNav', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.sendtTilNAVDato = dayjs().toJSON()
        return Promise.resolve({ status: 200 })
    })

    mock.post(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/ettersendTilArbeidsgiver',
        (req) => {
            const soknadId = req.pathParams.soknad
            const soknad = person.soknader.find((s) => s.id === soknadId)!
            soknad.sendtTilArbeidsgiverDato = dayjs().toJSON()
            return Promise.resolve({ status: 200 })
        },
    )

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/avbryt', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.status = 'AVBRUTT'
        soknad.avbruttDato = dayjs().toJSON()
        return Promise.resolve({ status: 200 })
    })

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/gjenapne', (req) => {
        const soknadId = req.pathParams.soknad
        const soknad = person.soknader.find((s) => s.id === soknadId)!
        soknad.status = 'NY'
        soknad.avbruttDato = null
        return Promise.resolve({ status: 200 })
    })

    mock.delete(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/sporsmal/:spmid/svar/:svarid',
        (req) => {
            if (req.pathParams.soknad === feilVedSlettingAvKvittering.id) {
                return Promise.resolve({ status: 500 })
            }
            const sok = person.soknader.find((s) => s.id === req.pathParams.soknad)!
            const spm = sok.sporsmal.find((s) => s.id === req.pathParams.spmid)!
            const svarIdx = spm.svar.findIndex((s) => s.id === req.pathParams.svarid)!
            spm.svar.splice(svarIdx, 1)

            return Promise.resolve({ status: 204 })
        },
    )

    mock.post(
        '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/:soknad/sporsmal/:spmid/svar',
        (req) => {
            const sok = person.soknader.find((r) => r.id === req.pathParams.soknad)!
            const spm = sok.sporsmal.find((spm) => spm.id === req.pathParams.spmid)

            spm!.svar.push({
                id: uuid.v4(),
                ...req.body,
            })

            return Promise.resolve({
                status: 201,
                body: JSON.stringify({ oppdatertSporsmal: spm }),
            })
        },
    )

    mock.post('/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/opplasting', (req, res, ctx) =>
        res(
            ctx.json({
                id: uuid.v4(),
                melding: 'opprettet',
            }),
        ),
    )

    mock.get('/syk/sykepengesoknad/api/sykepengesoknad-kvitteringer/api/v2/kvittering/:blob', () =>
        fetch('/syk/sykepengesoknad/static/kvittering.jpg'),
    )
}

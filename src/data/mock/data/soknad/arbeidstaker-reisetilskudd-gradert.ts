import { RSSoknad } from '../../../../types/rs-types/rs-soknad'
import { gradertReisetilskuddSm } from '../sykmeldinger'
import { andreInntektskilderV2 } from '../sporsmal/andre-inntektskilder-v2'
import { ansvarserklaring } from '../sporsmal/ansvarserklaring'
import { arbeidUtenforNorge } from '../sporsmal/arbeid-utenfor-norge'
import { bilBompenger, bilBompengerBelop, bilTilDaglig, kmHjemJobb } from '../sporsmal/bil-til-daglig'
import { ferieV2 } from '../sporsmal/ferie-v2'
import { jobbetDuGradert } from '../sporsmal/jobbet-du-gradert'
import { kvitteringer } from '../sporsmal/kvitteringer'
import { offentligTransportBelop, offentligTransportTilDaglig } from '../sporsmal/offentlig-transport'
import { oppholdUtenforEos } from '../sporsmal/opphold-utenfor-eos'
import { oppsummering } from '../sporsmal/oppsummering'
import { permisjonV2 } from '../sporsmal/permisjon-v2'
import { bilDatoer, reiseMedBil } from '../sporsmal/reise-med-bil'
import { brukteReisetilskuddet } from '../sporsmal/brukte-reisetilskuddet'
import { tilbakeIArbeid } from '../sporsmal/tilbake-i-arbeid'
import { transportTilDaglig } from '../sporsmal/transport-til-daglig'
import { typeTransport } from '../sporsmal/type-transport'
import { utbetaling } from '../sporsmal/utbetaling'

const fom = '2020-04-01'
const tom = '2020-04-24'
const arbeidsgiver = { navn: 'SNILL TORPEDO', orgnummer: '967170232' }

export const gradertReisetilskudd: RSSoknad = {
    id: 'bc250797-147c-4050-b193-920c508902aa',
    sykmeldingId: gradertReisetilskuddSm.id,
    soknadstype: 'GRADERT_REISETILSKUDD',
    status: 'NY',
    fom,
    tom,
    opprettetDato: '2021-07-26',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [{ fom, tom, grad: 60, sykmeldingstype: 'GRADERT' }],
    sporsmal: [
        ansvarserklaring({ id: '1547215' }),
        tilbakeIArbeid({
            fom,
            tom,
            arbeidsgiver: arbeidsgiver.navn,
            id: '1547216',
            tilbakeNarId: '1547217',
            sporsmalstekst: 'Var du tilbake i ditt vanlige arbeid uten ekstra reiseutgifter før 25. april?',
            tilbakeNarTekst: 'Når var du tilbake?',
        }),
        ferieV2({ fom, tom, id: '1547218', ferieNarId: '1547219' }),
        permisjonV2({ fom, tom, id: '1547220', permisjonNarId: '1547221' }),
        jobbetDuGradert({
            fom,
            tom,
            arbeidsgiver: arbeidsgiver.navn,
            grad: 40,
            ids: {
                timerPerUke: '495730df-717d-3774-bd19-e6bcf76e3ba2',
                arbeidsmengde: 'e3a6bd7d-8f10-381c-8cd3-cdab3e410c95',
                prosent: '0e368ffc-1840-35e5-bbb5-b994cbaa8ef1',
                prosentVerdi: '13acfccb-3f39-3893-8054-058270add6ab',
                timer: '348f75cd-a87d-397b-8428-cbcb9e50a5d7',
                timerVerdi: '34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
            },
        }),
        arbeidUtenforNorge({ id: '1547244' }),
        andreInntektskilderV2(),
        oppholdUtenforEos({ fom, tom, id: '1547222', oppholdNarId: '1547223' }),
        brukteReisetilskuddet(),
        transportTilDaglig({
            id: '1547256',
            typeTransportSporsmal: typeTransport({
                id: '1547257',
                undersporsmal: [
                    offentligTransportTilDaglig({ id: '1547258', belop: offentligTransportBelop({ id: '1547259' }) }),
                    bilTilDaglig({ id: '1547260' }),
                ],
            }),
        }),
        reiseMedBil({
            fom,
            tom,
            id: '1547261',
            bilDatoerSporsmal: bilDatoer({ fom, tom, id: '1547262' }),
            bompengerSporsmal: bilBompenger({ id: '1547263', belop: bilBompengerBelop({ id: '1547264' }) }),
            kmHjemJobbSporsmal: kmHjemJobb({ id: '1547265' }),
        }),
        kvitteringer({ fom, tom, id: '1547266' }),
        utbetaling({ id: '1547267' }),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

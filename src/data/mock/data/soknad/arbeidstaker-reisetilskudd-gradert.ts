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
        ansvarserklaring(),
        tilbakeIArbeid({
            fom,
            tom,
            arbeidsgiver: arbeidsgiver.navn,
            sporsmalstekst: 'Var du tilbake i ditt vanlige arbeid uten ekstra reiseutgifter før 25. april?',
            tilbakeNarTekst: 'Når var du tilbake?',
        }),
        ferieV2({ fom, tom }),
        permisjonV2({ fom, tom }),
        jobbetDuGradert({
            fom,
            tom,
            arbeidsgiver: arbeidsgiver.navn,
            grad: 40,
        }),
        arbeidUtenforNorge(),
        andreInntektskilderV2(),
        oppholdUtenforEos({ fom, tom }),
        brukteReisetilskuddet(),
        transportTilDaglig({
            typeTransportSporsmal: typeTransport({
                undersporsmal: [offentligTransportTilDaglig({ belop: offentligTransportBelop() }), bilTilDaglig()],
            }),
        }),
        reiseMedBil({
            fom,
            tom,
            bilDatoerSporsmal: bilDatoer({ fom, tom }),
            bompengerSporsmal: bilBompenger({ belop: bilBompengerBelop() }),
            kmHjemJobbSporsmal: kmHjemJobb(),
        }),
        kvitteringer({ fom, tom }),
        utbetaling(),
        oppsummering(),
    ],
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
    klippet: false,
}

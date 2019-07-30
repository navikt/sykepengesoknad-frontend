import { AvgittAvTyper, SvarTyper } from '../../types/enums';
import { Soknad, Sporsmal } from '../../types/types';
import dayjs from 'dayjs';

const sporsmal: Sporsmal = {
    id: 'ljlskj-asdfadsf-2344-sdfgs',
    kriterieForVisningAvUndersporsmal: 'Bra språk',
    max: 9,
    min: 3,
    sporsmalstekst: 'Hva heter du?',
    svar: {
        avgittAv: AvgittAvTyper.TIDLIGERE_SOKNAD,
        verdi: 'Ja'
    },
    svartype: SvarTyper.DATO,
    tag: 'ole',
    undertekst: 'Vær så snill da...',
    pavirkerAndreSporsmal: false
};

const soknader: Soknad[] = [
    {
        id: 'sdfasfg-sdfasd-111',
        sykmeldingId: 'hgfs-34-gdfgd-33',
        soknadstype: 'Gammel',
        status: 'OK',
        fom: dayjs('2019-06-03').toDate(),
        tom: dayjs('2019-06-19').toDate(),
        opprettetDato: dayjs('2019-06-03').toDate(),
        innsendtDato: dayjs('2019-06-09').toDate(),
        sendtTilNAVDato: dayjs('2019-06-13').toDate(),
        sendtTilArbeidsgiverDato: dayjs('2019-06-09').toDate(),
        sporsmal: [sporsmal]
    }
];

export default soknader;

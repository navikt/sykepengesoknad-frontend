import dayjs from 'dayjs';
import { getLedetekst } from '../../utils/utils';
import tekster from './banner-tekster';
import 'dayjs/locale/nb';

it('Returns text from bundle', () => {
    const text = tekster['sykepengesoknad.sidetittel.periode-2'];
    console.log('text', text); //eslint-disable-line
    expect(text).toEqual('Gjelder for perioden %PERIODE%');
});

it('Returns text from bundle', () => {
    expect(getLedetekst(tekster['sykepengesoknad.sidetittel.periode-2'],
        {
            '%PERIODE%': dayjs(new Date()).locale('nb').format('DD. MMMM YYYY') + ' - ' +
                dayjs(new Date()).locale('nb').format('DD. MMMM YYYY')
        })).toEqual('Gjelder for perioden 01. oktober 2019 - 01. oktober 2019');
});

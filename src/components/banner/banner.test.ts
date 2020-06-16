import 'dayjs/locale/nb'

import dayjs from 'dayjs'

import { getLedetekst, tekst } from '../../utils/tekster'

it('Returns text from bundle', () => {
    const text = tekst('sykepengesoknad.sidetittel.periode-2')
    expect(text).toEqual('Gjelder for perioden %PERIODE%')
})

it('Returns text from bundle', () => {
    expect(getLedetekst(tekst('sykepengesoknad.sidetittel.periode-2'),
        {
            '%PERIODE%': dayjs('2019-10-01').locale('nb').format('DD. MMMM YYYY') + ' - ' +
                dayjs('2020-01-20').locale('nb').format('DD. MMMM YYYY')
        })).toEqual('Gjelder for perioden 01. oktober 2019 - 20. januar 2020')
})

import dayjs from 'dayjs'

import { validerDatoObjekt } from '../../../utils/dato-utils'

test('test format validering', () => {
    const sporsmalMin = '2020-04-01'
    const sporsmalMax = '2020-04-24'

    expect(validerDatoObjekt(undefined, sporsmalMin, sporsmalMax).valid).toBeFalsy()
    expect(validerDatoObjekt(undefined, sporsmalMin, sporsmalMax).message).toBe(
        'Du må oppgi en gyldig dato i formatet dd.mm.åååå',
    )
})

test('test ikke for tidlig dato validering', () => {
    const sporsmalMin = '2020-04-01'
    const sporsmalMax = '2020-04-24'

    expect(validerDatoObjekt(new Date('2020-03-01'), sporsmalMin, sporsmalMax).valid).toBeFalsy()
    expect(validerDatoObjekt(new Date('2020-03-01'), sporsmalMin, sporsmalMax).message).toBe(
        'Datoen kan ikke være før ' + dayjs(sporsmalMin).format('DD.MM.YYYY'),
    )

    expect(validerDatoObjekt(new Date('2020-04-01'), sporsmalMin, sporsmalMax).valid).toBeTruthy()
    expect(validerDatoObjekt(new Date('2020-04-01'), sporsmalMin, sporsmalMax).message).toBe('')
})

test('test ikke for sen dato validering', () => {
    const sporsmalMin = '2020-04-01'
    const sporsmalMax = '2020-04-24'

    expect(validerDatoObjekt(new Date('2020-05-01'), sporsmalMin, sporsmalMax).valid).toBeFalsy()
    expect(validerDatoObjekt(new Date('2020-05-01'), sporsmalMin, sporsmalMax).message).toBe(
        'Datoen kan ikke være etter ' + dayjs(sporsmalMax).format('DD.MM.YYYY'),
    )

    expect(validerDatoObjekt(new Date('2020-04-25'), sporsmalMin, sporsmalMax).valid).toBeFalsy()
    expect(validerDatoObjekt(new Date('2020-04-25'), sporsmalMin, sporsmalMax).message).toBe(
        'Datoen kan ikke være etter ' + dayjs(sporsmalMax).format('DD.MM.YYYY'),
    )
})

test('test forskjellige korrekte datoer', () => {
    const sporsmalMin = '2020-04-01'
    const sporsmalMax = '2020-04-24'

    // det er viktig at klokkeslett blir 00:00:00.000 for at valideringen skal fungere, man kan ellers støte på tidssoneproblemer
    expect(validerDatoObjekt(new Date('2020-04-01'), sporsmalMin, sporsmalMax).valid).toBeTruthy()

    expect(validerDatoObjekt(new Date('2020-04-15'), sporsmalMin, sporsmalMax).valid).toBeTruthy()

    // det er viktig at klokkeslett blir 00:00:00.000 for at valideringen skal fungere, man kan ellers støte på tidssoneproblemer
    expect(validerDatoObjekt(new Date('2020-04-24'), sporsmalMin, sporsmalMax).valid).toBeTruthy()
})

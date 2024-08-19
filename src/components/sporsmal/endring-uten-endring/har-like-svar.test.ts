import { expect, test } from 'vitest'

import { sok6 } from '../../../data/mock/data/soknad/soknader-integration'
import { rsToSoknad } from '../../../types/mapping'
import { sendtArbeidsledig } from '../../../data/mock/data/soknad/arbeidsledig-sendt'

import { harLikeSvar } from './har-like-svar'

test('Har helt like svar', () => {
    const like = harLikeSvar(rsToSoknad(sendtArbeidsledig), rsToSoknad(sendtArbeidsledig))
    expect(like).toBeTruthy()
})

test('Har hvertfall ikke like svar', () => {
    const like = harLikeSvar(rsToSoknad(sok6), rsToSoknad(sendtArbeidsledig))
    expect(like).toBeFalsy()
})

test('Har et ulikt svar', () => {
    const soknad1 = rsToSoknad(sendtArbeidsledig)
    const soknad2 = rsToSoknad(sendtArbeidsledig)
    soknad2.sporsmal[0].svarliste.svar = []

    const like = harLikeSvar(soknad1, soknad2)
    expect(like).toBeFalsy()
})

test('Har et annet ulikt svar', () => {
    const soknad1 = rsToSoknad(sendtArbeidsledig)
    const soknad2 = rsToSoknad(sendtArbeidsledig)
    soknad2.sporsmal[0].svarliste.svar = [{ verdi: '42' }]

    const like = harLikeSvar(soknad1, soknad2)
    expect(like).toBeFalsy()
})

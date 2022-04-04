import { sendtArbeidsledig, sok6 } from '../../../data/mock/data/soknader-integration'
import { Soknad } from '../../../types/types'
import { harLikeSvar } from './har-like-svar'

test('Har helt like svar', () => {
    const like = harLikeSvar(new Soknad(sendtArbeidsledig), new Soknad(sendtArbeidsledig))
    expect(like).toBeTruthy()
})


test('Har hvertfall ikke like svar', () => {
    const like = harLikeSvar(new Soknad(sok6), new Soknad(sendtArbeidsledig))
    expect(like).toBeFalsy()
})


test('Har et ulikt svar', () => {
    const soknad1 = new Soknad(sendtArbeidsledig)
    const soknad2 = new Soknad(sendtArbeidsledig)
    soknad2.sporsmal[0].svarliste.svar = []

    const like = harLikeSvar(soknad1, soknad2)
    expect(like).toBeFalsy()
})


test('Har et annet ulikt svar', () => {
    const soknad1 = new Soknad(sendtArbeidsledig)
    const soknad2 = new Soknad(sendtArbeidsledig)
    soknad2.sporsmal[0].svarliste.svar = [ { verdi: '42' } ]


    const like = harLikeSvar(soknad1, soknad2)
    expect(like).toBeFalsy()
})

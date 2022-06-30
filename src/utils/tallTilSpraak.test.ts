import { expect } from '@jest/globals'

import { tallTilSpråk } from './tallTilSpraak'

it('Språk er riktig', () => {
    expect(tallTilSpråk(-1)).toEqual('-1')
    expect(tallTilSpråk(0)).toEqual('0')
    expect(tallTilSpråk(1)).toEqual('en')
    expect(tallTilSpråk(2)).toEqual('to')
    expect(tallTilSpråk(3)).toEqual('tre')
    expect(tallTilSpråk(4)).toEqual('fire')
    expect(tallTilSpråk(5)).toEqual('fem')
    expect(tallTilSpråk(6)).toEqual('seks')
    expect(tallTilSpråk(7)).toEqual('sju')
    expect(tallTilSpråk(8)).toEqual('åtte')
    expect(tallTilSpråk(9)).toEqual('ni')
    expect(tallTilSpråk(10)).toEqual('ti')
    expect(tallTilSpråk(11)).toEqual('elleve')
    expect(tallTilSpråk(12)).toEqual('tolv')
    expect(tallTilSpråk(13)).toEqual('13')
    expect(tallTilSpråk(14)).toEqual('14')
})

export enum RSVisningskriterie {
    NEI = 'NEI',
    JA = 'JA',
    CHECKED = 'CHECKED',
}

export type RSVisningskriterieType = keyof typeof RSVisningskriterie

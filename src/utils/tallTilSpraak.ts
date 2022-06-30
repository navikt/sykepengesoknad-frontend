export const tallTilSpråk = (tall: number): string => {
    switch (tall) {
        case 1:
            return 'en'

        case 2:
            return 'to'

        case 3:
            return 'tre'

        case 4:
            return 'fire'

        case 5:
            return 'fem'

        case 6:
            return 'seks'

        case 7:
            return 'sju'

        case 8:
            return 'åtte'

        case 9:
            return 'ni'

        case 10:
            return 'ti'

        case 11:
            return 'elleve'

        case 12:
            return 'tolv'
    }

    return `${tall}`
}

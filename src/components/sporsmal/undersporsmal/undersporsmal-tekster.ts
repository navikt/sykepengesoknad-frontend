import { TagTyper } from '../../../types/enums'

export const tekstMap: { [key in TagTyper]?: string } = {
    [TagTyper.UTENLANDSK_SYKMELDING_BOSTED]: 'Oppgi utenlandsk kontaktadresse:',
    [TagTyper.MEDLEMSKAP_UTFORT_ARBEID_UTENFOR_NORGE]: 'Hvor og når har du utført arbeid i utlandet?',
    [TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_EOS]: 'Hvor og når har du oppholdt deg i utlandet?',
    [TagTyper.MEDLEMSKAP_OPPHOLD_UTENFOR_NORGE]: 'Hvor og når har du oppholdt deg utenfor Norge?',
}

export const undersporsmalTekster = {
    'undersporsmal.legg-til-ny-arbeidsgiver-land-og-periode': 'Legg til arbeid',
}

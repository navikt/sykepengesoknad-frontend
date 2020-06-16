import constate from 'constate'
import { useState } from 'react'

import { RSMottaker } from '../../types/rs-types/rs-mottaker'
import { Ettersend, Soknad, Sykmelding, UnleashToggles } from '../../types/types'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ unleash, setUnleash ] = useState<UnleashToggles>()
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>()
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ mottaker, setMottaker ] = useState<RSMottaker>()
    const [ top, setTop ] = useState<number>(0)
    const [ validCheck, setValidCheck ] = useState<boolean>()
    const [ feilmeldingTekst, setFeilmeldingTekst ] = useState<string>('')
    const [ rerenderSporsmalForm, setRerenderSporsmalForm ] = useState<number>(new Date().getUTCMilliseconds())
    const [ ettersend, setEttersend ] = useState<Ettersend>()

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        sykmeldinger, setSykmeldinger,
        valgtSykmelding, setValgtSykmelding,
        mottaker, setMottaker,
        top, setTop,
        validCheck, setValidCheck,
        feilmeldingTekst, setFeilmeldingTekst,
        rerenderSporsmalForm, setRerenderSporsmalForm,
        ettersend, setEttersend
    }
})

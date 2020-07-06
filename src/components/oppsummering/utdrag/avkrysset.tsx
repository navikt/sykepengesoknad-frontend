import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import CheckBoxImg from '../check-box-1.png'

interface AvkryssetProps {
    tekst: string;
}

const Avkrysset = ({ tekst }: AvkryssetProps) => {
    return (
        <div className="oppsummering__avkrysset">
            <img src={CheckBoxImg} alt="Avkrysset" />
            <Normaltekst>{tekst}</Normaltekst>
        </div>
    )
}

export default Avkrysset

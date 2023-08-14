export const inlineForklaringer = () => {
    cy.findByRole('button', { name: '16 kalenderdager' }).click()
    cy.findByRole('dialog', { name: 'Hvorfor går det et skille ved 16 dager?' })
        .should('contain', 'Hvorfor går det et skille ved 16 dager?')
        .and(
            'contain',
            'Arbeidsgiveren skal betale sykepenger i en periode på opptil 16 kalenderdager, også kalt arbeidsgiverperioden. ',
        )
        .findByRole('button', { name: 'Lukk' })
        .click()

    cy.findByRole('button', { name: 'inntektsmelding' }).click()
    cy.findByRole('dialog', { name: 'Hva er en inntektsmelding?' })
        .should('contain', 'Hva er en inntektsmelding')
        .findByRole('button', { name: 'Lukk' })
        .click()
}

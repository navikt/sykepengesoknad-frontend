import { BodyShort } from '@navikt/ds-react'
import React from 'react'

export const EndringSNHjelpBody = () => {
  return (
    <>
      <BodyShort>Endring av arbeidssituasjon eller virksomhet kan handle om at:</BodyShort>
      <BodyShort as="ul">
        <BodyShort as="li">tidligere virksomhet er lagt ned</BodyShort>
        <BodyShort as="li">det har vært en omlegging av virksomheten</BodyShort>
        <BodyShort as="li">den næringsdrivende har økt eller redusert arbeidsinnsatsen</BodyShort>
      </BodyShort>
    </>
  )
}

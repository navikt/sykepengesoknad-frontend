import { BodyLong, RadioGroup, Radio, ReadMore, BodyShort, HelpText, Heading, Modal } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Button, Popover } from '@navikt/ds-react'
import { useRef, useState } from 'react'

import { TagTyper } from '../../../types/enums'
import { getLedetekst, tekst } from '../../../utils/tekster'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import { utlandssoknadUrl } from '../../soknad/soknad-link'
import Vis from '../../vis'
import PaskeHjelpetekst from '../bendiksen/paske-hjelpetekst'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { hentFeilmelding, sporsmalIdListe } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

const JaNeiStor = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        clearErrors,
        watch,
        getValues,
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    let watchJaNei = watch(sporsmal.id)
    if (watchJaNei === undefined) {
        watchJaNei = getValues(sporsmal.id)
    }

    const valider = (value: any) => {
        if (value === 'JA' || value === 'NEI') {
            if (sporsmal.erHovedsporsmal) {
                clearErrors()
            } else {
                clearErrors(sporsmalIdListe(sporsmal.undersporsmal))
            }
            return true
        }
        return false
    }

    // interface HjelpetekstPopupProps {
    //     inlinetekst: React.ReactNode
    //     tittel: string
    //     children: React.ReactNode
    // }

    // const HjelpetekstModal = (props: HjelpetekstPopupProps) => {
    //     const { inlinetekst, tittel, children } = props
    //     const [open, setOpen] = useState(false)

    //     useEffect(() => {
    //         Modal.setAppElement('#__next')
    //     }, [])

    //     return (
    //         <>
    //             <a onClick={() => setOpen(true)} className="lenkeknapp">
    //                 {inlinetekst}
    //             </a>
    //             <Modal
    //                 open={open}
    //                 aria-label="Modal demo"
    //                 onClose={() => setOpen((x) => !x)}
    //                 aria-labelledby="modal-heading"
    //             >
    //                 <Modal.Content style={{ maxWidth: '360px' }}>
    //                     <Heading size="small" level="3" className="pb-4">
    //                         {tittel}
    //                     </Heading>
    //                     <BodyLong>{children}</BodyLong>
    //                     <div className="mt-4 flex justify-end">
    //                         <Button onClick={() => setOpen(false)}>OK</Button>
    //                     </div>
    //                 </Modal.Content>
    //             </Modal>
    //         </>
    //     )
    // }

    // const HjelpetekstPopup = (props: HjelpetekstPopupProps) => {
    //     const { inlinetekst, tittel, children } = props
    //     const buttonRef = useRef<HTMLAnchorElement>(null)
    //     const [openState, setOpenState] = useState(false)
    //     return (

    //         <>
    //             <a ref={buttonRef} onClick={() => setOpenState(true)} className="lenkeknapp">
    //                 {inlinetekst}
    //             </a>
    //             <Popover open={openState} onClose={() => setOpenState(false)} anchorEl={buttonRef.current}>

    //                 <Popover.Content                                                 className="w-48">
    //                     <Heading size="small" level="3" className='pb-4'>
    //                         {tittel}
    //                     </Heading>
    //                     <BodyLong>{children}</BodyLong>
    //                     <Button onClick={() => setOpenState(false)}>OK</Button>
    //                 </Popover.Content>
    //             </Popover>
    //         </>
    //     )
    // }
    return (
        <>
            <div className={'inputPanelGruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                <Controller
                    name={sporsmal.id}
                    rules={{ validate: (value) => valider(value), required: feilmelding.global }}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            legend={sporsmal.sporsmalstekst}
                            className="radioGruppe-jaNei"
                            key={sporsmal.id}
                        >
                            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

                            <PaskeHjelpetekst sporsmal={sporsmal} />

                            {/* <Vis
                                hvis={sporsmal.tag === TagTyper.ANDRE_INNTEKTSKILDER_V2}
                                render={() => (
                                    <ReadMore header="Hva betyr dette?" className="mt-4 mb-8 w-full">
                                        <BodyShort spacing>
                                            NAV trenger å vite om dine inntektskilder i sykmeldingsperioden for å kunne
                                            beregne riktig utbetaling av sykepenger til deg. Arbeidsforhold som er
                                            registrert på deg henter NAV fra offentlige registre.
                                        </BodyShort>
                                        <p className="pb-3">
                                            Svar ja hvis du har begynt i ny jobb,{' '}
                                            <HjelpetekstModal
                                                inlinetekst="jobbet frilans"
                                                tittel="Hva menes med
frilans?"
                                            >
                                                <BodyShort className="pb-3">
                                                    Du er frilanser når du mottar inntekt uten å være ansatt hos den du
                                                    utfører oppdraget for, eller har et enkeltpersonsforetak.
                                                </BodyShort>

                                                <BodyShort className="pb-3">
                                                    Eksempler på frilans inntekter kan være: Kommunal omsorgsstønad,
                                                    Fosterhjemsgodtgjørelse, Dagmamma, Styreverv.
                                                </BodyShort>
                                            </HjelpetekstModal>
                                            , eller mottatt annen{' '}
                                            <HjelpetekstModal
                                                inlinetekst="pensjonsgivende inntekt"
                                                tittel="Hva er pensjonsgivende inntekt?"
                                            >
                                                <BodyShort spacing>
                                                    Pensjonsgivende inntekt er som oftest inntekt du har mottatt for
                                                    arbeid du har utført og betalt skatt av.{' '}
                                                </BodyShort>
                                            </HjelpetekstModal>{' '}
                                            i sykemeldingsperioden som ikke har blitt registrert enda.
                                        </p>

                                        <BodyLong className="pb-3">
                                            <BodyShort className="pb-3"> Svar nei, hvis du mottar:</BodyShort>

                                            <ul className="pl-2">
                                                <li>
                                                    Stønader fra folketrygden (uføretrygd, foreldrepenger, AAP,
                                                    pleiepenger osv.)
                                                </li>
                                                <li>
                                                    Utbetalinger fra private eller offentlige forsikringsordninger (som
                                                    AFP).
                                                </li>
                                                <li>Inntekt fra salg av personlige gjenstander</li>
                                                <li>Lotterigevinster</li>
                                            </ul>
                                        </BodyLong>
                                    </ReadMore>
                                )}
                            /> */}

                            <EkspanderbarHjelp sporsmal={sporsmal} />

                            <Radio
                                id={field.name + '_' + '0'}
                                value="JA"
                                className={'radio-input' + (watchJaNei === 'JA' ? ' radio-checked' : '')}
                            >
                                Ja
                            </Radio>
                            <Radio
                                id={field.name + '_' + '1'}
                                value="NEI"
                                className={'radio-input' + (watchJaNei === 'NEI' ? ' radio-checked' : '')}
                            >
                                Nei
                            </Radio>
                        </RadioGroup>
                    )}
                />

                <Vis
                    hvis={sporsmal?.tag === TagTyper.UTLANDSOPPHOLD_SOKT_SYKEPENGER && watchJaNei}
                    render={() => (
                        <BodyLong spacing className="utland_infotekst">
                            {parserWithReplace(
                                getLedetekst(
                                    tekst(
                                        ('soknad.infotekst.utlandsopphold_sokt_sykepenger.' +
                                            watchJaNei?.toLowerCase()) as any,
                                    ),
                                    { '%URL%': utlandssoknadUrl },
                                ),
                            )}
                        </BodyLong>
                    )}
                />
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive">
                <AnimateOnMount
                    mounted={watchJaNei === sporsmal.kriterieForVisningAvUndersporsmal}
                    enter="undersporsmal--vis"
                    leave="undersporsmal--skjul"
                    start="undersporsmal"
                >
                    <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchJaNei} />
                </AnimateOnMount>
            </div>
        </>
    )
}

export default JaNeiStor

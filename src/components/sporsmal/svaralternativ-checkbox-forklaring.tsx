import {
    BodyShort,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    ExpansionCard,
    Radio,
    RadioGroup,
    useDatepicker,
} from '@navikt/ds-react'
import React, { Fragment, ReactElement, useState } from 'react'
// import format from 'date-fns/format'
// import nbLocale from 'date-fns/locale/nb'

import { TagTyper } from '../../types/enums'

type JobItemProps = {
    name: string
    index: number
    unknownJobs: boolean
}

import styles from './svaralternativ-checkbox-forklaring.module.css'

const JobItem: React.FunctionComponent<JobItemProps> = ({ name, index, unknownJobs }) => {
    // className="p-4 bg-gray-300 rounded shadow"

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        fromDate: new Date('Aug 23 2019'),
        onDateChange: console.log,
    })
    const handleChexboxChange = (val: any[]) => console.log(val)

    const [jobberDerFortsatt, setjobberDerFortsatt] = useState<string | null>(null)
    const [jobbetDerSiste14Dagene, setJobbetSiste14Dagene] = useState<string | null>(null)
    // Handle change function to update the selectedValue state
    const handleJobberDerFortsattChange = (val: string) => {
        setjobberDerFortsatt(val) // or val.target.value if the event object is passed
        setJobbetSiste14Dagene(null)
    }

    const handleJobbetSiste14Dagene = (val: string) => {
        setJobbetSiste14Dagene(val) // or val.target.value if the event object is passed
    }

    return (
        <li>
            <div className={styles.subtleCard} key={index}>
                <ExpansionCard aria-label="default-demo" defaultOpen={true}>
                    <div className={styles.headerStyling}>
                        <ExpansionCard.Header className="mb-4">
                            <ExpansionCard.Title>{name}</ExpansionCard.Title>
                        </ExpansionCard.Header>
                    </div>

                    <ExpansionCard.Content>
                        <Fragment>
                            <RadioGroup
                                legend={`Jobber du fortsatt ved ${name}?`}
                                onChange={(val: string) => handleJobberDerFortsattChange(val)}
                                className="mb-4"
                            >
                                <Radio value="JA">Ja</Radio>
                                <Radio value="NEI">Nei</Radio>
                            </RadioGroup>

                            {jobberDerFortsatt && jobberDerFortsatt === 'NEI' && (
                                <div className="min-h-96 mb-4">
                                    <DatePicker {...datepickerProps}>
                                        <DatePicker.Input {...inputProps} label="Når sluttet du?    " />
                                    </DatePicker>
                                </div>
                            )}

                            {jobberDerFortsatt && jobberDerFortsatt === 'JA' && (
                                <div className="mb-4">
                                    <RadioGroup
                                        legend={`Har du utført arbeid ved ${name} i minst én dag i perioden 5. september til 11. oktober?`}
                                        onChange={(val: string) => handleJobbetSiste14Dagene(val)}
                                    >
                                        <Radio value="JA">Ja</Radio>
                                        <Radio value="NEI">Nei</Radio>
                                    </RadioGroup>
                                </div>
                            )}

                            {jobbetDerSiste14Dagene && jobbetDerSiste14Dagene === 'NEI' && (
                                <CheckboxGroup
                                    legend="Velg en eller flere årsaker til at du ikke har jobbet"
                                    onChange={(val: any[]) => handleChexboxChange(val)}
                                    className="mt-4"
                                >
                                    <Checkbox value="SYKMELDT">Jeg var sykmeldt</Checkbox>
                                    <Checkbox value="TURNUS">Jeg jobber turnus</Checkbox>
                                    <Checkbox value="FERIE">Jeg hadde lovbestemt ferie</Checkbox>
                                    <Checkbox value="AVSPASERTE">Jeg avspaserte</Checkbox>
                                    <Checkbox value="PERMITTERT">Jeg var permittert</Checkbox>
                                    <Checkbox value="PERMISJON">Jeg hadde permisjon</Checkbox>
                                    <Checkbox value="ANNEN">Annen årsak</Checkbox>
                                </CheckboxGroup>
                            )}
                        </Fragment>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </div>
        </li>
    )
}

type Job = {
    name: string
}

interface JobListProps {
    jobs: Job[]
    unknownJobs: boolean
}

const JobList = ({ jobs, unknownJobs }: JobListProps) => {
    return (
        <ul className="space-y-4 list-none">
            {jobs.map((job, index) => (
                <JobItem key={index} name={job.name} index={index} unknownJobs={unknownJobs} />
            ))}
        </ul>
    )
}

export const OtherJobs = ({ jobsList, plusVisible, mainJob }: { jobsList: string[], plusVisible: boolean, mainJob: string }) => {
    const jobs = jobsList.map((job) => {
        return { name: job }
    })

    return (
        <div>
            <p className="mb-6 text-gray-700 ">
                Vi kan se at du i løpet av de siste månedene har hatt inntekt fra andre steder enn {mainJob}. Vi
                har noen spørsmål angående når og om du fortsatt jobber der.
            </p>

            <JobList jobs={jobs} unknownJobs={plusVisible} />

            {plusVisible && (
                <div className="mt-4">
                    <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                        + legg til en annen jobb
                    </button>
                </div>
            )}
        </div>
    )
}

export const SvaralternativCheckboxForklaring = ({
    svaralternativTag,
}: {
    svaralternativTag: TagTyper
}): ReactElement | null => {
    if (svaralternativTag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
        return (
            <BodyShort className="text-gray-700">
                Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko,
                leverer skattemelding for næringsdrivende, fakturerer kunder og (ofte) lever av overskuddet. Du er din
                egen sjef og ikke ansatt av andre i et arbeidsforhold.
            </BodyShort>
        )
    }

    if (svaralternativTag === TagTyper.INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD) {
        return (
            <BodyShort className="text-gray-700">
                Dette betyr at du er ansatt hos en eller flere arbeidsgiverne som ikke er kjent for oss enda og derfor
                ikke ligger i listen ovenfor.
            </BodyShort>
            // <div>
            //     <OtherJobs jobsList={['Annen jobb brukeren har lagt til, Bærum']} plusVisible={true} />
            // </div>
        )
    }

    return <Fragment />
}

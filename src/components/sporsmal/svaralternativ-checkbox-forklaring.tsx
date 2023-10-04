import { BodyShort, Checkbox, DatePicker, Panel, TextField, useDatepicker } from "@navikt/ds-react";
import React, { Fragment, ReactElement } from 'react'

import { TagTyper } from '../../types/enums'

type JobItemProps = {
    name: string
    index: number
    unknownJobs: boolean
}

const JobItem: React.FunctionComponent<JobItemProps> = ({ name, index , unknownJobs}) => {
    // className="p-4 bg-gray-300 rounded shadow"
      const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

    return (
        <li>
            <Panel border className="mb-4" key={index}>
                <span className="block font-semibold mb-2">{name}</span>
                {unknownJobs &&       <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Når startet du?    " />
      </DatePicker>
}
                <Checkbox value="ikke_jobbet_i_perioden">Jeg har ikke jobbet der i perioden</Checkbox>
                <Checkbox value="ikke_jobbet_i_perioden_sykmeldt">Jeg er sykmeldt</Checkbox>
                <Checkbox value="ikke_jobbet_i_perioden_sluttet">Jeg har sluttet</Checkbox>
                <Checkbox value="ikke_jobbet_i_perioden_sluttet">Jeg har ikke begynt enda</Checkbox>


                <TextField label="Timer jobbet i perioden:" placeholder="F.eks: 5 timer" />
                <TextField label="Lønn tjent perioden:" placeholder="F.eks: 12000 kr" />
            </Panel>
        </li>
    )
}

type Job = {
    name: string
}

interface JobListProps {
    jobs: Job[],
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

export const OtherJobs = ({ jobsList, plusVisible }: { jobsList: string[]; plusVisible: boolean }) => {
    const jobs = jobsList.map((job) => {
        return { name: job }
    })

    return (
        <div>
            <p className="mb-6 text-gray-700">
                Har du jobbet noe i andre arbeidsorhold i perioden 5 september til 11 oktober? Vi har lagt inn andre
                jobber du har vi kjenner til.
            </p>

            <JobList jobs={jobs} unknownJobs={plusVisible}/>

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
            // <BodyShort className="text-gray-700">
            //     Dette betyr at du er ansatt hos en eller flere arbeidsgiverne som ikke er kjent for oss enda og derfor
            //     ikke ligger i listen ovenfor.
            // </BodyShort>
            <div>
                <OtherJobs jobsList={['Annen jobb brukeren har lagt til, Bærum']} plusVisible={true} />
            </div>
        )
    }

    return <Fragment />
}

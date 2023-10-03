import { BodyShort } from '@navikt/ds-react'
import React, { Fragment, ReactElement } from 'react'

import { TagTyper } from '../../types/enums'

type JobItemProps = {
    name: string;
    index: number;
};

const JobItem: React.FunctionComponent<JobItemProps> = ({ name, index }) => {
    return (
        <li className="p-4 bg-gray-300 rounded shadow">
            <span className="block font-semibold mb-2">{name}</span>
            <div className="mb-2">
                <input type="checkbox" id={`ikkeJobbet${index}`} name={`ikkeJobbet${index}`} className="mr-2" />
                <label htmlFor={`ikkeJobbet${index}`} className="text-gray-600">ikke jobbet der i perioden</label>
            </div>
            <div className="mb-2">
                <label htmlFor={`timer${index}`} className="block text-gray-600">Timer jobbet:</label>
                <input type="text" id={`timer${index}`} name={`timer${index}`} placeholder="F.eks: 5 timer" className="p-2 mt-1 w-full border rounded" />
            </div>
            <div className="mb-2">
                <label htmlFor={`lønn${index}`} className="block text-gray-600">Lønn tjent:</label>
                <input type="text" id={`lønn${index}`} name={`lønn${index}`} placeholder="F.eks: 200 kr" className="p-2 mt-1 w-full border rounded" />
            </div>
        </li>
    );
}



type Job = {
    name: string;
};

interface JobListProps {
    jobs: Job[];
}

const JobList = ({ jobs }: JobListProps) => {
    return (
        <ul className="space-y-4 list-none">
            {jobs.map((job, index) => (
                <JobItem key={index} name={job.name} index={index} />
            ))}
            <li>
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500">+ legg til en annen jobb</button>
            </li>
        </ul>
    );
}

const OtherJobs = ({jobsList} : { jobsList : string[]}) => {
    const jobs = jobsList.map((job) => { return { name: job  }});


    return (
        <div>
            <p className="mb-6 text-gray-700">
                Har du jobbet noe i andre arbeidsorhold i perioden 5 september til 11 oktober? Vi har lagt inn andre jobber du har vi kjenner til.
            </p>


            <JobList jobs={jobs} />

            <div className="mt-4">
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                    + legg til en annen jobb
                </button>
            </div>
        </div>
    );
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

                <OtherJobs jobsList={["POSTEN AS, Bærum"]} />

                    </div>
        )
    }

    return <Fragment />
}

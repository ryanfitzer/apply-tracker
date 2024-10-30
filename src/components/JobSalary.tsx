import { JobSalaryType, JobType } from "../lib/types";
import { useMemo, useState } from "react";

interface JobSalaryInput {
    job: JobType;
}

const thing = {
    showMin: false,
    showMax: false,
    showTo: false
};

const JobSalary = ({ job }: JobSalaryInput) => {
    const [viewState, setViewState] = useState(thing);
    const minimumFractionDigits =
        job.jobSalaryType === JobSalaryType.HR ? 2 : 0;
    const jobAmountParser = (amount: number): string => {
        // Need to convert the string to a number first
        return (+amount).toLocaleString(navigator.language, {
            minimumFractionDigits,
            maximumFractionDigits: 2
        });
    };

    useMemo(() => {
        let newThing = { ...thing };
        if (job.jobSalaryMin > 0 && job.jobSalaryMax > 0) {
            newThing = {
                ...newThing,
                showTo: true
            };
        }

        if (job.jobSalaryMax > 0) {
            newThing = {
                ...newThing,
                showMax: true
            };
        }

        if (job.jobSalaryMin > 0) {
            newThing = {
                ...newThing,
                showMin: true
            };
        }

        setViewState(newThing);
    }, [setViewState, job.jobSalaryMax, job.jobSalaryMin]);

    return (
        <>
            {(viewState.showMax || viewState.showMin) && (
                <div>
                    <p>
                        {!viewState.showMax && viewState.showMin && (
                            <>Min&nbsp;</>
                        )}
                        {viewState.showMax && !viewState.showMin && (
                            <>Max&nbsp;</>
                        )}
                        {viewState.showMin && (
                            <span className="font-semibold">
                                ${jobAmountParser(job.jobSalaryMin)}
                            </span>
                        )}
                        {viewState.showTo && <span>&nbsp;-&nbsp;</span>}
                        {viewState.showMax && (
                            <span className="font-semibold">
                                ${jobAmountParser(job.jobSalaryMax)}
                            </span>
                        )}
                        &nbsp;
                        {job.jobSalaryType === JobSalaryType.YR
                            ? "a year"
                            : "an hour"}
                    </p>
                </div>
            )}
        </>
    );
};

export default JobSalary;

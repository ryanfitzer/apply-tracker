import { JobSalaryType, JobType } from "../lib/types";

interface JobSalaryInput {
    job: JobType;
}

const JobSalary = ({ job }: JobSalaryInput) => {
    const jobAmountParser = (amount: number): string => {
        // Need to convert the string to a number first
        return (+amount).toLocaleString(navigator.language, { maximumFractionDigits: 2 });
    };

    return (
        <>
            {
                job.jobSalaryMin && job.jobSalaryType && (
                    <div>
                        <p className="text-gray-400">
                            <span>${jobAmountParser(job.jobSalaryMin)}</span>
                            {job.jobSalaryMax && (
                                <span>&nbsp;-&nbsp;${jobAmountParser(job.jobSalaryMax)}</span>
                            )}
                            &nbsp;
                            {job.jobSalaryType === JobSalaryType.YR ? "a year" : "an hour"}
                        </p>
                    </div>
                )
            }
        </>
    );
};

export default JobSalary;
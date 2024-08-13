import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

import JobStatus from "./JobStatus";
import { JobType } from "../lib/types";
import { applicationsActions } from "../store/applications-slice";
import { uiActions } from "../store/ui-slice";
import { useAppDispatch } from "../hooks/hooks";

interface Thing {
    job: JobType;
    removeJob: (arg0: string) => void;
}

const Job = ({ job, removeJob }: Thing) => {
    const dispatch = useAppDispatch();
    const { jobId } = job;
    const removeJobClick = () => {
        removeJob(job.jobId);
    };
    const editJobClick = () => {
        dispatch(applicationsActions.setItemToEdit(jobId));
        dispatch(uiActions.toggleModal(true));
    };
    const dateFormatted = format(parseISO(job.jobApplyDate), "ddMMMyyyy");
    const relative = formatDistanceToNowStrict(job.jobApplyDate);

    return (
        <div
            className={`border-2 rounded-md p-2 ${job.jobStatus === "denied" ? "border-red-300 bg-red-50" : "border-sky-300"}`}
        >
            <div className="">
                <h2 className="text-xl font-bold">
                    {job.jobLink ? (
                        <a
                            href={job.jobLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {job.jobTitle}
                            <span className="align-super text-xs">
                                &#x1F517;
                            </span>
                        </a>
                    ) : (
                        job.jobTitle
                    )}
                </h2>
            </div>
            <div>
                <p>
                    {job.jobCompanyLink ? (
                        <a
                            href={job.jobCompanyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {job.jobCompany}
                            <span className="align-super text-xs">
                                &#x1F517;
                            </span>
                        </a>
                    ) : (
                        job.jobCompany
                    )}
                </p>
            </div>
            <div>
                <p className="text-gray-400">
                    Applied on {dateFormatted}, {relative} ago
                </p>
            </div>
            {job.jobSalary && job.jobSalaryType && (
                <div>
                    <p className="text-gray-400">
                        ${job.jobSalary}&nbsp;
                        {job.jobSalaryType === "yr" ? "a year" : "an hour"}
                    </p>
                </div>
            )}
            <div>
                <p className="font-bold">Status</p>
                <JobStatus job={job} />
            </div>
            <div className="flex justify-around border-t-2 border-solid mt-2 pt-2">
                <button
                    className="bg-slate-200 w-32 py-2 font-bold"
                    onClick={removeJobClick}
                >
                    Remove
                </button>
                <button
                    className="bg-blue-300 text-white w-32 py-2 font-bold"
                    onClick={editJobClick}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Job;

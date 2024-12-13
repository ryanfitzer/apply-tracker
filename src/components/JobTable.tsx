import { format, formatDistanceToNowStrict } from "date-fns";

import JobStatus from "./JobStatus";
import { JobType } from "../lib/types";
import { applicationsActions } from "../store/applications-slice";
import { uiActions } from "../store/ui-slice";
import { useAppDispatch } from "../hooks/hooks";

interface Thing {
    jobs: JobType[],
    removeJob: (arg0: string) => void;
}

const JobsTable = ({ jobs, removeJob }: Thing) => {
    const dispatch = useAppDispatch();
    const editJobClick = (jobId: string) => {
        dispatch(applicationsActions.setItemToEdit(jobId));
        dispatch(uiActions.toggleModal(true));
    };
    const getDateDisplay = (applyDate: string) => {
        const dateFormatted = format(new Date(applyDate), "ddMMMyyyy");
        const relative = formatDistanceToNowStrict(applyDate);

        return (
            <p>
                {dateFormatted}<br />{relative} ago
            </p>
        );
    };

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-left">Title</th>
                    <th className="text-left">Company</th>
                    <th className="text-left w-32">Applied</th>
                    <th className="text-left">Salary</th>
                    <th className="text-left">Status</th>
                    <th className="text-left"></th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => {
                    return (
                        <tr className="h-8" key={job.jobId}>
                            <td className="align-text-top">{job.jobTitle}</td>
                            <td className="align-text-top">{job.jobCompany}</td>
                            <td className="align-text-top">
                                {getDateDisplay(job.jobApplyDate)}
                            </td>
                            <td className="align-text-top">{job.jobSalary}</td>
                            <td className="align-text-top">
                                <JobStatus job={job} />
                            </td>
                            <td className="align-text-top">
                                <button
                                    className="bg-slate-200 w-32 py-2 font-bold"
                                    onClick={() => removeJob(job.jobId)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="bg-blue-600 text-white w-32 py-2 font-bold"
                                    onClick={() => editJobClick(job.jobId)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default JobsTable;

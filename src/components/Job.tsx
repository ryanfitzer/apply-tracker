import { JobStatusType, JobType } from "../lib/types";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

import JobSalary from "./JobSalary";
import JobStatus from "./JobStatus";
import { applicationsActions } from "../store/applications-slice";
import { uiActions } from "../store/ui-slice";
import { useAppDispatch } from "../hooks/hooks";
import { useTranslation } from "react-i18next";

interface Thing {
    job: JobType;
    removeJob: (arg0: string) => void;
}

const Job = ({ job, removeJob }: Thing) => {
    const { t } = useTranslation();
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
    const getColorList = (status: JobStatusType): string => {
        switch (status) {
            case JobStatusType.RECRUITER_CONTACTED:
                return "border-blue-100 bg-blue-100/30 border-dotted";
            case JobStatusType.DENIED:
                return "border-red-300 bg-red-300/30";
            case JobStatusType.INTERVIEWED:
                return "border-yellow-300 bg-yellow-100/30";
            case JobStatusType.ON_HOLD:
                return "border-orange-300 bg-orange-300/30";
            case JobStatusType.APPLIED:
            case JobStatusType.INTERVIEWED_SCHEDULED:
                return "border-sky-300 bg-sky-300/30";
            case JobStatusType.OFFERED:
                return "border-green-500 bg-green-500/30 ";
            default:
                return "border-gray-300";
        }
    };

    return (
        <div
            className={`border-4 rounded-md p-2 transition-all duration-500
                ${getColorList(job.jobStatus)}
            }`}
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
            <div className="opacity-60">
                <div>
                    <p>
                        Applied on {dateFormatted}, {relative} ago
                    </p>
                </div>
                <JobSalary job={job} />
            </div>
            {job.jobAppliedFrom && (
                <div className="opacity-60">
                    <p>
                        Applied through{": "}
                        {`${t(
                            `${"jobAppliedFrom"}.${[`${job.jobAppliedFrom}`]}`
                        )}`}
                    </p>
                </div>
            )}
            <div>
                <p className="font-bold">Status</p>
                <JobStatus job={job} />
            </div>
            <div className="flex justify-around border-t-2 border-dotted mt-2 pt-2 border-black">
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

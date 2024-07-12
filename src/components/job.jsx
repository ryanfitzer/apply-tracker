import JobStatus from "./JobStatus";
import Moment from "react-moment";

const Job = ({ job, removeJob, editJob, updateJobStatus }) => {
    const removeJobClick = () => {
        removeJob(job.jobId);
    };

    const editJobClick = () => {
        editJob(job.jobId);
    };

    const updateJobStatusClick = (event) => {
        updateJobStatus(job.jobId, event.target.value);
    };

    const jobStatusList = [
        {
            title: "Applied",
            status: "applied",
            color: "text-green-500"
        },
        {
            title: "Interviewed Scheduled",
            status: "interviewScheduled",
            color: "text-blue-400"
        },
        {
            title: "Interviewed",
            status: "interviewed",
            color: "text-blue-500"
        },
        {
            title: "On Hold",
            status: "onHold",
            color: "text-orange-400"
        },
        {
            title: "Denied",
            status: "denied",
            color: "text-red-400"
        }
    ];

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
                            rel="noreferrer"
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
                            rel="noreferrer"
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
                    Applied on&nbsp;
                    <Moment format="DD.MMM.YYYY">
                        {job.jobApplyDate}
                    </Moment>, <Moment fromNow>{job.jobApplyDate}</Moment>
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
                <JobStatus job={job} updateJobStatus={updateJobStatus} />
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

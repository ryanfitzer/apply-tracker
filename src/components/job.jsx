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
        <div className="border-2 border-sky-300 rounded-md p-2">
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
                <form>
                    {jobStatusList.map((status) => {
                        return (
                            <label key={status.status}>
                                <p
                                    className={`${job.jobStatus === status.status ? "font-bold " + status.color : "cursor-pointer"}`}
                                >
                                    {status.title}
                                </p>
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="jobStatus"
                                    value={status.status}
                                    checked={job.jobStatus === status.status}
                                    onClick={updateJobStatusClick}
                                />
                            </label>
                        );
                    })}
                </form>
            </div>
            <div>
                <button className="border-2 bac" onClick={removeJobClick}>
                    Remove
                </button>
                <button onClick={editJobClick}>Edit</button>
            </div>
        </div>
    );
};

export default Job;

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
        <div className="border-2 border-sky-300 rounded-sm p-2">
            <div className="">
                <p>Title</p>
                <p>{job.jobTitle}</p>
            </div>
            <div>
                <p>Company</p>
                <p>{job.jobCompany}</p>
            </div>
            <div>
                <p>Date Applied</p>
                <p>
                    <Moment format="DD.MMM.YYYY">{job.jobApplyDate}</Moment>
                    &nbsp;(<Moment fromNow>{job.jobApplyDate}</Moment>)
                </p>
            </div>
            <div>
                <p>Status</p>
                <form>
                    {jobStatusList.map((status) => {
                        return (
                            <label>
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

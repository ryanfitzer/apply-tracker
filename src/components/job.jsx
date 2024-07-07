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
                    <label>
                        Applied
                        <input
                            type="radio"
                            name="jobStatus"
                            value="applied"
                            checked={job.jobStatus === "applied"}
                            onClick={updateJobStatusClick}
                        />
                    </label>
                    <label>
                        Interview Scheduled
                        <input
                            type="radio"
                            name="jobStatus"
                            value="interviewScheduled"
                            checked={job.jobStatus === "interviewScheduled"}
                            onClick={updateJobStatusClick}
                        />
                    </label>
                    <label>
                        Interviewed
                        <input
                            type="radio"
                            name="jobStatus"
                            value="interviewed"
                            checked={job.jobStatus === "interviewed"}
                            onClick={updateJobStatusClick}
                        />
                    </label>
                    <label>
                        On Hold
                        <input
                            type="radio"
                            name="jobStatus"
                            value="onHold"
                            checked={job.jobStatus === "onHold"}
                            onClick={updateJobStatusClick}
                        />
                    </label>
                    <label>
                        Denied
                        <input
                            type="radio"
                            name="jobStatus"
                            value="denied"
                            checked={job.jobStatus === "denied"}
                            onClick={updateJobStatusClick}
                        />
                    </label>
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

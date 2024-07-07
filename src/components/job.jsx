import Moment from "react-moment";

const Job = ({ job, removeJob, editJob }) => {
    const removeJobClick = () => {
        removeJob(job.jobId);
    };

    const editJobClick = () => {
        editJob(job.jobId);
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
            {/* <div>
                <p>Status</p>
                <label>
                    Applied
                    <input type="radio" name="jobStatus" value="applied" />
                </label>
                <label>
                    Interviewed
                    <input type="radio" name="jobStatus" value="applied" />
                </label>
                <label>
                    On Hold
                    <input type="radio" name="jobStatus" value="applied" />
                </label>
                <label>
                    Denied
                    <input type="radio" name="jobStatus" value="applied" />
                </label>
            </div> */}
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

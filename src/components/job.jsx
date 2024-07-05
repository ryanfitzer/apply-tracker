const Job = ({ job, removeJob, editJob }) => {
    const removeJobClick = () => {
        removeJob(job.jobId);
    };

    const editJobClick = () => {
        editJob(job.jobId);
    };

    return (
        <>
            <div>{job.jobTitle}</div>
            <div>{job.jobCompany}</div>
            <div>{job.jobApplyDate}</div>
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
                <button onClick={removeJobClick}>Remove</button>
                <button onClick={editJobClick}>Edit</button>
            </div>
        </>
    );
};

export default Job;

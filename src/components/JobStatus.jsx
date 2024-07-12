const JobStatus = ({ job, updateJobStatus }) => {
    const jobStatusList = {
        applied: {
            title: "Applied",
            status: "applied",
            color: "text-green-500"
        },
        interviewScheduled: {
            title: "Interviewed Scheduled",
            status: "interviewScheduled",
            color: "text-blue-400"
        },
        interviewed: {
            title: "Interviewed",
            status: "interviewed",
            color: "text-blue-500"
        },
        onHold: {
            title: "On Hold",
            status: "onHold",
            color: "text-orange-400"
        },
        denied: {
            title: "Denied",
            status: "denied",
            color: "text-red-400"
        }
    };

    return (
        <>
            <select
                className={`${jobStatusList[job.jobStatus].color}`}
                id="jobStatus"
                name="jobStatus"
                value={job.jobStatus}
                onChange={(event) => {
                    updateJobStatus(job.jobId, event.target.value);
                }}
            >
                {Object.values(jobStatusList).map((status) => {
                    return (
                        <option
                            className="text-black"
                            key={status.status}
                            value={status.status}
                        >
                            {status.title}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default JobStatus;

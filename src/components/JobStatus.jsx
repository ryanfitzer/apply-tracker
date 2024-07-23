import { applicationsActions } from "../store/applications-slice";
import { useDispatch } from "react-redux";

const JobStatus = ({ job }) => {
    const dispatch = useDispatch();
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

    const updateJobStatus = (event) => {
        dispatch(
            applicationsActions.updateItemStatus({
                jobId: job.jobId,
                status: event.target.value
            })
        );
    };

    return (
        <>
            <select
                className={`${jobStatusList[job.jobStatus].color}`}
                id="jobStatus"
                name="jobStatus"
                value={job.jobStatus}
                onChange={updateJobStatus}
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

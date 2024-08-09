import { JobStatusType, JobType } from "../lib/types";

import { ChangeEvent } from "react";
import { applicationsActions } from "../store/applications-slice";
import { useAppDispatch } from "../hooks/hooks";

interface Thing {
    job: JobType;
}

interface JobStatusList {
    [key: string]: {
        title: string;
        status: JobStatusType,
        color: string;
    };
}

const JobStatus = ({ job }: Thing) => {
    const dispatch = useAppDispatch();
    const jobStatusList: JobStatusList = {
        applied: {
            title: "Applied",
            status: JobStatusType.APPLIED,
            color: "text-green-500"
        },
        interviewScheduled: {
            title: "Interviewed Scheduled",
            status: JobStatusType.INTERVIEWED_SCHEDULED,
            color: "text-blue-400"
        },
        interviewed: {
            title: "Interviewed",
            status: JobStatusType.INTERVIEWED,
            color: "text-blue-500"
        },
        onHold: {
            title: "On Hold",
            status: JobStatusType.ON_HOLD,
            color: "text-orange-400"
        },
        denied: {
            title: "Denied",
            status: JobStatusType.DENIED,
            color: "text-red-400"
        }
    };

    const updateJobStatus = (event: ChangeEvent<HTMLSelectElement>) => {
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

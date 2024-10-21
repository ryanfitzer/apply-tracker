import { JobStatusType, JobType } from "../lib/types";

import { ChangeEvent } from "react";
import { applicationsActions } from "../store/applications-slice";
import { useAppDispatch } from "../hooks/hooks";

interface JobStatusInput {
    job: JobType;
}

interface JobStatusList {
    [key: string]: {
        title: string;
        status: JobStatusType;
    };
}

const JobStatus = ({ job }: JobStatusInput) => {
    const dispatch = useAppDispatch();
    const jobStatusList: JobStatusList = {
        recruiterContacted: {
            title: "Recruiter Contacted",
            status: JobStatusType.RECRUITER_CONTACTED
        },
        applied: {
            title: "Applied",
            status: JobStatusType.APPLIED
        },
        interviewScheduled: {
            title: "Interviewed Scheduled",
            status: JobStatusType.INTERVIEWED_SCHEDULED
        },
        interviewed: {
            title: "Interviewed",
            status: JobStatusType.INTERVIEWED
        },
        offered: {
            title: "Offered",
            status: JobStatusType.OFFERED
        },
        onHold: {
            title: "On Hold",
            status: JobStatusType.ON_HOLD
        },
        denied: {
            title: "Rejected",
            status: JobStatusType.DENIED
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
                id="jobStatus"
                name="jobStatus"
                value={job.jobStatus}
                onChange={updateJobStatus}
                className="border-2 border-gray-500 rounded-md p-1"
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

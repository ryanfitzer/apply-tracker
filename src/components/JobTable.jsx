import JobStatus from "./JobStatus";
import Moment from "react-moment";

const JobsTable = ({ jobs, editJob, removeJob, updateJobStatus }) => {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-left">Title</th>
                    <th className="text-left">Company</th>
                    <th className="text-left w-32">Applied</th>
                    <th className="text-left">Salary</th>
                    <th className="text-left">Status</th>
                    <th className="text-left"></th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => {
                    return (
                        <tr className="h-8" key={job.jobId}>
                            <td className="align-text-top">{job.jobTitle}</td>
                            <td className="align-text-top">{job.jobCompany}</td>
                            <td className="align-text-top">
                                <p>
                                    <Moment format="DD.MMM.YYYY">
                                        {job.jobApplyDate}
                                    </Moment>
                                    <br />
                                    <Moment fromNow className="text-sm">
                                        {job.jobApplyDate}
                                    </Moment>
                                </p>
                            </td>
                            <td className="align-text-top">{job.jobSalary}</td>
                            <td className="align-text-top">
                                <JobStatus
                                    job={job}
                                    updateJobStatus={updateJobStatus}
                                />
                            </td>
                            <td className="align-text-top">
                                <button
                                    className="bg-slate-200 w-32 py-2 font-bold"
                                    onClick={() => removeJob(job.jobId)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="bg-blue-300 text-white w-32 py-2 font-bold"
                                    onClick={() => editJob(job.jobId)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default JobsTable;

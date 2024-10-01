import { ExternalLinkIcon, Pencil1Icon } from "@radix-ui/react-icons";

import AddJob from "./AddJob";
import DateFormatted from "./ui/DateFormatted";
import InterviewList from "./interviewList/edit-interview-list";
import JobSalary from "./JobSalary";
import JobStatus from "./JobStatus";
import { JobType } from "../lib/types";
import Link from "./ui/Link";
import Modal from "./Modal";
import { useState } from "react";

interface Thing {
    job: JobType;
    removeJob: (arg0: string) => void;
}

const Job = ({ job, removeJob }: Thing) => {
    const [editOpen, setEditIsOpen] = useState(false);
    const [interviewListOpen, setInterviewListOpen] = useState(false);
    const removeJobClick = () => {
        removeJob(job.jobId);
    };

    return (
        <div
            className={`rounded-md border-2 p-2 ${job.jobStatus === "denied" ? "border-red-300 bg-red-50" : "border-sky-300"}`}
        >
            <div className="">
                <h2 className="text-xl font-bold">
                    {job.jobLink ? (
                        <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            {job.jobTitle}
                            <span className="pl-1 align-super text-xs">
                                <ExternalLinkIcon />
                            </span>
                        </a>
                    ) : (
                        job.jobTitle
                    )}
                </h2>
            </div>
            <div>
                <p>{job.jobCompanyLink ? <Link text={job.jobCompany} link={job.jobCompanyLink} /> : job.jobCompany}</p>
            </div>
            <div>
                <p className="text-gray-400">
                    <DateFormatted date={job.jobApplyDate} dateType="Applied" showRelative={true} />
                </p>
            </div>
            <JobSalary job={job} />
            <div>
                <p className="font-bold">Status</p>
                <JobStatus job={job} />
            </div>
            <div>
                <Modal open={interviewListOpen} onOpenChange={setInterviewListOpen}>
                    <Modal.Button>
                        <Pencil1Icon />
                    </Modal.Button>
                    <Modal.Content title="Edit Interview List">
                        <InterviewList job={job} afterSave={() => setEditIsOpen(false)} />
                    </Modal.Content>
                </Modal>
            </div>
            <div className="mt-2 flex justify-around border-t-2 border-solid pt-2">
                <button className="w-32 bg-slate-200 py-2 font-bold" onClick={removeJobClick}>
                    Remove
                </button>
                <div>
                    <Modal open={editOpen} onOpenChange={setEditIsOpen}>
                        <Modal.Button>
                            <Pencil1Icon />
                        </Modal.Button>
                        <Modal.Content title="Edit Job">
                            <AddJob currentJob={job} afterSave={() => setEditIsOpen(false)} />
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Job;

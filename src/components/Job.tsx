import { ExternalLinkIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { JobStatusType, JobType } from "../lib/types";

import AddJob from "./AddJob";
import DateFormatted from "./ui/DateFormatted";
import InterviewList from "./interviewList/edit-interview-list";
import JobSalary from "./JobSalary";
import JobStatus from "./JobStatus";
import Link from "./ui/Link";
import Modal from "./Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Thing {
    job: JobType;
    removeJob: (arg0: string) => void;
}

const Job = ({ job, removeJob }: Thing) => {
    const { t } = useTranslation();
    const [editOpen, setEditIsOpen] = useState(false);
    const [interviewListOpen, setInterviewListOpen] = useState(false);
    const removeJobClick = () => {
        removeJob(job.jobId);
    };
    const getColorList = (status: JobStatusType): string => {
        switch (status) {
            case JobStatusType.RECRUITER_CONTACTED:
                return "border-blue-100 bg-blue-100/30 border-dotted";
            case JobStatusType.DENIED:
                return "border-red-300 bg-red-300/30";
            case JobStatusType.INTERVIEWED:
                return "border-yellow-300 bg-yellow-100/30";
            case JobStatusType.ON_HOLD:
                return "border-orange-300 bg-orange-300/30";
            case JobStatusType.APPLIED:
            case JobStatusType.INTERVIEWED_SCHEDULED:
                return "border-sky-300 bg-sky-300/30";
            case JobStatusType.OFFERED:
                return "border-green-500 bg-green-500/30 ";
            default:
                return "border-gray-300";
        }
    };

    return (
        <div
            className={`rounded-md border-4 p-2 transition-all duration-300 ease-out ${getColorList(job.jobStatus)} }`}
        >
            <div className="mb-2">
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
            <div className="mb-1">
                <p>{job.jobCompanyLink ? <Link text={job.jobCompany} link={job.jobCompanyLink} /> : job.jobCompany}</p>
            </div>
            <div className="opacity-60">
                <div className="mb-1">
                    <p>
                        <DateFormatted date={job.jobApplyDate} dateType="Applied" showRelative={true} />
                    </p>
                </div>
                <div className="mb-1">
                    <JobSalary job={job} />
                </div>
            </div>
            {job.jobAppliedFrom && (
                <div className="mb-2 opacity-60">
                    <p>
                        Applied through{": "}
                        {`${t(`${"jobAppliedFrom"}.${[`${job.jobAppliedFrom}`]}`)}`}
                    </p>
                </div>
            )}
            <div className="mb-2">
                <p className="font-bold">Status</p>
                <JobStatus job={job} />
            </div>
            <div>
                <Modal open={interviewListOpen} onOpenChange={setInterviewListOpen}>
                    <Modal.Button className="flex items-center gap-1">
                        Interviews ({job.interviews?.length || 0}) <Pencil1Icon />
                    </Modal.Button>
                    <Modal.Content title="Edit Interview List">
                        <InterviewList job={job} afterSave={() => setEditIsOpen(false)} />
                    </Modal.Content>
                </Modal>
            </div>
            <div className="mt-2 flex justify-around border-t-2 border-dotted border-black pt-2">
                <button className="w-32 bg-slate-200 py-2 font-bold" onClick={removeJobClick}>
                    Remove
                </button>
                <div>
                    <Modal open={editOpen} onOpenChange={setEditIsOpen}>
                        <Modal.Button>
                            <button className="w-32 bg-slate-200 py-2 font-bold">Edit</button>
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

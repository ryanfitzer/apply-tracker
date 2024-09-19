import * as Dialog from "@radix-ui/react-dialog";

import { Cross1Icon, ExternalLinkIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

import AddJob from "./AddJob";
import AddKey from "./add-key/AddKey";
import JobSalary from "./JobSalary";
import JobStatus from "./JobStatus";
import { JobType } from "../lib/types";
import Link from "./ui/Link";
import { useState } from "react";

interface Thing {
    job: JobType;
    removeJob: (arg0: string) => void;
}

const Job = ({ job, removeJob }: Thing) => {
    const [open, setIsOpen] = useState(false);

    const removeJobClick = () => {
        removeJob(job.jobId);
    };
    const dateFormatted = format(parseISO(job.jobApplyDate), "ddMMMyyyy");
    const relative = formatDistanceToNowStrict(job.jobApplyDate);

    return (
        <div
            className={`border-2 rounded-md p-2 ${job.jobStatus === "denied" ? "border-red-300 bg-red-50" : "border-sky-300"}`}
        >
            <div className="">
                <h2 className="text-xl font-bold">
                    {job.jobLink ? (
                        <a
                            href={job.jobLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {job.jobTitle}
                            <span className="align-super text-xs pl-1">
                                <ExternalLinkIcon />
                            </span>
                        </a>
                    ) : (
                        job.jobTitle
                    )}
                </h2>
            </div>
            <div>
                <p>
                    {job.jobCompanyLink ? (
                        <Link text={job.jobCompany} link={job.jobCompanyLink} />
                    ) : (
                        job.jobCompany
                    )}
                </p>
            </div>
            <div>
                <p className="text-gray-400">
                    Applied on {dateFormatted}, {relative} ago
                </p>
            </div>
            <JobSalary job={job} />
            <div>
                <p className="font-bold">Status</p>
                <JobStatus job={job} />
            </div>
            <div className="flex justify-around border-t-2 border-solid mt-2 pt-2">
                <button
                    className="bg-slate-200 w-32 py-2 font-bold"
                    onClick={removeJobClick}
                >
                    Remove
                </button>

                <div>
                    <AddKey open={open} onOpenChange={setIsOpen} >
                        <AddKey.Button>
                            <Pencil1Icon />
                        </AddKey.Button>
                        <AddKey.Content title="Edit Job">
                            <AddJob currentJob={job} afterSave={() => setIsOpen(false)} />
                        </AddKey.Content>
                    </AddKey>
                    {/* <Dialog.Root open={open} onOpenChange={setIsOpen}>
                        <Dialog.Trigger>
                            <Pencil1Icon />
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_300ms] data-[state=closed]:animate-[dialog-content-hide_300ms] bg-white fixed left-1/2 top-1/2 shadow-md rounded-md p-3 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex justify-between items-center mb-3">
                                    <Dialog.Title className=" size text-lg">fasdfa</Dialog.Title>
                                    <Dialog.Close>
                                        <Cross1Icon className="text-gray-600 hover:text-gray-300" />
                                    </Dialog.Close>
                                </div>

                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root> */}
                </div>
            </div>
        </div>
    );
};

export default Job;

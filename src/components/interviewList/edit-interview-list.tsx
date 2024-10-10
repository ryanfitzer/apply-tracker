import * as Checkbox from "@radix-ui/react-checkbox";

import { FormEvent, useRef, useState } from "react";
import { Interview, JobType } from "../../lib/types";
import TagInput, { TagInputComponent } from "../ui/TagInput";

import { CheckIcon } from "@radix-ui/react-icons";
import DateFormatted from "../ui/DateFormatted";
import { applicationsActions } from "../../store/applications-slice";
import { useAppDispatch } from "../../hooks/hooks";
import uuid from "react-uuid";

const InterviewList = ({ job, afterSave }: { job: JobType; afterSave: (arg0: boolean) => void }) => {
    const dispatch = useAppDispatch();
    const interviewListRef = useRef<TagInputComponent>(null);
    const typeListRef = useRef<TagInputComponent>(null);
    const [saving, setIsSaving] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
    const saveInterview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);
        const interviewerList = interviewListRef && interviewListRef.current ? interviewListRef.current.getTags() : [];
        const newInterview = {
            ...Object.fromEntries(new FormData(event.currentTarget)),
            interviewerList,
            interviewId: uuid()
        } as Interview;
        const newJob = { ...job } as JobType;
        newJob.interviews = [...(newJob.interviews || []), newInterview] as Interview[];
        dispatch(applicationsActions.updateInterviewList(newJob));
        afterSave(true);
        setIsSaving(false);
    };
    const editJob = (interview: Interview) => () => {
        console.log(interview);
        setSelectedInterview(interview);
    };

    return (
        <>
            <p>Interview List</p>
            <ul>
                {job.interviews?.map((interview) => {
                    return (
                        <div key={interview.interviewId} onClick={editJob(interview)}>
                            <li>
                                <p>
                                    <DateFormatted date={interview.date} dateType="Interviewed" />
                                </p>
                            </li>
                            <ul className="mb-2 flex gap-4">
                                {interview.interviewerList?.map((interviewer, index) => {
                                    return (
                                        <li
                                            className="max-w-[200px] rounded-md bg-[#63bcfd] px-3 py-[5px] text-[12px] text-white"
                                            key={`${interviewer}-${index}`}
                                        >
                                            {interviewer}
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul className="flex gap-4">
                                {interview.typeList?.map((type, index) => {
                                    return (
                                        <li
                                            className="max-w-[200px] rounded-md bg-[#63bcfd] px-3 py-[5px] text-[12px] text-white"
                                            key={`${type}-${index}`}
                                        >
                                            {type}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
                {!job.interviews?.length && <>No Interviews Yet</>}
            </ul>
            <form onSubmit={saveInterview}>
                <fieldset disabled={saving} className="disabled:pointer-events-none disabled:opacity-50">
                    <label htmlFor="interviewDate" className="mb-2 block">
                        <p>Date</p>
                        <input
                            className="w-full border-2 px-2"
                            type="date"
                            name="date"
                            id="interviewDate"
                            data-testid="jobApplyDate"
                            value={selectedInterview?.date || new Date().toISOString().split("T")[0]}
                            onChange={() => {}}
                            required
                        />
                    </label>
                    <label htmlFor="isRecruiter" className="block cursor-pointer">
                        <>Is Recruiter</>
                        <Checkbox.Root className="CheckboxRoot" id="isRecruiter">
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                    </label>
                    <label htmlFor="isFinal" className="block cursor-pointer">
                        <>Is Final</>
                        <Checkbox.Root className="CheckboxRoot" id="isFinal">
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                    </label>
                    <label>
                        <>Interviewer(s)</>
                        <TagInput ref={interviewListRef} defaultList={selectedInterview?.interviewerList || []} />
                    </label>
                    <label>
                        <>Type(s)</>
                        <TagInput
                            ref={typeListRef}
                            defaultList={selectedInterview?.typeList || []}
                            suggestions={[
                                {
                                    id: "phone",
                                    text: "Phone",
                                    className: ""
                                }
                            ]}
                        />
                    </label>
                </fieldset>
                <button className="mt-3">Add</button>
            </form>
        </>
    );
};

export default InterviewList;

import * as Checkbox from "@radix-ui/react-checkbox";

import { FormEvent, useRef, useState } from "react";
import { Interview, JobType } from "../../lib/types";
import TagInput, { TagInputComponent } from "../ui/TagInput";

import { CheckIcon } from "@radix-ui/react-icons";
import InterviewListDisplay from "./interview-list";
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
        newJob.interviewList = [...(newJob.interviewList || []), newInterview] as Interview[];
        dispatch(applicationsActions.updateInterviewList(newJob));
        afterSave(true);
        setIsSaving(false);
    };
    const editInterview = (interview: Interview) => () => {
        console.log(interview);
        setSelectedInterview(interview);
    };

    return (
        <>
            <InterviewListDisplay interviews={job.interviewList} />
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

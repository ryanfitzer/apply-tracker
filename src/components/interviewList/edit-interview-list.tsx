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
        const typeList = typeListRef && typeListRef.current ? typeListRef.current.getTags() : [];
        const interview = {
            ...Object.fromEntries(new FormData(event.currentTarget)),
            interviewerList,
            typeList,
            interviewId: selectedInterview?.interviewId || uuid()
        } as Interview;
        const newJob = { ...job } as JobType;

        if (selectedInterview) {
            const index = newJob.interviewList?.findIndex(
                (interview) => interview.interviewId === selectedInterview.interviewId
            );

            if (index !== undefined && index !== null && index !== -1) {
                const blah = [...newJob.interviewList];
                blah[index] = interview;

                newJob.interviewList = blah;
            }
        } else {
            newJob.interviewList = [...(newJob.interviewList || []), interview] as Interview[];
        }
        dispatch(applicationsActions.updateInterviewList(newJob));
        event.currentTarget.reset();
        afterSave(false);
        setIsSaving(false);
    };
    const editInterview = (interview: Interview) => () => {
        setSelectedInterview(interview);
    };
    const deleteInterview = (interview: Interview) => () => {
        setIsSaving(true);
        const newJob = { ...job } as JobType;
        newJob.interviewList = newJob.interviewList?.filter((i) => i.interviewId !== interview.interviewId);
        dispatch(applicationsActions.updateInterviewList(newJob));
        setIsSaving(false);
    };

    return (
        <>
            <InterviewListDisplay
                interviews={job.interviewList}
                editInterview={editInterview}
                deleteInterview={deleteInterview}
            />
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
                            defaultValue={selectedInterview?.date || new Date().toISOString().split("T")[0]}
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
                <button className="mt-3" type="submit">
                    {selectedInterview ? "Save" : "Add"}
                </button>
            </form>
        </>
    );
};

export default InterviewList;

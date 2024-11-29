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
    const currentDateParsed: string = new Date().toISOString().split("T")[0];
    const [checked, setChecked] = useState({});
    const dispatch = useAppDispatch();
    const interviewListRef = useRef<TagInputComponent>(null);
    const typeListRef = useRef<TagInputComponent>(null);
    const [saving, setIsSaving] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
    const [interviewDate, setInterviewDate] = useState(currentDateParsed);
    const saveInterview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSaving(true);
        const stuff = Object.fromEntries(new FormData(event.currentTarget));
        const interviewerList = interviewListRef && interviewListRef.current ? interviewListRef.current.getTags() : [];
        const typeList = typeListRef && typeListRef.current ? typeListRef.current.getTags() : [];
        const interview: Interview = {
            final: stuff.final ? true : false,
            date: stuff.date as string,
            recruiter: stuff.recruiter ? true : false,
            interviewerList,
            typeList,
            interviewId: selectedInterview?.interviewId || uuid()
        };
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
        clear();
        setIsSaving(false);
    };
    const editInterview = (interview: Interview) => () => {
        setChecked({
            isRecruiter: interview.recruiter,
            isFinal: interview.final
        });
        setInterviewDate(interview.date);
        setSelectedInterview(interview);
    };
    const deleteInterview = (interview: Interview) => () => {
        setIsSaving(true);
        const newJob = { ...job } as JobType;
        newJob.interviewList = newJob.interviewList?.filter((i) => i.interviewId !== interview.interviewId);
        dispatch(applicationsActions.updateInterviewList(newJob));
        setIsSaving(false);
    };

    const clear = () => {
        interviewListRef?.current?.resetTags();
        typeListRef?.current?.resetTags();
        setSelectedInterview(null);
        setInterviewDate(currentDateParsed);
        setChecked({});
    };

    const setCheckbox = (id: string, value: boolean) => {
        setChecked({ ...checked, [id]: value });
    };

    return (
        <div className="flex">
            <form onSubmit={saveInterview} className="w-80">
                <fieldset disabled={saving} className="disabled:pointer-events-none disabled:opacity-50">
                    <label htmlFor="interviewDate" className="mb-2 block">
                        <p>Date*</p>
                        <input
                            className="w-full border-2 px-2"
                            type="date"
                            name="date"
                            id="date"
                            data-testid="date"
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="isRecruiter" className="block cursor-pointer">
                        <>Is Recruiter</>
                        <Checkbox.Root
                            className="CheckboxRoot"
                            id="isRecruiter"
                            name="recruiter"
                            checked={checked?.isRecruiter}
                            onCheckedChange={(value) => {
                                setCheckbox("isRecruiter", value);
                            }}
                        >
                            <Checkbox.Indicator className="CheckboxIndicator">
                                <CheckIcon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                    </label>
                    <label htmlFor="isFinal" className="block cursor-pointer">
                        <>Is Final</>
                        <Checkbox.Root
                            className="CheckboxRoot"
                            id="isFinal"
                            name="final"
                            checked={checked?.isFinal}
                            onCheckedChange={(value) => {
                                setCheckbox("isFinal", value);
                            }}
                        >
                            <Checkbox.Indicator className="CheckboxIndicator">
                                {!checked && ""}
                                {checked && <CheckIcon />}
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
                <button className="mt-3" type="reset" onClick={clear}>
                    Clear
                </button>
                <button className="mt-3" type="submit">
                    {selectedInterview ? "Save" : "Add"}
                </button>
            </form>
            <InterviewListDisplay
                interviews={job.interviewList}
                editInterview={editInterview}
                deleteInterview={deleteInterview}
            />
        </div>
    );
};

export default InterviewList;

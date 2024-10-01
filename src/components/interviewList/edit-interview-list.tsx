import * as Checkbox from "@radix-ui/react-checkbox";

import { FormEvent, useRef, useState } from "react";
import { Interview, JobType } from "../../lib/types";
import TagInput, { TagInputComponent } from "../ui/TagInput";

import { CheckIcon } from "@radix-ui/react-icons";
import DateFormatted from "../ui/DateFormatted";
import { applicationsActions } from "../../store/applications-slice";
import { useAppDispatch } from "../../hooks/hooks";

const InterviewList = ({ job, afterSave }: { job: JobType; afterSave: (arg0: boolean) => void }) => {
    const dispatch = useAppDispatch();
    const interviewListRef = useRef<TagInputComponent>(null);
    const [saving, setIsSaving] = useState(false);

    const saveInterview = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSaving(true);

        const newInterview = Object.fromEntries(new FormData(event.currentTarget)) as object;
        const interviewerList = interviewListRef && interviewListRef.current ? interviewListRef.current.getTags() : [];
        const newJob = { ...job } as JobType;
        newJob.interviews = [
            ...(newJob.interviews || []),
            {
                ...newInterview,
                interviewerList: [...interviewerList]
            }
        ] as Interview[];
        dispatch(applicationsActions.updateInterviewList(newJob));
        afterSave(true);
        setIsSaving(false);
    };

    return (
        <>
            <p>Interview List</p>
            <ul>
                {job.interviews?.map((interview) => {
                    return (
                        <div key={interview.date}>
                            <li>
                                <p>
                                    <DateFormatted date={interview.date} dateType="Interviewed" />
                                </p>
                            </li>
                            <ul>
                                {interview.interviewerList?.map((interviewer, index) => {
                                    return <li key={`${interviewer}-${index}`}>{interviewer}</li>;
                                })}
                            </ul>
                            <ul>
                                {interview.typeList?.map((type) => {
                                    return <li key={type}>{type}</li>;
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
                        <TagInput ref={interviewListRef} defaultList={[]} />
                    </label>
                </fieldset>
                <button className="mt-3">Add</button>
            </form>
        </>
    );
};

export default InterviewList;

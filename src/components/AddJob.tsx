import { AppListState, JobStatusType, JobType } from "../lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { applicationsActions } from "../store/applications-slice";
import { uiActions } from "../store/ui-slice";
import uuid from "react-uuid";

const defaultJob = {
    jobTitle: "",
    jobCompany: "",
    jobApplyDate: "",
    jobCompanyLink: "",
    jobLink: "",
    jobSalary: "",
    jobSalaryType: "",
    jobStatus: "",
    jobId: ""
};

const AddJob = () => {
    const dispatch = useDispatch();
    const currentDate: Date = new Date();
    const currentDateParsed: string = currentDate.toISOString().split("T")[0];

    const [formData, setFormData] = useState(defaultJob);
    const applicationItems = useSelector((state: AppListState) => state.appList);

    useEffect(() => {
        if (applicationItems.editingJob) {
            const currentJob: JobType =
                applicationItems.items[applicationItems.editingJob];

            setFormData({
                jobTitle: currentJob.jobTitle,
                jobCompany: currentJob.jobCompany,
                jobApplyDate: currentJob.jobApplyDate,
                jobCompanyLink: currentJob.jobCompanyLink,
                jobLink: currentJob.jobLink,
                jobSalary: currentJob.jobSalary,
                jobSalaryType: currentJob.jobSalaryType,
                jobId: currentJob.jobId,
                jobStatus: currentJob.jobStatus
            });
        }
    }, [applicationItems]);

    const submitJob = (event) => {
        event.preventDefault();
        const newJob = { ...formData };

        if (!applicationItems.editingJob) {
            newJob.jobStatus = JobStatusType.APPLIED;
            newJob.jobId = uuid();
        } else {
            const currentJob =
                applicationItems.items[applicationItems.editingJob];
            newJob.jobStatus = currentJob.jobStatus;
            newJob.jobId = currentJob.jobId;
        }

        dispatch(applicationsActions.addItem(newJob as JobType));
        dispatch(applicationsActions.clearEditingJob());
        dispatch(uiActions.toggleModal(false));
        setFormData(defaultJob);
    };

    const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {
            target: { id, value }
        } = event;

        setFormData((prevValue) => {
            return {
                ...prevValue,
                [id]: value
            };
        });
    };

    const clearForm = () => {
        setFormData(defaultJob);
    };

    return (
        <form onSubmit={submitJob} id="jobForm" className="w-96">
            <label htmlFor="jobTitle" className="mb-2 block">
                <p>Job Title*</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={updateField}
                    required
                />
            </label>
            <label htmlFor="jobLink" className="mb-2 block">
                <p>Job Link</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobLink"
                    id="jobLink"
                    value={formData.jobLink}
                    onChange={updateField}
                />
            </label>
            <label htmlFor="jobCompany" className="mb-2 block">
                <p>Company*</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobCompany"
                    id="jobCompany"
                    value={formData.jobCompany}
                    onChange={updateField}
                    required
                />
            </label>
            <label htmlFor="jobCompanyLink" className="mb-2 block">
                <p>Company Link</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobCompanyLink"
                    id="jobCompanyLink"
                    value={formData.jobCompanyLink}
                    onChange={updateField}
                />
            </label>
            <label htmlFor="jobApplyDate" className="mb-2 block">
                <p>Data Applied*</p>
                <input
                    className="w-full border-2 px-2"
                    type="date"
                    name="jobApplyDate"
                    id="jobApplyDate"
                    value={formData.jobApplyDate || currentDateParsed}
                    onChange={updateField}
                    max={currentDateParsed}
                    required
                />
            </label>
            <div className="flex w-full justify-between gap-4">
                <label htmlFor="jobSalary" className="w-full">
                    <p>Salary</p>
                    <input
                        className="w-full border-2 px-2"
                        type="text"
                        name="jobSalary"
                        id="jobSalary"
                        value={formData.jobSalary}
                        onChange={updateField}
                    />
                </label>
                <label htmlFor="jobSalaryType" className="flex-shrink-0 w-24">
                    <p>Salary Type</p>
                    <select
                        className="w-full border-2 px-2"
                        name="jobSalaryType"
                        id="jobSalaryType"
                        onChange={updateField}
                        value={formData.jobSalaryType}
                    >
                        <option value="yr">Yearly</option>
                        <option value="hr">Hourly</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-around border-t-2 py-2 mt-4">
                <button
                    className="bg-slate-200 w-32 py-2 font-bold"
                    type="button"
                    onClick={clearForm}
                >
                    Clear
                </button>
                <button className="bg-blue-300 text-white w-32 py-2 font-bold">
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddJob;

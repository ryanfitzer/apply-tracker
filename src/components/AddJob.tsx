import { ChangeEvent, useEffect, useState } from "react";
import { JobSalaryType, JobStatusType, JobType } from "../lib/types";
import { applicationsActions, selectApplicationEditing, selectApplicationItems } from "../store/applications-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

import { uiActions } from "../store/ui-slice";
import { useTranslation } from "react-i18next";
import uuid from "react-uuid";

const defaultJob = {
    jobTitle: "",
    jobCompany: "",
    jobApplyDate: "",
    jobCompanyLink: "",
    jobLink: "",
    jobSalaryMin: 0,
    jobSalaryMax: 0,
    jobSalaryType: "",
    jobStatus: "",
    jobId: ""
};

const AddJob = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(defaultJob);
    const applicationItems = useAppSelector(selectApplicationItems);
    const editingJob = useAppSelector(selectApplicationEditing);
    const currentDate: Date = new Date();
    const currentDateParsed: string = currentDate.toISOString().split("T")[0];

    useEffect(() => {
        if (editingJob) {
            const currentJob: JobType =
                applicationItems[editingJob];

            setFormData({
                jobTitle: currentJob.jobTitle,
                jobCompany: currentJob.jobCompany,
                jobApplyDate: currentJob.jobApplyDate,
                jobCompanyLink: currentJob.jobCompanyLink,
                jobLink: currentJob.jobLink,
                jobSalaryMin: currentJob.jobSalaryMin,
                jobSalaryMax: currentJob.jobSalaryMax,
                jobSalaryType: currentJob.jobSalaryType,
                jobId: currentJob.jobId,
                jobStatus: currentJob.jobStatus
            });
        } else {
            const newDefaultJob = {
                ...defaultJob,
                jobApplyDate: currentDateParsed,
                jobSalaryType: "yr",
            };
            setFormData(newDefaultJob);
        }
    }, [applicationItems, editingJob, currentDateParsed]);

    const submitJob = (event) => {
        event.preventDefault();
        const newJob = { ...formData };

        if (!editingJob) {
            newJob.jobStatus = JobStatusType.APPLIED;
            newJob.jobId = uuid();
        } else {
            const currentJob =
                applicationItems[editingJob];
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
                <p>{t("jobTitle")}*</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={updateField}
                    data-testid="jobTitle"
                    required
                />
            </label>
            <label htmlFor="jobLink" className="mb-2 block">
                <p>{t("jobLink")}</p>
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
                <p>{t("jobCompany")}*</p>
                <input
                    className="w-full border-2 px-2"
                    type="text"
                    name="jobCompany"
                    id="jobCompany"
                    value={formData.jobCompany}
                    onChange={updateField}
                    data-testid="jobCompany"
                    required
                />
            </label>
            <label htmlFor="jobCompanyLink" className="mb-2 block">
                <p>{t("jobCompanyLink")}</p>
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
                <p>{t("jobApplyDate")}*</p>
                <input
                    className="w-full border-2 px-2"
                    type="date"
                    name="jobApplyDate"
                    id="jobApplyDate"
                    value={formData.jobApplyDate}
                    onChange={updateField}
                    max={currentDateParsed}
                    data-testid="jobApplyDate"
                    required
                />
            </label>
            <div className="flex w-full justify-between gap-4">
                <label htmlFor="jobSalaryMin" className="w-full">
                    <p>{t("jobSalaryMin")}</p>
                    <input
                        className="w-full border-2 px-2"
                        type="number"
                        name="jobSalaryMin"
                        id="jobSalaryMin"
                        value={formData.jobSalaryMin}
                        onChange={updateField}
                        data-testid="jobSalaryMin"
                        placeholder="Min"
                    />
                </label>
                <label htmlFor="jobSalaryMax" className="w-full">
                    <p>{t("jobSalaryMax")}</p>
                    <input
                        className="w-full border-2 px-2"
                        type="number"
                        name="jobSalaryMax"
                        id="jobSalaryMax"
                        value={formData.jobSalaryMax}
                        onChange={updateField}
                        data-testid="jobSalaryMax"
                        placeholder="Max"
                    />
                </label>
                <label htmlFor="jobSalaryType" className="flex-shrink-0 w-24">
                    <p>{t("jobSalaryType")}</p>
                    <select
                        className="w-full border-2 px-2"
                        name="jobSalaryType"
                        id="jobSalaryType"
                        onChange={updateField}
                        value={formData.jobSalaryType}
                        data-testid="jobSalaryType"
                    >
                        <option value={JobSalaryType.YR}>Yearly</option>
                        <option value={JobSalaryType.HR}>Hourly</option>
                    </select>
                </label>
            </div>
            <div className="flex justify-around border-t-2 py-2 mt-4">
                <button
                    className="bg-slate-200 w-32 py-2 font-bold"
                    type="button"
                    onClick={clearForm}
                    data-testid="buttonClear"
                >
                    Clear
                </button>
                <button data-testid="buttonSubmit" className="bg-blue-300 text-white w-32 py-2 font-bold">
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddJob;

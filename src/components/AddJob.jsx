import { useEffect, useState } from "react";

import uuid from "react-uuid";

const defaultJob = {
    jobTitle: "",
    jobCompany: "",
    jobApplyDate: "",
    jobCompanyLink: "",
    jobLink: ""
};

const AddJob = ({ addJob, saveJob, currentJob, clearCurrentJob }) => {
    let currentDate = new Date();
    currentDate = currentDate.toISOString().split("T")[0];

    const [formData, setFormData] = useState(defaultJob);

    useEffect(() => {
        if (currentJob) {
            setFormData({
                jobTitle: currentJob.jobTitle,
                jobCompany: currentJob.jobCompany,
                jobApplyDate: currentJob.jobApplyDate,
                jobCompanyLink: currentJob.jobCompanyLink,
                jobLink: currentJob.jobLink
            });
        }
    }, [currentJob]);

    const submitJob = (event) => {
        event.preventDefault();
        const newJob = { ...formData };

        if (!currentJob) {
            newJob.jobStatus = "applied";
            newJob.jobId = uuid();
            addJob(newJob);
        } else {
            newJob.jobStatus = currentJob.jobStatus;
            newJob.jobId = currentJob.jobId;
            console.log(newJob);
            saveJob(newJob);
        }

        setFormData(defaultJob);
    };

    const updateField = (event) => {
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
        clearCurrentJob();
    };

    return (
        <form onSubmit={submitJob} id="jobForm">
            <label htmlFor="jobTitle">
                <p>Job Title*</p>
                <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={updateField}
                    required
                />
            </label>
            <label htmlFor="jobLink">
                <p>Job Link</p>
                <input
                    type="text"
                    name="jobLink"
                    id="jobLink"
                    value={formData.jobLink}
                    onChange={updateField}
                />
            </label>
            <label htmlFor="jobCompany">
                <p>Company*</p>
                <input
                    type="text"
                    name="jobCompany"
                    id="jobCompany"
                    value={formData.jobCompany}
                    onChange={updateField}
                    required
                />
            </label>
            <label htmlFor="jobCompanyLink">
                <p>Company Link</p>
                <input
                    type="text"
                    name="jobCompanyLink"
                    id="jobCompanyLink"
                    value={formData.jobCompanyLink}
                    onChange={updateField}
                />
            </label>
            <label htmlFor="jobApplyDate">
                <p>Data Applied*</p>
                <input
                    type="date"
                    name="jobApplyDate"
                    id="jobApplyDate"
                    value={formData.jobApplyDate}
                    onChange={updateField}
                    max={currentDate}
                    required
                />
            </label>
            <div>
                <button type="button" onClick={clearForm}>
                    Clear
                </button>
                <button>{currentJob ? "Save" : "Add"}</button>
            </div>
        </form>
    );
};

export default AddJob;

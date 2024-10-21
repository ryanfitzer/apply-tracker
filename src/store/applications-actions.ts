import { AppListSort, JobType } from "../lib/types";

import { AppDispatch } from "../store";
import { applicationsActions } from "./applications-slice";
import gistFetch from "../lib/gist-fetch";
import uuid from "react-uuid";

interface AppListTypeSave {
    sort: AppListSort;
    viewAs: string;
    items: JobType[];
}

export const fetchBootStrapData = () => {
    return async (dispatch: AppDispatch) => {
        const localStorageTracker = localStorage.getItem(
            "applyTrackerData"
        ) as string;

        if (localStorageTracker) {
            const parsed = JSON.parse(localStorageTracker);
            return dispatch(
                applicationsActions.addBootStrapData({
                    gistId: parsed.gistId,
                    accessToken: parsed.accessToken
                })
            );
        }

        return false;
    };
};

export const fetchApplicationData = (isDemo: boolean = false) => {
    return async (dispatch: AppDispatch, getState) => {
        let localStorageTracker: string = "";

        // This is not conventional, but because this should be stored
        // I'm using getState to grab the items to avoid pulling from
        // local store all the time.
        const access_token = getState().appList.accessToken;
        const gist_id = getState().appList.gistId;

        if (!isDemo) {
            const response = await gistFetch(gist_id, access_token, "GET");

            localStorageTracker = response.files.applications.content;
        } else {
            const fakeJobs = {};
            const fakeJobsTitles = [
                "Software Developer",
                "Software Engineer",
                "Senior Front-End Engineer",
                "React Engineer",
                "Angular Engineer",
                "NextJS Engineer",
                "Senior Front-End React Software Engineer"
            ];
            const fakeJobCompanies = ["Pixel Forge", "Login Loom"];
            const fakeJobStatuses = [
                "applied",
                "onHold",
                "denied",
                "recruiterContacted"
            ];
            const fakeJobAppliedFrom = [
                "linkedin",
                "recruiter",
                "ziprecruiter",
                "indeed",
                "github",
                "company",
                "monster",
                "dice",
                "other",
                ""
            ];
            const getFake = (array: Array<string>): string => {
                return array[Math.floor(Math.random() * array.length)];
            };

            for (let i = 0; i < 30; i++) {
                const jobId = uuid();
                const job = {
                    jobTitle: getFake(fakeJobsTitles),
                    jobCompany: getFake(fakeJobCompanies),
                    jobApplyDate: "2024-08-16",
                    jobCompanyLink: "",
                    jobLink: "",
                    jobSalaryMin: 70.1,
                    jobSalaryMax: 0,
                    jobSalaryType: "hr",
                    jobStatus: getFake(fakeJobStatuses),
                    jobId,
                    jobAppliedFrom: getFake(fakeJobAppliedFrom)
                };

                fakeJobs[jobId] = job;
            }

            localStorageTracker = JSON.stringify({
                items: fakeJobs,
                sort: { by: "jobApplyDate", dir: "desc" },
                viewAs: "tiles"
            });
        }

        if (localStorageTracker) {
            const parsed = JSON.parse(localStorageTracker);

            dispatch(
                applicationsActions.replaceApplications({
                    items: parsed.items || {},
                    sort: parsed.sort || {
                        by: "jobApplyDate",
                        dir: "desc"
                    },
                    viewAs: parsed.viewAs
                })
            );

            return true;
        }

        return false;
    };
};

export const saveApplicationData = (
    appItems: AppListTypeSave,
    isDemo: boolean = false
) => {
    // Underscore for function not needed so linter doesn't think
    // it's not used.
    return async (_dispatch: AppDispatch, getState) => {
        const { items, sort, viewAs } = appItems;

        if (!isDemo) {
            // This is not conventional, but because this should be stored
            // I'm using getState to grab the items to avoid pulling from
            // local store all the time.
            const access_token = getState().appList.accessToken;
            const gist_id = getState().appList.gistId;

            await gistFetch(
                gist_id,
                access_token,
                "PATCH",
                JSON.stringify({
                    files: {
                        applications: {
                            content: JSON.stringify({ items, sort, viewAs })
                        }
                    }
                })
            );
        } else {
            localStorage.setItem(
                "applyTracker",
                JSON.stringify({ items, sort, viewAs })
            );
        }
    };
};

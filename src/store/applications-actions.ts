import { AppListSort, JobType } from "../lib/types";

import { AppDispatch } from "../store";
import { applicationsActions } from "./applications-slice";
import gistFetch from "../lib/gist-fetch";

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
            localStorageTracker = JSON.stringify({
                items: {
                    "254cfe80-7efd-3e68-6b8c-eadf3aa2ffda": {
                        jobTitle: "Software Developer",
                        jobCompany: "Pixel Forge",
                        jobApplyDate: "2024-08-16",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalaryMin: 70.1,
                        jobSalaryMax: 0,
                        jobSalaryType: "hr",
                        jobStatus: "applied",
                        jobId: "254cfe80-7efd-3e68-6b8c-eadf3aa2ffda"
                    },
                    "d74a8833-88c4-d142-bf7b-737d1e74819d": {
                        jobTitle: "Senior Front-End Engineer",
                        jobCompany: "Login Loom",
                        jobApplyDate: "2024-08-01",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalaryMin: 70000,
                        jobSalaryMax: 120000,
                        jobSalaryType: "yr",
                        jobStatus: "interviewed",
                        jobId: "d74a8833-88c4-d142-bf7b-737d1e74819d"
                    },
                    "47e1a4cd-5e30-fd9f-9918-7a59e7f63e89": {
                        jobTitle: "React Engineer",
                        jobCompany: "NovaSoft",
                        jobApplyDate: "2024-07-16",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalaryMin: 140000,
                        jobSalaryMax: 0,
                        jobSalaryType: "yr",
                        jobStatus: "applied",
                        jobId: "47e1a4cd-5e30-fd9f-9918-7a59e7f63e89"
                    },
                    "47e1a4cd-5e30-fd9f-9910-7a59e7f63e89": {
                        jobTitle: "Angular Engineer",
                        jobCompany: "Koshka Enterprizes",
                        jobApplyDate: "2024-07-01",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalaryMin: 0,
                        jobSalaryMax: 140000,
                        jobSalaryType: "yr",
                        jobStatus: "denied",
                        jobId: "47e1a4cd-5e30-fd9f-9910-7a59e7f63e89"
                    },
                    "47e1a4cd-5e30-fd9f-9910-7a59e7f63e82": {
                        jobTitle: "NextJS Engineer",
                        jobCompany: "Codez",
                        jobApplyDate: "2024-07-03",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalaryMin: 0,
                        jobSalaryMax: 0,
                        jobSalaryType: "yr",
                        jobStatus: "onHold",
                        jobId: "47e1a4cd-5e30-fd9f-9910-7a59e7f63e82"
                    }
                },
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

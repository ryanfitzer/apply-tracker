import { AppListSort, JobType } from "../lib/types";

import { applicationsActions } from "./applications-slice";

interface AppListTypeSave {
    sort: AppListSort;
    viewAs: string;
    items: JobType[];
}

export const fetchApplicationData = (isDemo: boolean = false) => {
    return async (dispatch) => {
        let localStorageTracker: string = "";

        if (!isDemo) {
            localStorageTracker = localStorage.getItem(
                "applyTracker"
            ) as string;
        } else {
            localStorageTracker = JSON.stringify({
                items: {
                    "254cfe80-7efd-3e68-6b8c-eadf3aa2ffda": {
                        jobTitle: "Software Developer",
                        jobCompany: "Pixel Forge",
                        jobApplyDate: "2024-08-16",
                        jobCompanyLink: "",
                        jobLink: "",
                        jobSalary: "60 - 70",
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
                        jobSalary: "170,000",
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
                        jobSalary: "140,000",
                        jobSalaryType: "yr",
                        jobStatus: "applied",
                        jobId: "47e1a4cd-5e30-fd9f-9918-7a59e7f63e89"
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
        }
    };
};

export const saveApplicationdata = (appItems: AppListTypeSave) => {
    return async () => {
        const { items, sort, viewAs } = appItems;
        localStorage.setItem(
            "applyTracker",
            JSON.stringify({ items, sort, viewAs })
        );
    };
};

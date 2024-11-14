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
        const localStorageTracker = localStorage.getItem("applyTrackerData") as string;

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

        if (!isDemo) {
            // This is not conventional, but because this should be stored
            // I'm using getState to grab the items to avoid pulling from
            // local store all the time.
            const access_token = getState().appList.accessToken;
            const gist_id = getState().appList.gistId;
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
            const fakeJobStatuses = ["applied", "onHold", "denied", "recruiterContacted"];
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
            const getSalaryType = () => {
                return Math.random() > 0.5 ? "hr" : "yr";
            };
            const getSalary = () => {
                if (Math.random() < 0.2) return {};

                const type = getSalaryType();
                const minYr = Math.floor(Math.random() * 100000);
                if (type === "yr") {
                    return {
                        type,
                        min: Math.random() > 0.2 ? minYr : null,
                        max: minYr + 20000
                    };
                }

                const minHr = Math.floor(Math.random() * 100);

                return {
                    type,
                    min: Math.random() > 0.2 ? minHr : null,
                    max: minHr + 20
                };
            };
            const getFake = (array: Array<string>): string => {
                return array[Math.floor(Math.random() * array.length)];
            };

            for (let i = 0; i < 30; i++) {
                const jobId = uuid();
                const salary = getSalary();
                const job = {
                    jobTitle: getFake(fakeJobsTitles),
                    jobCompany: getFake(fakeJobCompanies),
                    jobApplyDate: "2024-08-16",
                    jobCompanyLink: "",
                    jobLink: "",
                    jobSalaryMin: salary.min,
                    jobSalaryMax: salary.max,
                    jobSalaryType: salary.type,
                    jobStatus: getFake(fakeJobStatuses),
                    jobId,
                    jobAppliedFrom: getFake(fakeJobAppliedFrom),
                    interviewList:
                        Math.random() > 0.5
                            ? [
                                  {
                                      date: "2024-08-05",
                                      interviewerList: ["joe", "mike"],
                                      typeList: ["video"],
                                      recruiter: false,
                                      final: true,
                                      interviewId: uuid()
                                  }
                              ]
                            : []
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

export const saveApplicationData = (appItems: AppListTypeSave, isDemo: boolean = false) => {
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
            localStorage.setItem("applyTracker", JSON.stringify({ items, sort, viewAs }));
        }
    };
};

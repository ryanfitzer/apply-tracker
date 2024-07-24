export interface JobType {
    jobId: string;
    jobApplyDate: string;
    jobStatus: JobStatusType;
    jobLink: string;
    jobTitle: string;
    jobCompanyLink: string;
    jobCompany: string;
    jobSalaryType: JobSalaryType;
    jobSalary: string;
}

export enum JobStatusType {
    APPLIED = "applied",
    INTERVIEWED_SCHEDULED = "interviewScheduled",
    INTERVIEWED = "interviewed",
    ON_HOLD = "onHold",
    DENIED = "denied"
}

export enum JobSalaryType {
    YR = "yr",
    HR = "hr"
}

export interface UiState {
    ui: {
        modalIsVisible: boolean;
    };
}

export interface AppListType {
    isChanged: boolean;
    sort: AppListSort;
    viewAs: string;
    items: JobType[];
    editingJob: string;
}

export interface AppListState {
    appList: AppListType;
}

export interface AppListSort {
    by: string;
    dir: string;
}

export interface ReplaceAppData {
    items: { [key: string]: JobType };
    sort: AppListSort;
    viewAs: string;
}

export interface JobType {
    jobId: string;
    jobApplyDate: string;
    jobStatus: JobStatusType;
    jobLink: string;
    jobTitle: string;
    jobCompanyLink: string;
    jobCompany: string;
    jobSalaryType: JobSalaryType;
    jobSalaryMin: number;
    jobSalaryMax: number;
    interviews?: Interview[];
}

export interface Interview {
    date: string;
    interviwerList: [];
    typeList: InterviewType[];
    recruiter: boolean;
    final: boolean;
}

export enum InterviewType {
    VIDEO = "video",
    PHONE = "phone",
    SCREENING = "screening",
    CODE = "code",
    TECHNICAL = "technical",
    PANEL = "panel"
}

export enum JobStatusType {
    APPLIED = "applied",
    INTERVIEWED_SCHEDULED = "interviewScheduled",
    INTERVIEWING = "interviewing",
    INTERVIEWED = "interviewed",
    ON_HOLD = "onHold",
    DENIED = "denied"
}

export enum JobSalaryType {
    YR = "yr",
    HR = "hr"
}

export enum SortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

export interface UiState {
    ui: {
        chartsModalIsVisible: boolean;
        modalIsVisible: boolean;
        showMenu: boolean;
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
    dir: SortDirection;
}

export interface ReplaceAppData {
    items: { [key: string]: JobType };
    sort: AppListSort;
    viewAs: string;
}

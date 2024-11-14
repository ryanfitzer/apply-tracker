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
    jobAppliedFrom: JobAppliedFrom;
    jobHasInterviewed?: boolean; // For easy tracking of having interviewed
    interviewList?: Interview[];
}

export interface Interview {
    date: string;
    interviewerList: string[];
    typeList: InterviewType[];
    recruiter: boolean;
    final: boolean;
    interviewId: string;
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
    DENIED = "denied",
    OFFERED = "offered",
    RECRUITER_CONTACTED = "recruiterContacted"
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

export enum JobAppliedFrom {
    LINKEDIN = "linkedin",
    RECRUITER = "recruiter",
    ZIPRECUITER = "ziprecruiter",
    INDEED = "indeed",
    GITHUB = "github",
    COMPANY = "company",
    MONSTER = "monster",
    DICE = "dice",
    OTHER = "other"
}

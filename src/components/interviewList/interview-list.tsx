import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import DateFormatted from "../ui/DateFormatted";
import { Interview } from "../../lib/types";

const InterviewListDisplay = ({
    interviews,
    editInterview,
    deleteInterview
}: {
    interviews: Interview[] | undefined;
    editInterview: (arg0: Interview) => () => void;
    deleteInterview: (arg0: Interview) => () => void;
}) => {
    const getInterviews = () => {
        if (!interviews || interviews.length === 0) {
            return [];
        }

        return [...interviews].sort(sortInterviews);
    };
    const sortInterviews = (a: Interview, b: Interview) => {
        // Sort circuit here if there aren't two interviews
        if (!a || !b) {
            return 0;
        }

        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();

        if (aDate === bDate) {
            return 0;
        }

        if (aDate < bDate) {
            return -1;
        }

        return 1;
    };

    return (
        <div className="flex w-80 flex-col">
            <p>Interviewed</p>
            {interviews && interviews.length > 0 && (
                <ul>
                    {getInterviews().map((interview) => {
                        return (
                            <li key={interview.interviewId}>
                                <div className="flex">
                                    <p>
                                        <DateFormatted date={interview.date} dateType="" />
                                    </p>
                                    <button onClick={editInterview(interview)} className="cursor-pointer">
                                        <Pencil1Icon />
                                    </button>
                                    <button onClick={deleteInterview(interview)} className="cursor-pointer">
                                        <TrashIcon />
                                    </button>
                                </div>
                                <div className="mb-2 flex gap-4">
                                    {interview.recruiter && (
                                        <div className="max-w-[200px] rounded-md bg-[#63bcfd] px-3 py-[5px] text-[12px] text-white">
                                            Recruiter
                                        </div>
                                    )}
                                    {interview.final && (
                                        <div className="bg-red max-w-[200px] rounded-md bg-red-500 px-3 py-[5px] text-[12px] text-white">
                                            Final
                                        </div>
                                    )}
                                </div>
                                <ul className="mb-2 flex flex-wrap gap-4">
                                    {interview.interviewerList?.map((interviewer, index) => {
                                        return (
                                            <li
                                                className="max-w-[200px] rounded-md bg-[#63bcfd] px-3 py-[5px] text-[12px] text-white"
                                                key={`${interviewer}-${index}`}
                                            >
                                                {interviewer}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <ul className="flex flex-wrap gap-4">
                                    {interview.typeList?.map((type, index) => {
                                        return (
                                            <li
                                                className="max-w-[200px] rounded-md bg-[#63bcfd] px-3 py-[5px] text-[12px] text-white"
                                                key={`${type}-${index}`}
                                            >
                                                {type}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            )}
            {(!interviews || !interviews.length) && <>No Interviews Yet</>}
        </div>
    );
};

export default InterviewListDisplay;

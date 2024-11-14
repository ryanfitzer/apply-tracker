import DateFormatted from "../ui/DateFormatted";
import { Interview } from "../../lib/types";

const InterviewListDisplay = ({ interviews }: { interviews: Interview[] | undefined }) => {
    return (
        <>
            <p>Interview List</p>
            {interviews && interviews.length && (
                <ul>
                    {interviews.map((interview) => {
                        return (
                            <div key={interview.interviewId}>
                                <li>
                                    <p>
                                        <DateFormatted date={interview.date} dateType="Interviewed" />
                                    </p>
                                </li>
                                <ul className="mb-2 flex gap-4">
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
                                <ul className="flex gap-4">
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
                            </div>
                        );
                    })}
                </ul>
            )}
            {(!interviews || !interviews.length) && <>No Interviews Yet</>}
        </>
    );
};

export default InterviewListDisplay;

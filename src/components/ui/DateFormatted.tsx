import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

interface DateFormattedProps {
    date: string;
    dateType: string;
    showRelative?: boolean;
}

const DateFormatted = ({ date, dateType, showRelative }: DateFormattedProps) => {
    const dateFormatted: string = format(parseISO(date), "ddMMMyyyy");
    const relative: string = formatDistanceToNowStrict(date);

    return (
        <>
            {dateType} on {dateFormatted}
            {showRelative && <>, {relative} ago </>}
        </>
    );
};

export default DateFormatted;

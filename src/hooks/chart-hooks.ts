/* Chart Hooks
 * Constructs data to be used in various displays.
 *
 * To customize, and data formats
 * https://developers.google.com/chart/interactive/docs/
 */

import { JobStatusType, JobType } from "../lib/types";
import { useMemo, useState } from "react";

import { selectApplicationItems } from "../store/applications-slice";
import { useAppSelector } from "./hooks";
import { useTranslation } from "react-i18next";

type CalendarDataSet = (string | number | object)[][];
type PieDataSet = (string | number)[][];

interface ChartDataSets {
    pie: PieDataSet;
    calendar: CalendarDataSet;
}

interface CalendarTempDataSet {
    [key: number]: number;
}

const useCharts = (): [ChartDataSets, boolean] => {
    const { t } = useTranslation();
    const applicationListItems = useAppSelector(selectApplicationItems);
    const [chartData, setChartData] = useState({
        pie: [],
        calendar: []
    } as ChartDataSets);
    const [loadingChartData, setLoadingChartData] = useState(true);
    const addToCalendarTempData = (
        jobApplyDate: string,
        tempData: CalendarTempDataSet
    ): CalendarTempDataSet => {
        // Need to remove the Z to get the time/date string in local
        // time.
        const splitDate = new Date(jobApplyDate).toISOString().slice(0, -1);

        if (!tempData[splitDate]) {
            tempData[splitDate] = 1;
        } else {
            tempData[splitDate] += 1;
        }

        return tempData;
    };

    useMemo(() => {
        const calendarHeader: [object, object] = [
            {
                type: "date",
                id: "Date"
            },
            {
                type: "number",
                id: "Applications Sent"
            }
        ];
        const dataSetsHeader: [string, string] = ["Phase", "Number"];
        const dataSets: PieDataSet = [];
        const tempData = {
            [JobStatusType.APPLIED]: 0,
            [JobStatusType.DENIED]: 0,
            [JobStatusType.ON_HOLD]: 0,
            [JobStatusType.INTERVIEWED_SCHEDULED]: 0,
            [JobStatusType.INTERVIEWED]: 0
        };
        const calendarTempData: CalendarTempDataSet = {};
        const calendarDataSetList: [Date, number][] = [];
        for (const item of Object.values(applicationListItems) as JobType[]) {
            tempData[item.jobStatus] += 1;

            // Passing by reference to have some cleaner code.
            addToCalendarTempData(item.jobApplyDate, calendarTempData);
        }

        for (const [key, value] of Object.entries(tempData)) {
            dataSets.push([`${t(`jobStatus.${key}`)} (${value})`, value]);
        }

        for (const [dateKey, dateValue] of Object.entries(calendarTempData)) {
            calendarDataSetList.push([new Date(dateKey), dateValue]);
        }

        setChartData({
            // @ts-expect-error: Cannot type this effectively, yet.
            pie: [dataSetsHeader].concat(dataSets),
            // @ts-expect-error: Cannot type this effectively, yet.
            calendar: [calendarHeader].concat(calendarDataSetList)
        });
        //setLoadingChartData(false);
    }, [setChartData, applicationListItems, t]);

    return [chartData, loadingChartData] as [ChartDataSets, boolean];
};

export default useCharts;

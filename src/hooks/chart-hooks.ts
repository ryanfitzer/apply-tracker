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

interface ChartDataSets {
    pie: (string | number)[][];
    timeline: (string | number | object)[][];
}

const useCharts = () => {
    const { t } = useTranslation();
    const applicationListItems = useAppSelector(selectApplicationItems);
    //const [chartData, setChartData] = useState<(string | number)[][]>([]);
    const [chartData, setChartData] = useState({
        pie: <(string | number)[][]>[],
        timeline: []
    });
    const [loadingChartData, setLoadingChartData] = useState(true);

    useMemo(() => {
        const timelineHeader: [string, string, object] = [
            "Month/Year",
            "Number",
            { role: "style" }
        ];

        const dataSetsHeader: [string, string] = ["Phase", "Number"];
        const dataSets: [string, number][] = [];
        const tempData = {
            [JobStatusType.APPLIED]: 0,
            [JobStatusType.DENIED]: 0,
            [JobStatusType.ON_HOLD]: 0,
            [JobStatusType.INTERVIEWED_SCHEDULED]: 0,
            [JobStatusType.INTERVIEWED]: 0
        };
        const tempTimeData = {};
        const timelineDataSets: [string, number, string][] = [];
        for (const item of Object.values(applicationListItems) as JobType[]) {
            tempData[item.jobStatus] += 1;
            const splitDate = new Date(item.jobApplyDate);

            if (!tempTimeData[splitDate.getFullYear()]) {
                tempTimeData[splitDate.getFullYear()] = {};
            }

            if (
                !tempTimeData[splitDate.getFullYear()][splitDate.getUTCMonth()]
            ) {
                tempTimeData[splitDate.getFullYear()][
                    splitDate.getUTCMonth()
                ] = 1;
            } else {
                tempTimeData[splitDate.getFullYear()][
                    splitDate.getUTCMonth()
                ] += 1;
            }
        }

        for (const [key, value] of Object.entries(tempData)) {
            dataSets.push([`${t(`jobStatus.${key}`)} (${value})`, value]);
        }

        for (const [yearKey, monthValue] of Object.entries(tempTimeData)) {
            for (const [monthKey, value] of Object.entries(
                monthValue as object
            )) {
                const monthName = +monthKey == 6 ? "July" : "August";
                timelineDataSets.push([
                    `${monthName}\n${yearKey} `,
                    value,
                    "fill-color: #e5e4e2"
                ]);
            }
        }

        setChartData({
            // @ts-expect-error: Cannot type this effectively, yet.
            pie: [dataSetsHeader].concat(dataSets),
            // @ts-expect-error: Cannot type this effectively, yet.
            timeline: [timelineHeader].concat(timelineDataSets)
        });
        setLoadingChartData(false);
    }, [setChartData, applicationListItems, t]);

    return [chartData, loadingChartData] as [ChartDataSets, boolean];
};

export default useCharts;

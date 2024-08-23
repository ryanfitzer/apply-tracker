import { JobStatusType, JobType } from "../lib/types";
import { useMemo, useState } from "react";

import { selectApplicationItems } from "../store/applications-slice";
import { useAppSelector } from "./hooks";
import { useTranslation } from "react-i18next";

const useCharts = () => {
    const { t } = useTranslation();
    const applicationListItems = useAppSelector(selectApplicationItems);
    const [chartData, setChartData] = useState<(string | number)[][]>([]);
    const [loadingChartData, setLoadingChartData] = useState(true);

    useMemo(() => {
        const dataSetsHeader: [string, string] = ["Phase", "Number"];
        const dataSets: [string, number][] = [];
        const tempData = {
            [JobStatusType.APPLIED]: 0,
            [JobStatusType.DENIED]: 0,
            [JobStatusType.ON_HOLD]: 0,
            [JobStatusType.INTERVIEWED_SCHEDULED]: 0,
            [JobStatusType.INTERVIEWED]: 0
        };
        for (const item of Object.values(applicationListItems) as JobType[]) {
            tempData[item.jobStatus] += 1;
        }

        for (const [key, value] of Object.entries(tempData)) {
            dataSets.push([`${t(`jobStatus.${key}`)} (${value})`, value]);
        }

        // @ts-expect-error: Cannot type this effectively, yet.
        setChartData([dataSetsHeader].concat(dataSets));
        setLoadingChartData(false);
    }, [setChartData, applicationListItems, t]);

    return [chartData, loadingChartData];
};

export default useCharts;

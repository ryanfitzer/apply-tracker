import { JobStatusType, JobType } from "../lib/types";
import { useEffect, useState } from "react";

import { selectApplicationItems } from "../store/applications-slice";
import { useAppSelector } from "./hooks";
import { useTranslation } from "react-i18next";

const useCharts = () => {
    const { t } = useTranslation();
    const applicationListItems = useAppSelector(selectApplicationItems);
    const [chartData, setChartData] = useState([] as string[][]);
    const [loadingChartData, setLoadingChartData] = useState(true);

    useEffect(() => {
        const data = [["Phase", "Number"]];
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

        for (const key of Object.keys(tempData)) {
            data.push([
                `${t(`jobStatus.${key}`)} (${tempData[key]})`,
                tempData[key]
            ]);
        }

        setChartData(data);
        setLoadingChartData(false);
    }, [setChartData, applicationListItems, t]);

    return [chartData, loadingChartData];
};

export default useCharts;

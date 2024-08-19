import { useMemo, useState } from "react";

import { Chart } from "react-google-charts";
import { JobType } from "../lib/types";
import { selectApplicationItems } from "../store/applications-slice";
import { useAppSelector } from "../hooks/hooks";

const Charts = () => {
    const applicationListItems = useAppSelector(selectApplicationItems);
    const [chartData, setChartData] = useState([] as string[][]);

    useMemo(() => {
        const data = [["Phase", "Number"]];
        const tempData = {
            applied: 0,
            denied: 0,
            onHold: 0,
            interviewScheduled: 0,
            interviewed: 0
        };
        for (const item of Object.values(applicationListItems) as JobType[]) {
            tempData[item.jobStatus] += 1;
        }

        for (const key of Object.keys(tempData)) {
            data.push([key, tempData[key]]);
        }

        setChartData(data);
    }, [applicationListItems, setChartData]);

    return (
        <div>
            {chartData && <Chart
                chartType="PieChart"
                data={chartData}
                options={{
                    is3D: true,
                    sliceVisibilityThreshold: 0
                }}
                width="500px"
                height="200px"
            />}
        </div>
    );
};

export default Charts;
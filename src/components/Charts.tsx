import { Chart, GoogleChartOptions } from "react-google-charts";

import useCharts from "../hooks/chart-hooks";

const Charts = () => {
    const [chartData, loadingChartData] = useCharts();
    const options: GoogleChartOptions = {
        is3D: true,
        sliceVisibilityThreshold: 0,
        width: 500,
        backgroundColor: ""
    };
    const timelineOptions: GoogleChartOptions = {
        title: "Applications Sent",
        backgroundColor: "",
        width: 1000
    };
    return (
        <div className="w-auto flex justify-center items-center flex-col">
            {!loadingChartData && (
                <>
                    <Chart
                        chartType="PieChart"
                        data={chartData.pie}
                        options={options}
                    /><Chart
                        chartType="Calendar"
                        data={chartData.calendar}
                        options={timelineOptions}
                    />
                </>
            )}
            {loadingChartData && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Charts;
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
        title: "Company Performance",
        is3D: true,
        backgroundColor: ""
    };
    return (
        <div className="w-[500px] flex justify-center items-center flex-col">
            {!loadingChartData && <Chart
                chartType="PieChart"
                data={chartData.pie}
                options={options}
            />}
            {!loadingChartData && <Chart
                chartType="Bar"
                width="500px"
                height="200px"
                data={chartData.timeline}
                options={timelineOptions}
            />}

            {loadingChartData && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Charts;
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
    return (
        <div className="w-[500px] h-[200px] flex justify-center items-center">
            {!loadingChartData && <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
            />}
            {loadingChartData && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Charts;
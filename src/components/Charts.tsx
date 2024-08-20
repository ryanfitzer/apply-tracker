import { Chart } from "react-google-charts";
import useCharts from "../hooks/chart-hooks";

const Charts = () => {
    const [chartData, loadingChartData] = useCharts();

    return (
        <div className="w-[500px] h-[200px] flex justify-center items-center">
            {!loadingChartData && <Chart
                chartType="PieChart"
                data={chartData}
                options={{
                    is3D: true,
                    sliceVisibilityThreshold: 0,
                    width: 500
                }}
            />}
            {loadingChartData && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Charts;
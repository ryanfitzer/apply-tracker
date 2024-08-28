import { Chart, GoogleChartOptions } from "react-google-charts";

import Link from "./ui/Link";
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
                <div className="flex flex-col">
                    <div className="flex">
                        <div>
                            <p>Total Applications: {chartData.meta.total}</p>
                            <p>Company List</p>
                            <ul className="h-[200px] w-[300px] overflow-y-auto">
                                {chartData.meta.companyList.map(item => <li className="even:bg-slate-100"><Link text={item.name} link={item.link} /></li>)}

                            </ul>
                        </div>
                        <Chart
                            chartType="PieChart"
                            data={chartData.pie}
                            options={options}
                        />
                    </div>
                    <Chart
                        chartType="Calendar"
                        data={chartData.calendar}
                        options={timelineOptions}
                    />
                </div>
            )}
            {loadingChartData && (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Charts;
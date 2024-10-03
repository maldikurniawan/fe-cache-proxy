import { Fragment } from 'react';
import Chart from "react-apexcharts";
import CardContainer from "./CardContainer"; // Adjust the import path as needed

const LineChart = ({
    title,
    icon,
    cardColor,
    dataSeries,
    dataLabels,
    dataColor,
    directionColor,
    isDark = false, // Default values
}) => {
    const chartConfig = {
        series: dataSeries, // Ensure the data format is appropriate for a line chart (array of objects with `name` and `data`)
        options: {
            chart: {
                height: 300,
                type: 'line',
                toolbar: {
                    show: false,
                },
            },
            colors: [dataColor || '#4361EE'], // Use passed dataColor or default
            tooltip: {
                marker: {
                    show: false,
                },
                y: {
                    formatter: function (value) {
                        return `${value}`; // Format as currency
                    },
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth', // Makes the lines smoother
            },
            xaxis: {
                categories: dataLabels, // Default to monthly categories
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed', // Adjust colors for dark/light mode
                },
            },
            yaxis: {
                labels: {
                    offsetX: 0, // Remove RTL adjustments
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
        },
    };

    return (
        <Fragment>
            <CardContainer
                cardColor={cardColor}
                icon={icon}
                title={title}
                directionColor={directionColor}
            >
                <div className="flex justify-center py-4">
                    <Chart
                        options={chartConfig.options}
                        series={chartConfig.series}
                        type="line"
                        height={300}
                        className="text-black w-full"
                    />
                </div>
            </CardContainer>
        </Fragment>
    );
};

export default LineChart;

import { Fragment } from 'react';
import Chart from "react-apexcharts";
import CardContainer from "./CardContainer"; // Adjust the import path as needed
import { useContext } from 'react';
import { ThemeContext } from "@/context/ThemeContext";

const LineChart = ({
    title,
    icon,
    cardColor,
    dataSeries,
    dataLabels,
    dataColor,
    directionColor,
}) => {
    const { colorMode } = useContext(ThemeContext); // Get color mode from context
    const isDark = colorMode === 'dark'; // Determine if dark mode is active

    const chartConfig = {
        series: dataSeries,
        options: {
            chart: {
                height: 300,
                type: 'line',
                toolbar: {
                    show: false,
                },
            },
            colors: [dataColor || '#4361EE'],
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
                curve: 'smooth',
            },
            xaxis: {
                categories: dataLabels,
                labels: {
                    style: {
                        colors: isDark ? '#cbd5e1' : '#1f2937', // Dark mode x-axis text color
                    },
                },
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                labels: {
                    offsetX: 0,
                    style: {
                        colors: isDark ? '#cbd5e1' : '#1f2937', // Dark mode x-axis text color
                    },
                },
            },
            grid: {
                borderColor: isDark ? '#374151' : '#e0e6ed',
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            legend: {
				labels: {
					colors: isDark ? '#cbd5e1' : '#1f2937', // Dark mode x-axis text color
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

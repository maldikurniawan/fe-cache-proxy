import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FaChartBar } from "react-icons/fa";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#020617"],
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
};

export default function Example() {
    return (
        <Card className="w-full rounded-lg">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex gap-2 rounded-lg flex-row items-center"
            >
                <FaChartBar className="ml-4"/>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Bar Chart
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
            </CardBody>
        </Card>
    );
}
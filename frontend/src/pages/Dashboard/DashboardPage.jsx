import DonutChart from "../../components/DonutChart";
import LineChart from "../../components/LineChart";
import React from "react";
import ApiCacheUpdate from "../../components/ApiCacheUpdate";
import { MdDonutLarge } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid md:grid-cols-4 mb-4 gap-4">
        <ApiCacheUpdate />
        <div
          className="cursor-pointer lg:col-span-2 md:col-span-3"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => navigate("/access")}
        >
          <DonutChart
            title={"Status Cache"}
            icon={<MdDonutLarge />}
            dataSeries={[20, 10]}
            dataLabels={["TCP_HIT", "TCP_MISS"]}
            dataColor={["#22C55E", "#EF4444"]}
          />
        </div>
        <div
          className="cursor-pointer lg:col-span-2 md:col-span-3"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => navigate("/access")}
        >
          <DonutChart
            title={"Frekuensi Aksi Cache "}
            icon={<MdDonutLarge />}
            dataSeries={[10, 20, 10, 20]}
            dataLabels={["CREATE", "RELEASE", "SWAPOUT", "SWAPIN"]}
            dataColor={["#22C55E", "#EF4444", "#3B82F6", "#EAB308"]}
          />
        </div>
      </div>
      <div
        className="cursor-pointer lg:col-span-2 md:col-span-3"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={() => navigate("/access")}
      >
        <LineChart
          title="Jumlah Log"
          icon={<FaChartLine />}
          dataSeries={[
            {
              name: 'Logs', // Provide a name for the series
              data: [20, 10, 15, 25, 30, 50, 40, 10, 20, 30, 25, 15] // Example data; adjust as needed
            }
          ]}
          dataLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]} // Example labels; adjust as needed
          dataColor="#4361EE" // You can specify color if needed
        />
      </div>
    </div>

  );
};

export default DashboardPage;

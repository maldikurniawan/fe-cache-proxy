import React, { useEffect, useState } from "react";
import { MdDonutLarge } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { API_URL_access } from "../../constants";
import DonutChart from "../../components/DonutChart";
import LineChart from "../../components/LineChart";

const DashboardPage = () => {
  const [totalStatus, setTotalStatus] = useState([0, 0, 0, 0]);

  useEffect(() => {
    fetch(API_URL_access)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Initialize counters
        const statusCounts = {
          "TCP_HIT/200": 0,
          "TCP_MISS/200": 0,
          "TCP_TUNNEL/200": 0,
          "TCP_DENIED/403": 0
        };

        // Aggregate counts from data
        data.forEach((entry) => {
          if (statusCounts.hasOwnProperty(entry.http_status)) {
            statusCounts[entry.http_status]++;
          }
        });

        // Update state with aggregated counts
        setTotalStatus([
          statusCounts["TCP_HIT/200"],
          statusCounts["TCP_MISS/200"],
          statusCounts["TCP_TUNNEL/200"],
          statusCounts["TCP_DENIED/403"]
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      });
  }, []);

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
        <div
          className="cursor-pointer lg:col-span-2 md:col-span-1"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <DonutChart
            title={"Status Cache"}
            icon={<MdDonutLarge />}
            dataSeries={totalStatus} // Use fetched data
            dataLabels={["TCP_HIT", "TCP_MISS", "TCP_TUNNEL", "TCP_DENIED"]}
            dataColor={["#22C55E", "#EF4444", "#3B82F6", "#EAB308"]}
          />
        </div>

        <div
          className="cursor-pointer lg:col-span-2 md:col-span-1"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <DonutChart
            title={"Frekuensi Aksi Cache"}
            icon={<MdDonutLarge />}
            dataSeries={[10, 20, 10, 20]} // Example static data
            dataLabels={["CREATE", "RELEASE", "SWAPOUT", "SWAPIN"]}
            dataColor={["#22C55E", "#EF4444", "#3B82F6", "#EAB308"]}
          />
        </div>
      </div>

      <div
        className="cursor-pointer"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <LineChart
          title="Jumlah Log"
          icon={<FaChartLine />}
          dataSeries={[{
            name: 'Requests',
            data: [20, 10, 15, 25, 30, 50, 40, 10, 20, 30, 25, 15], // Example static data
          }]}
          dataLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]}
          dataColor="#4361EE"
        />
      </div>
    </div>
  );
};

export default DashboardPage;

import React, { useEffect, useState } from "react";
import { MdDonutLarge } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { API_URL_access, API_URL_store } from "@/constants";
import {
  DonutChart,
  LineChart,
} from "@/components";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner component

const DashboardPage = () => {
  const [totalStatus, setTotalStatus] = useState([0, 0, 0, 0]);
  const [totalAksi, setTotalAksi] = useState([0, 0, 0, 0]);
  const [monthlyLogCounts, setMonthlyLogCounts] = useState(new Array(12).fill(0)); // Initial state for monthly log counts
  const [loadingAccess, setLoadingAccess] = useState(true); // State to manage access API loading
  const [loadingStore, setLoadingStore] = useState(true); // State to manage store API loading

  useEffect(() => {
    setLoadingAccess(true); // Set loading to true before fetching
    fetch(API_URL_access)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const statusCounts = {
          "TCP_HIT/200": 0,
          "TCP_MISS/200": 0,
          "TCP_TUNNEL/200": 0,
          "TCP_DENIED/403": 0
        };

        const monthlyCounts = new Array(12).fill(0); // Initialize array for 12 months (Jan-Dec)

        data.forEach((entry) => {
          // Count based on status
          if (statusCounts.hasOwnProperty(entry.http_status)) {
            statusCounts[entry.http_status]++;
          }

          // Parse timestamp (Unix timestamp, multiply by 1000 to convert to milliseconds)
          const entryDate = new Date(parseFloat(entry.timestamp) * 1000); // Convert timestamp to JS Date
          const month = entryDate.getMonth(); // Get the month (0-11)

          if (!isNaN(month)) {
            monthlyCounts[month]++;
          }
        });

        setTotalStatus([
          statusCounts["TCP_HIT/200"],
          statusCounts["TCP_MISS/200"],
          statusCounts["TCP_TUNNEL/200"],
          statusCounts["TCP_DENIED/403"]
        ]);

        setMonthlyLogCounts(monthlyCounts); // Set monthly log counts
        setLoadingAccess(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingAccess(false); // Ensure loading is false even if there is an error
      });
  }, []);

  useEffect(() => {
    setLoadingAccess(false); // Ensure loading is false even if there is an error
    fetch(API_URL_store)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const aksiCounts = {
          "CREATE": 0,
          "RELEASE": 0,
          "SWAPOUT": 0,
          "SWAPIN": 0
        };

        data.forEach((entry) => {
          // Count based on status
          if (aksiCounts.hasOwnProperty(entry.realese)) {
            aksiCounts[entry.realese]++;
          }
        });

        setTotalAksi([
          aksiCounts["CREATE"],
          aksiCounts["RELEASE"],
          aksiCounts["SWAPOUT"],
          aksiCounts["SWAPIN"]
        ]);

        setLoadingStore(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingStore(false); // Ensure loading is false even if there is an error
      });
  }, []);

  const isLoading = loadingAccess || loadingStore; // Show loading if either is loading

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center mt-16">
          <ClipLoader color="#111827" loading={isLoading} size={300} />
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
            <div
              className="cursor-pointer lg:col-span-2 md:col-span-1"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <DonutChart
                title={"Status Cache"}
                icon={<MdDonutLarge />}
                dataSeries={totalStatus}
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
                dataSeries={totalAksi} // Example static data
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
                data: monthlyLogCounts, // Use dynamically calculated monthly data
              }]}
              dataLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]}
              dataColor="#4361EE"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

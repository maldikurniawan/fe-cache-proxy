import React, { useEffect, useState } from "react";
import { MdDonutLarge } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { API_URL_access, API_URL_store, API_URL_useragent } from "@/constants";
import { DonutChart, LineChart } from "@/components";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner component

const DashboardPage = () => {
  const [totalStatus, setTotalStatus] = useState([0, 0, 0, 0]);
  const [totalAksi, setTotalAksi] = useState([0, 0, 0, 0]);
  const [monthlyAccessCounts, setMonthlyAccessCounts] = useState(new Array(12).fill(0)); // For access API monthly log counts
  const [monthlyStoreCounts, setMonthlyStoreCounts] = useState(new Array(12).fill(0)); // For store API monthly log counts
  const [monthlyUserAgentCounts, setMonthlyUserAgentCounts] = useState(new Array(12).fill(0));
  const [loadingAccess, setLoadingAccess] = useState(true); // State to manage access API loading
  const [loadingStore, setLoadingStore] = useState(true); // State to manage store API loading
  const [loadingUserAgent, setLoadingUserAgent] = useState(true);

  // Access Log
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

        setMonthlyAccessCounts(monthlyCounts); // Set monthly log counts for access API
        setLoadingAccess(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingAccess(false); // Ensure loading is false even if there is an error
      });
  }, []);

  // Store Log
  useEffect(() => {
    setLoadingStore(true); // Set loading to true before fetching
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

        const monthlyCounts = new Array(12).fill(0); // Initialize array for 12 months (Jan-Dec)

        data.forEach((entry) => {
          // Count based on status
          if (aksiCounts.hasOwnProperty(entry.realese)) {
            aksiCounts[entry.realese]++;
          }

          // Parse timestamp (Unix timestamp, multiply by 1000 to convert to milliseconds)
          const entryDate = new Date(parseFloat(entry.timestamp) * 1000); // Convert timestamp to JS Date
          const month = entryDate.getMonth(); // Get the month (0-11)

          if (!isNaN(month)) {
            monthlyCounts[month]++; // Increment the count for the respective month
          }
        });

        setTotalAksi([
          aksiCounts["CREATE"],
          aksiCounts["RELEASE"],
          aksiCounts["SWAPOUT"],
          aksiCounts["SWAPIN"]
        ]);

        setMonthlyStoreCounts(monthlyCounts); // Set monthly log counts for store API
        setLoadingStore(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingStore(false); // Ensure loading is false even if there is an error
      });
  }, []);

  // User Agent Log
  useEffect(() => {
    setLoadingUserAgent(true); // Set loading to true before fetching

    fetch(API_URL_useragent)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {

        const monthlyCounts = new Array(12).fill(0); // Initialize array for 12 months (Jan-Dec)

        const monthMapping = {
          Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
          Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };

        data.forEach((entry) => {
          // Assuming entry.date is in the format "[15/Aug/2024:15:11:33+0700]"
          const dateStr = entry.date.slice(1, -1); // Remove square brackets

          // Use regex to extract parts of the date
          const dateRegex = /(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2})([+-]\d{4})/;
          const match = dateRegex.exec(dateStr);

          if (match) {
            const [_, day, month, year, hours, minutes, seconds, timezone] = match;

            // Get the numerical month value from the monthMapping
            const monthNumber = monthMapping[month];

            // Create a formatted date string like "2024-08-15T15:11:33+0700"
            const formattedDateStr = `${year}-${monthNumber}-${day}T${hours}:${minutes}:${seconds}${timezone}`;

            // Parse the formatted date string into a Date object
            const entryDate = new Date(formattedDateStr);

            if (!isNaN(entryDate.getTime())) {
              const monthIndex = entryDate.getMonth(); // Get the month (0-11)
              monthlyCounts[monthIndex]++;
            }
          }
        });

        setMonthlyUserAgentCounts(monthlyCounts); // Set monthly log counts for user agent API
        setLoadingUserAgent(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingUserAgent(false); // Ensure loading is false even if there is an error
      });
  }, []);

  const isLoading = loadingAccess || loadingStore || loadingUserAgent; // Show loading if either is loading

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
              dataSeries={[
                {
                  name: 'Access Logs',
                  data: monthlyAccessCounts, // Access API monthly data
                  color: "#3B82F6" // Set color for Access Logs line
                },
                {
                  name: 'Store Logs',
                  data: monthlyStoreCounts, // Store API monthly data
                  color: "#EF4444" // Set color for Store Logs line
                },
                {
                  name: 'User Agent Logs',
                  data: monthlyUserAgentCounts, // Store API monthly data
                  color: "#22C55E" // Set color for Store Logs line
                },
              ]}
              dataLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;

import React, { useEffect, useState } from "react";
import { MdDonutLarge } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { API_URL_access, API_URL_store, API_URL_useragent } from "@/constants";
import { DonutChart, LineChart, Loader } from "@/components";
// import { HashLoader } from "react-spinners";

// Helper function to handle API fetch and data processing
const fetchData = async (url, processData) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return processData(data);
};

// Function to format bytes into a human-readable format
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const size = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + size[i];
};

const DashboardPage = () => {
  const [totalStatus, setTotalStatus] = useState([0, 0, 0, 0]);
  const [totalAksi, setTotalAksi] = useState([0, 0, 0, 0]);
  const [monthlyAccessCounts, setMonthlyAccessCounts] = useState(new Array(12).fill(0));
  const [monthlyStoreCounts, setMonthlyStoreCounts] = useState(new Array(12).fill(0));
  const [monthlyUserAgentCounts, setMonthlyUserAgentCounts] = useState(new Array(12).fill(0));
  const [monthlyBandwidthCounts, setMonthlyBandwidthCounts] = useState(new Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  // Process log data for access and store APIs
  const processLogData = (data, type) => {
    const counts = { status: [0, 0, 0, 0], monthly: new Array(12).fill(0), totalBytes: new Array(12).fill(0) };
    const statusKeys = type === "access"
      ? ["TCP_HIT/200", "TCP_MISS/200", "TCP_TUNNEL/200", "TCP_DENIED/403"]
      : ["CREATE", "RELEASE", "SWAPOUT", "SWAPIN"];

    data.forEach(entry => {
      if (type === "access") {
        if (statusKeys.includes(entry.http_status)) {
          counts.status[statusKeys.indexOf(entry.http_status)]++;
        }
        const bytes = parseInt(entry.bytes, 10) || 0;
        const month = new Date(parseFloat(entry.timestamp) * 1000).getMonth();
        if (!isNaN(month)) {
          counts.monthly[month]++;
          counts.totalBytes[month] += bytes;
        }
      } else {
        if (statusKeys.includes(entry.realese)) {
          counts.status[statusKeys.indexOf(entry.realese)]++;
        }
        const month = new Date(parseFloat(entry.timestamp) * 1000).getMonth();
        if (!isNaN(month)) counts.monthly[month]++;
      }
    });
    return { status: counts.status, monthly: counts.monthly, totalBytes: counts.totalBytes };
  };

  const processUserAgentData = (data) => {
    const monthlyCounts = new Array(12).fill(0);
    const monthMapping = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

    data.forEach(entry => {
      const match = /\d{2}\/([A-Za-z]{3})\/\d{4}/.exec(entry.date);
      if (match) monthlyCounts[monthMapping[match[1]]]++;
    });

    return monthlyCounts;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const accessData = await fetchData(API_URL_access, data => processLogData(data, "access"));
        const storeData = await fetchData(API_URL_store, data => processLogData(data, "store"));
        const userAgentData = await fetchData(API_URL_useragent, processUserAgentData);

        setTotalStatus(accessData.status);
        setMonthlyAccessCounts(accessData.monthly);
        setMonthlyBandwidthCounts(accessData.totalBytes); // Set totalBytes for bandwidth

        setTotalAksi(storeData.status);
        setMonthlyStoreCounts(storeData.monthly);

        setMonthlyUserAgentCounts(userAgentData);

        console.log("Jumlah Bandwidth:", accessData.totalBytes.map(formatBytes));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center mt-36">
          <Loader loading={loading} />
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-4">
            <div className="cursor-pointer lg:col-span-2 md:col-span-1">
              <DonutChart
                title="Kode Status Cache"
                icon={<MdDonutLarge />}
                dataSeries={totalStatus}
                dataLabels={["TCP_HIT", "TCP_MISS", "TCP_TUNNEL", "TCP_DENIED"]}
                dataColor={["#22C55E", "#EF4444", "#3B82F6", "#EAB308"]}
              />
            </div>
            <div className="cursor-pointer lg:col-span-2 md:col-span-1">
              <DonutChart
                title="Frekuensi Aksi Cache"
                icon={<MdDonutLarge />}
                dataSeries={totalAksi}
                dataLabels={["CREATE", "RELEASE", "SWAPOUT", "SWAPIN"]}
                dataColor={["#22C55E", "#EF4444", "#3B82F6", "#EAB308"]}
              />
            </div>
          </div>
          <LineChart
            title="Jumlah Log"
            icon={<FaChartLine />}
            dataSeries={[
              { name: "Access Logs", data: monthlyAccessCounts, color: "#3B82F6" },
              { name: "Store Logs", data: monthlyStoreCounts, color: "#EF4444" },
              { name: "User Agent Logs", data: monthlyUserAgentCounts, color: "#22C55E" },
              { name: "Bandwidth", data: monthlyBandwidthCounts.map(formatBytes), color: "#A855F7" },
            ]}
            dataLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;

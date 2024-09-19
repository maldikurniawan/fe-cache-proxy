import React, { useEffect, useState } from "react";
import { MdDonutLarge } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { API_URL_access } from "../../constants";
import DonutChart from "../../components/DonutChart";
import LineChart from "../../components/LineChart";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner component

const DashboardPage = () => {
  const [totalStatus, setTotalStatus] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
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

        data.forEach((entry) => {
          if (statusCounts.hasOwnProperty(entry.http_status)) {
            statusCounts[entry.http_status]++;
          }
        });

        setTotalStatus([
          statusCounts["TCP_HIT/200"],
          statusCounts["TCP_MISS/200"],
          statusCounts["TCP_TUNNEL/200"],
          statusCounts["TCP_DENIED/403"]
        ]);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is false even if there is an error
      });
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <ClipLoader color="#111827" loading={loading} size={400} />
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
        </>
      )}
    </div>
  );
};

export default DashboardPage;

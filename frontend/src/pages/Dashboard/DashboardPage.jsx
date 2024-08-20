import { CompCardContainer } from "../../components/index";
import React, { useEffect, useState } from "react";
import ApiCacheUpdate from "../../components/ApiCacheUpdate";
import LineChart from "../../charts/LineChart"
import BarChart from "../../charts/BarChart"
import PieChart from "../../charts/PieChart"

const DashboardPage = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <ApiCacheUpdate />
        <CompCardContainer>
          <div className="font-medium">URL</div>
        </CompCardContainer>
        <CompCardContainer>
          <div>{time.toLocaleTimeString()}</div>
        </CompCardContainer>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <LineChart />
        <BarChart />
        <PieChart />
      </div>
    </div>

  );
};

export default DashboardPage;

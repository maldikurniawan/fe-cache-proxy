import { CompCardContainer } from "../../components/index";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000)
  }, [])

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <CompCardContainer>
        <div>Jumlah Log: 188</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>Client Address: 103.81.64.186</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>URL: www.google.com:433</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>Waktu: {time.toLocaleTimeString()}</div>
      </CompCardContainer>
    </div>
  );
};

export default DashboardPage;

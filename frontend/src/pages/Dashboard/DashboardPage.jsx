import { CompCardContainer } from "../../components/index";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <CompCardContainer>
        <div>Request</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>Ip Address</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>URL</div>
      </CompCardContainer>
      <CompCardContainer>
        <div>Tanggal Akses</div>
      </CompCardContainer>
    </div>
  );
};

export default DashboardPage;

import React from "react";

const CompCardContainer = ({ children }) => {
  return (
    <div className={`bg-white w-full shadow p-3 rounded-lg`}>{children}</div>
  );
};

export default CompCardContainer;

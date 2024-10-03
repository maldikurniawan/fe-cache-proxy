import React from "react";

const CardContainer = ({ children, icon, title }) => {
  return (
    <div className="bg-white w-full shadow p-3 rounded-lg">
      <div className="flex items-center mb-2 gap-2 font-bold">
        {icon && <div className="text-2xl">{icon}</div>}
        {title && <div className="text-lg">{title}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CardContainer;

import React from "react";

const CardContainer = ({ children, icon, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 w-full shadow p-3 rounded-lg">
      <div className="flex items-center mb-2 gap-2 font-bold text-black dark:text-gray-100">
        {icon && <div className="text-2xl">{icon}</div>}
        {title && <div className="text-lg">{title}</div>}
      </div>
      <div className="text-black dark:text-gray-100">{children}</div>
    </div>
  );
};

export default CardContainer;

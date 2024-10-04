import React, { useState, Fragment } from "react";
import { CardContainer, Pagination } from "@/components";
import { icons } from "../../../public/assets/icons";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import cacheLog from "@/atoms/CacheLog.json"; // Import your JSON data

const CacheLog = () => {
  const navigate = useNavigate();
  const tableHead = [
    { title: "No", field: "id" },
    { title: "Timestamp", field: "timestamp" },
    { title: "Message", field: "message" },
    { title: "Server", field: "server" },
  ];

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Filtering and sorting logic
  const filteredData = cacheLog
    .filter(item => item.message.includes(search)) // Filter by message content
    .sort((a, b) => {
      if (sortColumn) {
        const order = sortOrder === "asc" ? 1 : -1;
        return a[sortColumn] > b[sortColumn] ? order : -order;
      }
      return 0;
    });

  const onSearch = (value) => {
    setSearch(value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (field === sortColumn) {
      return sortOrder === "asc" ? <BiSortUp /> : <BiSortDown />;
    }
    return <BiSortUp className="text-gray-300" />;
  };

  const handlePageClick = (e) => {
    const newOffset = e.selected * limit;
    setOffset(newOffset);
  };

  const handleSelect = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          Monitoring Cache Log
        </h1>
        <button
          className="text-xs md:text-sm whitespace-nowrap font-medium px-4 py-2 bg-[#0F172A] hover:bg-gray-800 active:bg-[#0F172A] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => navigate("/cache/server")}
        >
          Ganti Server
        </button>
      </div>
      <br />
      <CardContainer>
        <div className="w-full flex text-gray-600">
          <div className="p-1 text-lg mr-3">{icons.fisearch}</div>
          <input
            type="text"
            className="w-full"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </CardContainer>
      <br />

      {/* Content */}
      <CardContainer>
        <div className="overflow-y-auto custom-scroll">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {tableHead.map((item, itemIdx) => (
                  <th
                    key={itemIdx}
                    className="p-2 text-sm whitespace-nowrap"
                    onClick={() => {
                      item.field && handleSort(item.field);
                    }}
                  >
                    <span className="flex text-center items-center gap-2 justify-center">
                      {item.title}
                      {item.field && renderSortIcon(item.field)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Render filtered data */}
              {filteredData
                .slice(offset, offset + limit)
                .map((item, itemIdx) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                  >
                    <td className="p-2 text-center whitespace-nowrap">
                      {itemIdx + offset + 1}
                    </td>
                    <td className="p-2 text-center">{item.timestamp}</td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {item.message}
                    </td>
                    <td className="p-2 text-center">{item.server}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={Math.ceil(filteredData.length / limit)}
          limit={limit}
          setLimit={handleSelect}
        />
      </CardContainer>
    </Fragment>
  );
};

export default CacheLog;

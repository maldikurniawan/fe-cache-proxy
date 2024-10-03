import React, { useState, Fragment, useCallback, useEffect } from "react";
import { CardContainer, Pagination } from "@/components";
import { icons } from "../../../public/assets/icons";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/actions";
import { API_URL_useragent } from "@/constants";
import { useragentReducers } from "@/redux/useragentSlice";
// import Moment from "react-moment";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const UserAgentLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableHead = [
    { title: "No", field: "idlog" },
    { title: "Ip Address", field: "ip" },
    { title: "Tanggal Akses", field: "date" },
    { title: "User Agent", field: "device" },
    { title: "Server", field: "server" },
  ];
  const {
    getUserAgentResult,
    getUserAgentLoading,
    getUserAgentError,
  } = useSelector((state) => state.useragent);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const get = useCallback(
    async (params) => {
      getData(
        API_URL_useragent,
        params,
        { dispatch, redux: useragentReducers },
        "GET_USERAGENT"
      );
    },
    [dispatch]
  );

  const onSearch = (value) => {
    setSearch(value);
    const params = `?limit=${limit}&offset=${""}&ordering=${""}&search=${value}`;
    get(params);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Sort icons
  const renderSortIcon = (field) => {
    if (field === sortColumn) {
      return sortOrder === "asc" ? (
        <BiSortUp />
      ) : (
        <BiSortDown />
      );
    }
    return <BiSortUp className="text-gray-300" />;
  };

  const handlePageClick = (e) => {
    const offset = e.selected * limit;
    const params = `?limit=${limit}&offset=${offset}&ordering=${sortOrder === "desc" ? "-" : ""}${sortColumn}&search=${search}`;
    get(params);
    setOffset(offset);
  };

  const handleSelect = (limit) => {
    const params = `?limit=${limit}&offset=${offset}&ordering=${sortOrder === "desc" ? "-" : ""}${sortColumn}&search=${search}`;
    get(params);
    setLimit(limit);
  };

  const fetchData = useCallback(() => {
    const params = `?limit=${limit}&offset=${""}&ordering=${sortOrder === "desc" ? "-" : ""}${sortColumn}&search=${""}`;
    get(params);
  }, [get, sortColumn, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [sortColumn, sortOrder]);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          Monitoring User Agent Log
        </h1>
        <button
          className="text-xs md:text-sm whitespace-nowrap font-medium px-4 py-2 bg-[#0F172A] hover:bg-gray-800 active:bg-[#0F172A] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => navigate("/useragent/server")}
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
              {/* Loading */}
              {getUserAgentLoading && (
                <tr>
                  <td
                    className="text-center py-12"
                    colSpan={tableHead.length + 1}
                  >
                    <div className="pt-10 pb-6 flex justify-center items-center">
                      <SyncLoader color="#111827" />
                    </div>
                  </td>
                </tr>
              )}

              {/* Error */}
              {getUserAgentError && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                      {getUserAgentError}
                    </div>
                  </td>
                </tr>
              )}

              {/* Result = 0 */}
              {getUserAgentResult && getUserAgentResult.results.length === 0 && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                      No Data
                    </div>
                  </td>
                </tr>
              )}

              {getUserAgentResult && getUserAgentResult.results.map((item, itemIdx) => (
                <tr
                  key={itemIdx}
                  className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                >
                  <td className="p-2 text-center whitespace-nowrap">
                    {itemIdx + offset + 1}
                  </td>
                  <td className="p-2 text-center">{item.ip}</td>
                  <td className="p-2 text-center whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.device}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap">
                    {item.server}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={getUserAgentResult.count > 0 ? getUserAgentResult.count : 0}
          limit={limit}
          setLimit={handleSelect}
        />
      </CardContainer>
    </Fragment>
  );
};

export default UserAgentLog;

import React, { useState, Fragment, useCallback, useEffect, useContext } from "react";
import { CardContainer, Pagination, AccessUpdate } from "@/components";
import { icons } from "../../../public/assets/icons";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { postFilter } from "@/actions";
import { API_URL_accessfilter } from "@/constants";
import { accessReducers } from "@/redux/accessSlice";
// import Moment from "react-moment";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";

const AccessLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableHead = [
    { title: "No", field: "id" },
    { title: "Tanggal", field: "timestamp" },
    { title: "Durasi", field: "elapsed_time" },
    { title: "IP Address", field: "client_address" },
    { title: "Result Codes", field: "http_status" },
    { title: "Bytes", field: "bytes" },
    { title: "Request Method", field: "request_method" },
    { title: "URL", field: "request_url" },
    { title: "Hierarchy Code", field: "host" },
  ];
  const {
    getAccessResult,
    getAccessLoading,
    getAccessError,
    id_server,
  } = useSelector((state) => state.access);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { colorMode } = useContext(ThemeContext);

  // Format Durasi
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  // Format Bytes
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Byte';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Api Filter
  const get = useCallback(
    async (params) => {
      await postFilter(
        API_URL_accessfilter,
        { dispatch, redux: accessReducers },
        "GET_ACCESS",
        {
          server_id: id_server,
        },
        params,
      );
    },
    [dispatch, id_server]
  );

  // console.log(getAccessResult)

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
      <AccessUpdate />
      <div className="flex justify-between items-center">
        <h1 className="text-lg dark:text-white md:text-3xl font-bold transition-all">
          Monitoring Access Log
        </h1>
        <button
          className="text-xs md:text-sm whitespace-nowrap font-medium px-4 py-2 bg-[#0F172A] hover:bg-gray-800 active:bg-[#0F172A] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => navigate("/access/server")}
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
            className="w-full dark:bg-gray-800 dark:text-gray-100"
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
              {getAccessLoading && (
                <tr>
                  <td
                    className="text-center py-12"
                    colSpan={tableHead.length + 1}
                  >
                    <div className="pt-10 pb-6 flex justify-center items-center">
                      <SyncLoader color={colorMode === "dark" ? "#F3F4F6" : "#111827"} />
                    </div>
                  </td>
                </tr>
              )}

              {/* Error */}
              {getAccessError && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                      {getAccessError}
                    </div>
                  </td>
                </tr>
              )}

              {/* Result = 0 */}
              {getAccessResult && getAccessResult.results.data.length === 0 && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                      No Data
                    </div>
                  </td>
                </tr>
              )}

              {getAccessResult && getAccessResult.results.data.map((item, itemIdx) => (
                <tr
                  key={itemIdx}
                  className="border-b border-gray-200 text-sm hover:bg-white/30 transition-all"
                >
                  <td className="p-2 text-center whitespace-nowrap">
                    {itemIdx + offset + 1}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {/* <Moment unix>{item.timestamp}</Moment> */}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatDuration(item.elapsed_time)}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.client_address}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.http_status}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatBytes(item.bytes)}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.request_method}
                  </td>
                  <td className="p-2">
                    {item.request_url}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.host}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={getAccessResult.count > 0 ? getAccessResult.count : 0}
          limit={limit}
          setLimit={handleSelect}
        />
      </CardContainer>
    </Fragment>
  );
};

export default AccessLog;

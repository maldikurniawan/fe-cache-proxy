import React, { useState, Fragment, useCallback, useEffect } from "react";
import { CompCardContainer, CompPagination } from "../../components/index";
import { icons } from "../../../public/assets/icons";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/index";
import { API_URL_cache } from "../../constants";
import { monitoringReducers } from "../../redux/monitoringSlice";
import Moment from "react-moment";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const MonitoringPage = () => {
  const dispatch = useDispatch();
  const tableHead = [
    { title: "No", field: "idlog" },
    { title: "Ip Address", field: "ip" },
    { title: "URL", field: "url" },
    { title: "Tanggal Akses", field: "timestamp" },
  ];
  const {
    getMonitoringResult,
    getMonitoringLoading,
    getMonitoringError,
  } = useSelector((state) => state.monitoring);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const get = useCallback(
    async (params) => {
      getData(
        API_URL_cache,
        params,
        { dispatch, redux: monitoringReducers },
        "GET_MONITORING"
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
          Monitoring Access Log
        </h1>
      </div>
      <br />
      <CompCardContainer>
        <div className="w-full flex text-gray-600">
          <div className="p-1 text-lg mr-3">{icons.fisearch}</div>
          <input
            type="text"
            className="w-full"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </CompCardContainer>
      <br />

      {/* Content */}
      <CompCardContainer>
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
              {getMonitoringLoading && (
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
              {getMonitoringError && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                      {getMonitoringError}
                    </div>
                  </td>
                </tr>
              )}

              {/* Result = 0 */}
              {getMonitoringResult && getMonitoringResult.results.length === 0 && (
                <tr>
                  <td className="text-center" colSpan={tableHead.length + 1}>
                    <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                      No Data
                    </div>
                  </td>
                </tr>
              )}

              {getMonitoringResult && getMonitoringResult.results.map((item, itemIdx) => (
                <tr
                  key={itemIdx}
                  className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                >
                  <td className="p-2 text-center whitespace-nowrap">
                    {itemIdx + offset + 1}
                  </td>
                  <td className="p-2 text-center">{item.ip}</td>
                  <td className="p-2 text-center whitespace-nowrap">
                    {item.url}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap">
                    <Moment unix>
                      {item.timestamp}
                    </Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CompPagination
          handlePageClick={handlePageClick}
          pageCount={getMonitoringResult.count > 0 ? getMonitoringResult.count : 0}
          limit={limit}
          setLimit={handleSelect}
        />
      </CompCardContainer>
    </Fragment>
  );
};

export default MonitoringPage;

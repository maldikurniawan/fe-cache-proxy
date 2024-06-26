import React, { useState, Fragment, useCallback, useEffect } from "react";
import { CompCardContainer, CompPagination } from "../../components/index";
import { icons } from "../../assets/icons";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getData } from "../../actions/index";
import { API_URL_cache } from "../../constants";
import { monitoringReducers } from "../../redux/monitoringSlice";
import Moment from "react-moment";

const MonitoringPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableHead = ["No", "Ip Address", "URL", "Tanggal Akses"];
  const {
    getMonitoringResult,
    getMonitoringLoading,
    getMonitoringError,
  } = useSelector((state) => state.monitoring);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

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
    const params = `?limit=${""}&offset=${""}&search=${value}`;
    get(params);
  };

  const handlePageClick = (e) => {
    const offset = e.selected * limit;
    const params = `?limit=${limit}&offset=${offset}&search=${search}`;
    get(params);
    setOffset(offset);
  };

  const handleSelect = (limit) => {
    const params = `?limit=${limit}&offset=${offset}&search=${search}`;
    get(params);
    setLimit(limit);
  };

  const fetchData = useCallback(() => {
    const params = `?limit=${limit}&offset=${""}&search=${""}`;
    get(params);
  }, [get]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          Monitoring Cache Server
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
                  <th key={itemIdx} className="p-2 text-sm whitespace-nowrap">
                    {item}
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
              {getMonitoringResult && getMonitoringResult.length === 0 && (
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
                    {/* <td className="p-2 text-center whitespace-nowrap">
                      {action.map((action, actionIdx) => (
                        <button
                          key={actionIdx}
                          className={`mx-1 ${action.color}`}
                          onClick={() => action.func(item)}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </td> */}
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

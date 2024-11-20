import React, { useState, Fragment, useCallback, useEffect, useContext } from "react";
import { CardContainer, Pagination } from "@/components";
import { icons } from "../../../public/assets/icons";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData } from "@/actions";
import { API_URL_getserver, API_URL_edelserver } from "@/constants";
import { serverReducers } from "@/redux/serverSlice";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/context/ThemeContext";

const ServerPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tableHead = [
        { title: "No", field: "id" },
        { title: "Nama Server", field: "server_name" },
        { title: "Ip Address", field: "ip_address" },
        { title: "Lokasi", field: "location" },
        { title: "Email Admin", field: "admin_contact" },
        { title: "Sistem Operasi", field: "system_operation" },
        { title: "Created at", field: "created_at" },
        { title: "Action" },
    ];
    const {
        getServerResult,
        getServerLoading,
        getServerError,
        addServerResult,
        deleteServerResult,
    } = useSelector((state) => state.server);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const { colorMode } = useContext(ThemeContext);

    const get = useCallback(
        async (params) => {
            getData(
                API_URL_getserver,
                params,
                { dispatch, redux: serverReducers },
                "GET_SERVER"
            );
        },
        [dispatch]
    );

    const onDelete = (item) => {
        deleteData(
            `${API_URL_edelserver}${item.id}/`,
            { dispatch, redux: serverReducers },
            "DELETE_SERVER"
        );
    };

    const onEdit = (item) => {
        navigate(`/server/form/${item.id}`, {
            state: {
                item,
            }
        });
    };

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

    const action = [
        {
            name: "edit",
            icon: icons.fiedit,
            color: "text-blue-500",
            func: onEdit,
        },
        {
            name: "hapus",
            icon: icons.rideletebin6line,
            color: "text-red-500",
            func: onDelete,
        },
    ];

    const fetchData = useCallback(() => {
        const params = `?limit=${limit}&offset=${""}&ordering=${sortOrder === "desc" ? "-" : ""}${sortColumn}&search=${""}`;
        get(params);
    }, [get, sortColumn, sortOrder]);

    useEffect(() => {
        fetchData();
    }, [sortColumn, sortOrder]);

    useEffect(() => {
        if (addServerResult) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addServerResult]);
    
    useEffect(() => {
        if (deleteServerResult) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteServerResult]);

    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-3xl dark:text-white font-bold transition-all">
                    Kelola Server
                </h1>
                <button
                    className="text-xs md:text-sm whitespace-nowrap font-medium px-4 py-2 bg-[#0F172A] hover:bg-gray-800 active:bg-[#0F172A] text-white rounded-lg shadow hover:shadow-lg transition-all"
                    onClick={() => navigate("/server/form")}
                >
                    Tambah Server
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
                            {getServerLoading && (
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
                            {getServerError && (
                                <tr>
                                    <td className="text-center" colSpan={tableHead.length + 1}>
                                        <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                                            {getServerError}
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* Result = 0 */}
                            {getServerResult && getServerResult.results.length === 0 && (
                                <tr>
                                    <td className="text-center" colSpan={tableHead.length + 1}>
                                        <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                                            No Data
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {getServerResult && getServerResult.results.map((item, itemIdx) => (
                                <tr
                                    key={itemIdx}
                                    className="border-b border-gray-200 text-sm hover:bg-white/30 transition-all"
                                >
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {itemIdx + offset + 1}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.server_name}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.ip_address}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.location}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.admin_contact}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.system_operation}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {item.created_at}
                                    </td>
                                    <td className="p-2 text-center whitespace-nowrap">
                                        {action.map((action, actionIdx) => (
                                            <button
                                                key={actionIdx}
                                                className={`mx-1 ${action.color}`}
                                                onClick={() => action.func(item)}
                                            >
                                                {action.icon}
                                            </button>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    handlePageClick={handlePageClick}
                    pageCount={getServerResult.count > 0 ? getServerResult.count : 0}
                    limit={limit}
                    setLimit={handleSelect}
                />
            </CardContainer>
        </Fragment>
    );
};

export default ServerPage;

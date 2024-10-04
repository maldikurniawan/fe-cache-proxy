import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoMdReturnLeft } from "react-icons/io";
import {
    CardContainer,
    InputField,
} from '@/components';
import { useDispatch } from 'react-redux';
import { postData, putData } from '@/actions';
import { serverReducers } from '@/redux/serverSlice';
import { API_URL_getserver, API_URL_edelserver } from '@/constants';

const ServerForm = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEdit = id && id !== 'add';

    const formik = useFormik({
        initialValues: {
            server_name: state?.item?.server_name,
            ip_address: state?.item?.ip_address,
            location: state?.item?.location,
            admin_contact: state?.item?.admin_contact,
            system_operation: state?.item?.system_operation,
        },
        validationSchema: Yup.object().shape({
            server_name: Yup.string().required("Nama Server is required"),
            ip_address: Yup.string().required("Ip Address is required"),
            location: Yup.string().required("Lokasi is required"),
            admin_contact: Yup.string().required("Email Admin is required"),
        }),
        onSubmit: async (values) => {
            try {
                if (isEdit) {
                    await putData(
                        { dispatch, redux: serverReducers },
                        { id: id, ...values },
                        API_URL_edelserver,
                        'UPDATE_SERVER'
                    );
                } else {
                    await postData(
                        { dispatch, redux: serverReducers },
                        values,
                        API_URL_getserver,
                        'ADD_SERVER'
                    );
                }
                navigate('/server');
            } catch (error) {
                console.error('Error in form submission: ', error);
            }
        },
    });

    return (
        <div>
            <CardContainer>
                <div className='flex items-center gap-2 mb-4'>
                    <button
                        className="text-xs md:text-sm whitespace-nowrap font-medium p-2 bg-[#0F172A] text-white rounded-full shadow hover:shadow-lg transition-all"
                        onClick={() => navigate("/server")}
                    >
                        <IoMdReturnLeft />
                    </button>
                    <h1>{isEdit ? 'Edit Server' : 'Tambah Server'}</h1>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit} className='space-y-6'>
                        <InputField
                            required
                            label="Nama Server"
                            name="server_name"
                            value={formik.values.server_name || ''} // Ensure value is always defined
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.server_name && formik.errors.server_name}
                        />
                        <InputField
                            required
                            label="Ip Address"
                            name="ip_address"
                            value={formik.values.ip_address || ''} // Ensure value is always defined
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.ip_address && formik.errors.ip_address}
                        />
                        <InputField
                            required
                            label="Lokasi"
                            name="location"
                            value={formik.values.location || ''} // Ensure value is always defined
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && formik.errors.location}
                        />
                        <InputField
                            required
                            type="email"
                            label="Email Admin"
                            name="admin_contact"
                            value={formik.values.admin_contact || ''} // Ensure value is always defined
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.admin_contact && formik.errors.admin_contact}
                        />
                        <InputField
                            label="Sistem Operasi"
                            name="system_operation"
                            value={formik.values.system_operation || ''} // Ensure value is always defined
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.system_operation && formik.errors.system_operation}
                        />
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-opacity-50"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </CardContainer>
        </div>
    );
}

export default ServerForm;

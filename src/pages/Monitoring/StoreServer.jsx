// StoreServer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoMdReturnLeft } from 'react-icons/io';
import { CardContainer, SelectField } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { set_id_server } from '@/redux/storeSlice'; // Correctly import the action
import { API_URL_getserver } from '@/constants';

const StoreServer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id_server } = useSelector((state) => state.store);
  const [serverOptions, setServerOptions] = useState([]);
  console.log(id_server)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_getserver);
        if (!response.ok) {
          throw new Error('Failed to fetch server options');
        }
        const data = await response.json();
        setServerOptions(
          data.map((item) => ({
            value: item.id,
            label: item.server_name,
          }))
        );
      } catch (error) {
        console.error('Error fetching server options:', error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      server_id: '', // Set initial value directly
    },
    validationSchema: Yup.object({
      server_id: Yup.string().required('Server ID is required'),
    }),
    onSubmit: (values) => {
      try {
        // Dispatch the action to update the server ID in Redux state
        dispatch(set_id_server(values.server_id));
        console.log('Updated Server ID:', values.server_id); // Log the new value
        navigate('/store');
      } catch (error) {
        console.error('Error updating server ID:', error);
      }
    },
  });

  return (
    <div>
      <CardContainer>
        <div className="flex items-center gap-2 mb-4">
          <button
            className="text-xs md:text-sm whitespace-nowrap font-medium p-2 bg-[#0F172A] text-white rounded-full shadow hover:shadow-lg transition-all"
            onClick={() => navigate('/store')}
          >
            <IoMdReturnLeft />
          </button>
          <h1>Ganti Server</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <SelectField
            required
            label="Server ID"
            name="server_id"
            options={serverOptions}
            value={formik.values.server_id}
            onChange={(e) => formik.setFieldValue('server_id', e.target.value)} // Ensure the value is correctly set
            onBlur={formik.handleBlur}
            error={formik.touched.server_id && formik.errors.server_id}
          />
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
};

export default StoreServer;

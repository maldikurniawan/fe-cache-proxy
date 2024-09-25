import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoMdReturnLeft } from 'react-icons/io';
import { CardContainer, SelectField } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { putData } from '@/actions';
import { serverReducers } from '@/redux/serverSlice';
import { API_URL_getserver, API_URL_edelserver } from '@/constants';

const CacheServer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id_server} = useSelector((state)=>state.cache);
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
      server_id: '', // Set initial value directly, no dependency on state
    },
    validationSchema: Yup.object().shape({
      server_id: Yup.string().required('Server ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        await putData(
          { dispatch, redux: serverReducers },
          values,
          API_URL_edelserver,
          'UPDATE_SERVER'
        );
        navigate('/cache');
      } catch (error) {
        console.error('Error in form submission:', error);
      }
    },
  });

  return (
    <div>
      <CardContainer>
        <div className="flex items-center gap-2 mb-4">
          <button
            className="text-xs md:text-sm whitespace-nowrap font-medium p-2 bg-[#0F172A] text-white rounded-full shadow hover:shadow-lg transition-all"
            onClick={() => navigate('/cache')}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.server_id && formik.errors.server_id}
          />
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </CardContainer>
    </div>
  );
};

export default CacheServer;

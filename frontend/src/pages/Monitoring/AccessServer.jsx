import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoMdReturnLeft } from "react-icons/io";
import {
  CardContainer,
  SelectField,
} from '@/components';
import { useDispatch } from 'react-redux';
import { postData, putData } from '@/actions';
import { serverReducers } from '@/redux/serverSlice';
import { API_URL_getserver, API_URL_edelserver } from '@/constants';

const AccessServer = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverOptions, setServerOptions] = useState([]);

  const isEdit = id && id !== 'add';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAPI.get(API_URL_getserver);
        setServerOptions(response.data.map((item) => ({
          value: item.id,
          label: item.nama,
        })));
      } catch (error) {
        console.error('Error fetching server options: ', error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      server_id: state?.item?.server_id,
    },
    validationSchema: Yup.object().shape({
      server_id: Yup.string().required("Server ID is required"),
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
        navigate('/access');
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
            onClick={() => navigate("/access")}
          >
            <IoMdReturnLeft />
          </button>
          <h1>{isEdit ? 'Edit Server' : 'Tambah Server'}</h1>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <SelectField
              required
              label="Server ID"
              name="server_id"
              options={serverOptions}
              value={formik.values.server_id || ''}
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
        </div>
      </CardContainer>
    </div>
  );
}

export default AccessServer;

import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { API_URL_updatesuperuser } from '@/constants';
import { ThemeContext } from "@/context/ThemeContext";
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    CardContainer,
    InputField,
    SelectField,
    TextAreaField,
    ImageField,
} from '@/components';
import { SyncLoader } from 'react-spinners';

const ProfilePage = () => {
    const { colorMode } = useContext(ThemeContext);
    const [initialValues, setInitialValues] = useState({
        nama_lengkap: '',
        username: '',
        email: '',
        password: '',
        no_ktp: '',
        jenis_kelamin: '',
        no_telp: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        agama: '',
        npwp: '',
        alamat_ktp: '',
        alamat_domisili: '',
        foto_profile: null,
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        axios
            .get(`${API_URL_updatesuperuser}${userId}/`)
            .then((response) => {
                const { user, user_data } = response.data;

                // Set the initial values after fetching user data
                setInitialValues({
                    nama_lengkap: user_data.nama_lengkap,
                    username: user.username,
                    email: user.email,
                    password: '',
                    no_ktp: user_data.no_ktp,
                    jenis_kelamin: user_data.jenis_kelamin,
                    no_telp: user_data.no_telp,
                    tempat_lahir: user_data.tempat_lahir,
                    tanggal_lahir: user_data.tanggal_lahir,
                    agama: user_data.agama,
                    npwp: user_data.npwp,
                    alamat_ktp: user_data.alamat_ktp,
                    alamat_domisili: user_data.alamat_domisili,
                    foto_profile: null,
                });

                setProfileImageUrl(user_data.foto_profile); // Set the profile image URL
                setCurrentPassword(''); // Set current password (could be fetched too if necessary)
                setLoading(false); // Data has been fetched
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false); // Ensure loading state is updated
            });
    }, [userId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            nama_lengkap: Yup.string().required('Nama Lengkap is required'),
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters'),
            no_ktp: Yup.string().required('No Identitas is required'),
            jenis_kelamin: Yup.string().required('Jenis Kelamin is required'),
            no_telp: Yup.string().required('No Telp is required'),
            tempat_lahir: Yup.string().required('Tempat Lahir is required'),
            tanggal_lahir: Yup.date().required('Tanggal Lahir is required'),
            agama: Yup.string().required('Agama is required'),
            npwp: Yup.string().required('NPWP is required'),
            foto_profile: Yup.mixed().nullable(),
        }),
        onSubmit: (values, { setSubmitting }) => {
            const updatedValues = {
                ...values,
                password: values.password ? values.password : currentPassword,
            };

            const formData = new FormData();
            Object.keys(updatedValues).forEach(key => {
                if (key === 'foto_profile' && updatedValues[key]) {
                    formData.append(key, updatedValues[key]);
                } else {
                    formData.append(key, updatedValues[key]);
                }
            });

            axios
                .put(`${API_URL_updatesuperuser}${userId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Good job!",
                        customClass: {
                            container: "z-[99999]",
                        },
                        text: response.data.messages,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setSubmitting(false);
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        customClass: {
                            container: "z-[99999]",
                        },
                        text: error.response?.data?.message || error.message,
                    });
                    setSubmitting(false);
                });
        },
    });

    // Render loading state or form
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SyncLoader color={colorMode === "dark" ? "#F3F4F6" : "#111827"} loading={loading} />
            </div>
        );
    }

    return (
        <div>
            <CardContainer>
                <h2 className="text-2xl font-bold text-center mb-2">Edit Profile</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <InputField
                            required
                            label="Nama Lengkap"
                            name="nama_lengkap"
                            value={formik.values.nama_lengkap}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nama_lengkap && formik.errors.nama_lengkap}
                        />
                        <div className='sm:grid grid-cols-3 grid-rows-1 gap-4 max-[640px]:space-y-4'>
                            <InputField
                                required
                                label="Username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && formik.errors.username}
                            />
                            <InputField
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Leave blank to keep unchanged"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
                            />
                        </div>
                        <div className='sm:grid grid-cols-2 grid-rows-1 gap-4 max-[640px]:space-y-4'>
                            <InputField
                                required
                                label="No Identitas (KTP)"
                                name="no_ktp"
                                value={formik.values.no_ktp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.no_ktp && formik.errors.no_ktp}
                            />
                            <SelectField
                                required
                                label="Jenis Kelamin"
                                name="jenis_kelamin"
                                options={[
                                    { value: 'Laki-laki', label: 'Laki-laki' },
                                    { value: 'Perempuan', label: 'Perempuan' },
                                ]}
                                value={formik.values.jenis_kelamin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.jenis_kelamin && formik.errors.jenis_kelamin}
                            />
                        </div>
                        <div className='sm:grid grid-cols-2 grid-rows-1 gap-4 max-[640px]:space-y-4'>
                            <InputField
                                required
                                label="No Telp"
                                name="no_telp"
                                value={formik.values.no_telp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.no_telp && formik.errors.no_telp}
                            />
                            <InputField
                                required
                                label="Tempat Lahir"
                                name="tempat_lahir"
                                value={formik.values.tempat_lahir}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tempat_lahir && formik.errors.tempat_lahir}
                            />
                        </div>
                        <div className='sm:grid grid-cols-3 grid-rows-1 gap-4 max-[640px]:space-y-4'>
                            <InputField
                                required
                                label="Tanggal Lahir"
                                name="tanggal_lahir"
                                type="date"
                                value={formik.values.tanggal_lahir}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tanggal_lahir && formik.errors.tanggal_lahir}
                            />
                            <SelectField
                                required
                                label="Agama"
                                name="agama"
                                options={[
                                    { value: 'Islam', label: 'Islam' },
                                    { value: 'Kristen', label: 'Kristen' },
                                    { value: 'Hindu', label: 'Hindu' },
                                    { value: 'Buddha', label: 'Buddha' },
                                    { value: 'Konghucu', label: 'Konghucu' },
                                ]}
                                value={formik.values.agama}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.agama && formik.errors.agama}
                            />
                            <InputField
                                required
                                label="NPWP"
                                name="npwp"
                                value={formik.values.npwp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.npwp && formik.errors.npwp}
                            />
                        </div>
                        <TextAreaField
                            label="Alamat KTP"
                            name="alamat_ktp"
                            value={formik.values.alamat_ktp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.alamat_ktp && formik.errors.alamat_ktp}
                        />
                        <TextAreaField
                            label="Alamat Domisili"
                            name="alamat_domisili"
                            value={formik.values.alamat_domisili}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.alamat_domisili && formik.errors.alamat_domisili}
                        />
                        <div>
                            {profileImageUrl && (
                                <div className='flex justify-center'>
                                    <img
                                        src={profileImageUrl}
                                        alt="Profile"
                                        className="mt-2 h-32 w-32 object-cover rounded-full"
                                    />
                                </div>
                            )}
                            <ImageField
                                label="Foto Profile"
                                name="foto_profile"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    formik.setFieldValue("foto_profile", file);

                                    // Check if a file is selected and is of valid type
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            // Update the profile image URL with the new file
                                            setProfileImageUrl(reader.result);
                                        };
                                        reader.readAsDataURL(file); // Read the file as a data URL
                                    } else {
                                        // Reset to current image if no file is selected
                                        setProfileImageUrl(user_data.foto_profile);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.foto_profile && formik.errors.foto_profile}
                            />
                        </div>

                    </div>
                    <div className='my-4 mt-8'>
                        <button
                            type="submit"
                            className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-opacity-50"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </CardContainer>
        </div>
    );
};

export default ProfilePage;

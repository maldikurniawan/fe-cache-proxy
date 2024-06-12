import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FaPen, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserAccount = () => {

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [search, setSearch] = useState("");

  let limit = 5;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/json?limit=${limit}`
        // `https://jsonplaceholder.typicode.com/users?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getComments();
  }, [limit]);

  const onSearch = (value) => {
    setSearch(value);
    delayedSearch(value);
  };

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://127.0.0.1:8000/json?limit=${limit}&offset=${currentPage}`
      // `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  //Create
  const [inputData, setInputData] = useState({ first_name: '', last_name: '', email: '', password: '' })
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/users', inputData)
      .then(res => {
        alert("Data Berhasil Ditambah!");
        navigate('/userAccount');
      }).catch(err => console.log(err));
  }

  //Edit
  // const { id } = useParams();
  const [perItem, setPerItem] = useState([])

  const handleView = (item) => {
    setPerItem(item)
    setShowEdit(true)
  }

  const data = {
    first_name: 'apip',
    last_name: 'yulis',
    email: 'apip@gmail.com',
    password: 'apip2002',
  };

  function handleEdit(event) {
    event.preventDefault()
    axios.put('http://127.0.0.1:8000/user/' + perItem.id + '/', data)
      .then(res => {
        alert("Data Berhasil Diupdate!");
        navigate('/userAccount');
      }).catch(err => console.log(err));
  }

  // Delete
  function handleDelete(id) {
    const conf = window.confirm('Anda Yakin Ingin Menghapus Data?')
    axios.delete('http://127.0.0.1:8000/user/' + id + '/')
      .then(res => {
        alert("Data Berhasil Dihapus!");
        navigate('/userAccount');
      }).catch(err => console.log(err));
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Kelola Akun User</strong><br />
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setShowModal(true)}>Tambah Data</button>
      {/* button perpage and input search  */}
      <div className="flex flex-col md:flex-row md:justify-between align-middle mb-4 ">
        <div className="p-1 inline-block align-middle">
          <select
            id="limit"
            value={limit}
            onChange={(e) => handleSelectLimit(e.target.value)}
            className="border rounded-sm p-1 border-gray-300  focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-neutral-600 dark:border-neutral-800 dark:focus:ring-blue-800 dark:focus:border-blue-800 dark:text-neutral-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
          <span className="mx-2 text-sm ">Records per page</span>
        </div>
        <div className="p-1 inline-block align-middle">
          <span className="text-sm mr-2">Search:</span>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search ..."
            className="p-1 border border-gray-300 focus:border-blue-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-neutral-600 dark:border-neutral-800 dark:focus:ring-blue-800 dark:focus:border-blue-800 dark:text-neutral-200"
          />
        </div>
      </div>
      <div className="border-x border-gray-200 rounded-sm">
        <table className="w-full text-gray-700 mb-2">
          <thead>
            <tr>
              <th className='border border-slate-300'>No</th>
              <th className='border border-slate-300'>Nama Depan</th>
              <th className='border border-slate-300'>Nama Belakang</th>
              {/* <th className='border border-slate-300'>Nama</th>
              <th className='border border-slate-300'>Username</th> */}
              <th className='border border-slate-300'>Email</th>
              <th className='border border-slate-300'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) &&
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className='border border-slate-300'>{index + 1}</td>
                    <td className='border border-slate-300'>{item.first_name}</td>
                    <td className='border border-slate-300'>{item.last_name}</td>
                    {/* <td className='border border-slate-300'>{item.name}</td>
                    <td className='border border-slate-300'>{item.username}</td> */}
                    <td className='border border-slate-300'>{item.email}</td>
                    <td className='border border-slate-300'>
                      <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900" onClick={() => handleView(item)}><FaPen /></button>
                      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={e => handleDelete(item.id)}><FaTrash /></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <ReactPaginate
        className="items-center flex justify-center space-x-1 list-none"
        previousLabel={<IoIosArrowBack className="inline" />}
        nextLabel={<IoIosArrowForward className="inline" />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex items-center justify-center mt-6"}
        pageClassName={"inline-block mx-1"}
        pageLinkClassName={"px-3 py-1.5 border dark:border-neutral-600 border-gray-300 text-blue-600 dark:text-white hover:bg-sky-500 hover:text-white dark:hover:bg-gray-500"}
        previousClassName={"inline-block mx-1"}
        previousLinkClassName={"px-3 py-1.5 border dark:border-neutral-600 border-gray-300 text-blue-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"}
        nextClassName={"inline-block mx-1"}
        nextLinkClassName={"px-3 py-1.5 border dark:border-neutral-600 border-gray-300 text-blue-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"}
        activeLinkClassName="bg-sky-500 text-white cursor-default"
      />
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Form Tambah Data
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input type="text" name='first_name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' onChange={e => setInputData({ ...inputData, first_name: e.target.value })} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input type="text" name='last_name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' onChange={e => setInputData({ ...inputData, last_name: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                      <input type="email" name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' onChange={e => setInputData({ ...inputData, email: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' onChange={e => setInputData({ ...inputData, password: e.target.value })} />
                    </div>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={handleSubmit}
                    >
                      Tambah Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showEdit ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Form Edit Data
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEdit(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input type="text" name='first_name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' value={perItem.first_name} onChange={e => setPerItem({ ...perItem, first_name: e.target.value })} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input type="text" name='last_name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' value={perItem.last_name} onChange={e => setPerItem({ ...perItem, last_name: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                      <input type="email" name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' value={perItem.email} onChange={e => setPerItem({ ...perItem, email: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' value={""} />
                    </div>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowEdit(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button" onClick={handleEdit}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div >
  )
}

export default UserAccount
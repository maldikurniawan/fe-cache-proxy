import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FaPen, FaTrash } from "react-icons/fa";

const UserAccount = () => {

  const [data, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan!', error);
      });
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Kelola Akun User</strong><br />
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tambah Data</button>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className='border border-slate-300'>No</th>
              <th className='border border-slate-300'>Firstname</th>
              <th className='border border-slate-300'>Lastname</th>
              <th className='border border-slate-300'>Email</th>
              <th className='border border-slate-300'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr>
                    <td className='border border-slate-300'>{index + 1}</td>
                    <td className='border border-slate-300'>{item.first_name}</td>
                    <td className='border border-slate-300'>{item.last_name}</td>
                    <td className='border border-slate-300'>{item.email}</td>
                    <td className='border border-slate-300'>
                      <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900"><FaPen /></button>
                      <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><FaTrash /></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default UserAccount
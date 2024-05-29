import React from 'react'

const UserAccount = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Kelola Akun</strong>
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
            <tr>
              <td className='border border-slate-300'>1</td>
              <td className='border border-slate-300'>-</td>
              <td className='border border-slate-300'>-</td>
              <td className='border border-slate-300'>-</td>
              <td className='border border-slate-300'>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default UserAccount
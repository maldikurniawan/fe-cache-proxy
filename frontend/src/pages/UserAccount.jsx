import React from 'react'

const UserAccount = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Tambah Data User</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className='border border-slate-300'>No</th>
              <th className='border border-slate-300'>Customer Name</th>
              <th className='border border-slate-300'>Order Date</th>
              <th className='border border-slate-300'>Order Total</th>
              <th className='border border-slate-300'>Shipping Address</th>
              <th className='border border-slate-300'>Order Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300'>1</td>
              <td className='border border-slate-300'>-</td>
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
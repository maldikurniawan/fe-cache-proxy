import React, { useEffect, useState } from "react"
import Moment from 'react-moment'

export default function Cache() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch('http://localhost:8000/cachelog/', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          setData(data.data);
          setLoading(false);
          // console.log(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
    // return () => {
    //   console.log('Cleanup function called');
    // };

  }, []);

  // start with a Unix timestamp
  // const myUnixTimestamp = 1713496554.172; 

  // convert timestamp to milliseconds and construct Date object
  // const myDate = new Date(myUnixTimestamp * 1000); 
  
  // will print "Thu Aug 10 2023 01:13:20" followed by the local timezone on browser console
  // console.log(myDate); 

  // will print "Thu Aug 10 2023"
  // console.log(myDate.toDateString());

  // will print "01:13:20" followed by the local timezone
  // console.log(myDate.toTimeString()); 

  // Moment.globalFormat = 'D MMM YYYY';

  return (
    <div>
      {data && (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">Monitoring Cache Server PT. Queen Network Nusantara</strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th className='border border-slate-300'>No</th>
                  <th className='border border-slate-300'>IP Address</th>
                  <th className='border border-slate-300'>URL</th>
                  <th className='border border-slate-300'>Tanggal Akses</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='border border-slate-300'>{index + 1}</td>
                        <td className='border border-slate-300'>{item.ip_address}</td>
                        <td className='border border-slate-300'>{item.url}</td>
                        <td className='border border-slate-300'>
                          <Moment unix>
                            {item.timestamp}
                          </Moment>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div >
      )}
    </div>
  );
}
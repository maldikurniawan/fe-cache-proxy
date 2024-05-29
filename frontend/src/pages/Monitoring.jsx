import React, { useEffect, useState } from "react"

export default function Cache() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch('http://localhost:8000/cachelog/', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
          console.log(data['data'][0])
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
    return () => {
      console.log('Cleanup function called');
    };

  }, []);

  return (
    <div className="w-full max-w-lg">
      <h4 className="text-2xl">Your Gallery</h4>
      <p className="text-lg leading-relaxed text-gray-400">
        The best, you are the best...
      </p>
      {data && (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';

const ConfiscationReceiptLookup = () => {
  const [bookNo, setBookNo] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const searchReceipt = async () => {
    try {
      const res = await axios.get(`/pmc/confiscation-lookup/`, {
        params: { book_no: bookNo, receipt_no: receiptNo }
      });
      setData(res.data);
      setError('');
    } catch (err) {
      setError('No matching record found.');
      setData(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4">Confiscation Receipt Verification</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Receipt Book Number"
          value={bookNo}
          onChange={e => setBookNo(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Receipt Number"
          value={receiptNo}
          onChange={e => setReceiptNo(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={searchReceipt} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {data && (
        <div className="mt-4 border-t pt-4">
          <p><strong>Confiscation (KG):</strong> {data.total_confiscation}</p>
          <p><strong>Receipt Book #:</strong> {data.receipt_book_number}</p>
          <p><strong>Receipt #:</strong> {data.receipt_number}</p>
          <p><strong>Uploaded Receipt:</strong></p>
          <img src={data.receipt_url} alt="Confiscation Receipt" className="w-64 mt-2 border" />
        </div>
      )}
    </div>
  );
};

export default ConfiscationReceiptLookup;



import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../services/axiosInstance';

const ManageATS = ({ showmanage, onClose, atsDetails }) => {
  const { user } = useAuthStore();
  const [currentAts, setCurrentAts] = useState(null);

  const fetchAtsDetails = async (code) => {
    try {
      const res = await axiosInstance.get(`/centers/code/${code}`);
      setCurrentAts(res.data); // ✅ set state
    } catch (err) {
      console.error("Failed to fetch ATS details", err);
    }
  };

  useEffect(() => {
    if (atsDetails?.center?.code && showmanage) {
      fetchAtsDetails(atsDetails.center.code);
    }
  }, [atsDetails, showmanage]);

  const handleSuspend = async (id) => {
    try {
      await axiosInstance.post("centers/suspendAts", { id });
      alert("ATS Suspended Successfully");
      await fetchAtsDetails(atsDetails.center.code); // 🔁 refresh
    } catch (err) {
      console.error(err);
      alert("Error suspending ATS");
    }
  };

  const handleUnBlock = async (id) => {
    try {
      await axiosInstance.post("centers/unblockAts", { id });
      alert("ATS Unblocked Successfully");
      await fetchAtsDetails(atsDetails.center.code); // 🔁 refresh
    } catch (err) {
      console.error(err);
      alert("Error unblocking ATS");
    }
  };
const allowedRoles = ["SUPER_ADMIN", "OFFICER"];

if (!showmanage || !allowedRoles.includes(user?.role)) return null;

  return (
    <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50'>
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md relative'>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Manage ATS Center</h2>
        <p className="text-gray-600 mb-6">
          Center: <strong>{currentAts?.name || atsDetails?.center?.name || 'N/A'}</strong>
        </p>

        {!currentAts?.isSuspended ? (
        
          <button
            className='bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded mb-4'
            onClick={() => handleSuspend(currentAts?._id)}
          >
            Suspend ATS
          </button>
        ) : (
          <button
            className='bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded mb-4'
            onClick={() => handleUnBlock(currentAts?._id)}
          >
            Unblock ATS
          </button>
        )}

        <button
          className='bg-gray-300 hover:bg-gray-400 text-black w-full py-2 rounded'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageATS;

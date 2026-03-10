import React, { useEffect, useState } from 'react';
import { useAtsStore } from '../store/useAtsStore';
import { useVehiclestore } from '../store/useVehicleStoreOff';
import { Car } from 'lucide-react';
import axiosInstance from '../services/axiosInstance';
import { useAuthStore } from '../store/useAuthStore';
import ManageATS from '../officerComponents/ManageATS';

const ATScentres = () => {
  const atsFn = useAtsStore((s) => s.atsvehiclesfn);
  const ats = useAtsStore((s) => s.ats);
  const vehiclebyats = useVehiclestore((s) => s.getVehiclesById);
  const vehicles = useVehiclestore((s) => s.vehiclesByAts);
  const setvehicles = useVehiclestore((s) => s.setVehicles);
  const { user } = useAuthStore();

  const [view, setView] = useState('list');
  const [showForm, setShowForm] = useState(false);
  const [atsDetails, setAtsDetails] = useState({ id: '', name: '', code: '' });
  const [showManage, setShowManage] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', latitude: '', longitude: '' });
  const [message, setMessage] = useState('');

  useEffect(() => { atsFn(); }, [atsFn]);

  const pendingVehicles = vehicles.filter(v => v.status === 'PENDING');
  const inProgressVehicles = vehicles.filter(v => v.status === 'IN_PROGRESS');
  const completedVehicles = vehicles.filter(v => v.status === 'COMPLETED');
  const approvedVehicles = vehicles.filter(v => v.status === 'APPROVED');

  const vehicleCardDetails = [
    { title: 'Total Tests', value: vehicles.length, icon: Car, color: 'text-blue-600' },
    { title: 'Approved Tests', value: approvedVehicles.length, icon: Car, color: 'text-green-600' },
    { title: 'Pending Tests', value: pendingVehicles.length, icon: Car, color: 'text-yellow-600' },
    { title: 'Tests Completed', value: completedVehicles.length, icon: Car, color: 'text-purple-600' },
    { title: 'In Progress', value: inProgressVehicles.length, icon: Car, color: 'text-purple-600' },
  ];

  const handleClick = (center) => {
    vehiclebyats(center._id);
    setAtsDetails({ center });
    setView('details');
  };

  const handleBack = () => {
    setvehicles([]);
    atsFn();
    setView('list');
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createATS = async () => {
    try {
      await axiosInstance.post('/centers/', formData);
      setMessage('ATS center created successfully');
      setShowForm(false);
      setFormData({ name: '', code: '', latitude: '', longitude: '' });
      atsFn();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create ATS center');
    }
  };

  return (
    <div className="p-6">
      {view === 'list' && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">ATS Centres</h2>
          <div className="flex justify-center mb-4">
            {user?.role === 'SUPER_ADMIN' && user?.role==="OFFICER" && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? 'Cancel' : 'Add ATS Center'}
              </button>
            )}
          </div>

          {showForm && (
            <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6">
              <h3 className="text-lg font-semibold mb-4">New ATS Center</h3>
              {['name', 'code', 'latitude', 'longitude'].map((field) => (
                <div className="relative mb-4" key={field}>
                  <label htmlFor={field} className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
                  />
                </div>
              ))}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded" onClick={createATS}>Submit</button>
              {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ats?.map((centre) => (
              <div
                key={centre._id}
                className="bg-white shadow-md rounded-xl p-6 border-gray-200 hover:shadow-lg transition duration-200"
              > 
              {
                 centre.isSuspended&&<span className='bg-red-500 text-white rounded-2xl p-1'>suspended</span>
              }
              
          
                <h3 className="text-xl font-semibold text-center">{centre.name}</h3>
                <p className="text-gray-500 text-center mb-4">Code: {centre.code}</p>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  onClick={() => handleClick(centre)}
                >
                  Monitor
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'details' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Test Summary</h2>
          <div className='flex justify-between items-center w-full pb-10'>
            <h2 className='font-bold text-2xl'>{atsDetails?.center?.name}</h2>
            <button className='bg-red-600 p-4 rounded-2xl text-white' onClick={() => setShowManage(true)}>Manage</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {vehicleCardDetails.map(({ title, value, icon: Icon, color }) => (
              <div key={title} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center space-y-2">
                <Icon className={`w-6 h-6 ${color}`} />
                <h3 className="text-md font-medium text-gray-600">{title}</h3>
                <span className="text-xl font-bold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <div className='flex justify-evenly w-full'>
            <button className='bg-blue-600 p-4 rounded-2xl text-white w-50'>LMV</button>
            <button className='bg-blue-600 p-4 rounded-2xl text-white w-50'>HMV</button>
          </div>

          <div className="flex justify-center py-10">
            <button
              onClick={handleBack}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition"
            >
              ← Back to ATS Centres
            </button>
          </div>

          <ManageATS showmanage={showManage} onClose={() => setShowManage(false)} atsDetails={atsDetails} />
        </div>
      )}
    </div>
  );
};

export default ATScentres;
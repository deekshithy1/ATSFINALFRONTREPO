import React, { useEffect } from 'react'
import { useVehiclestore } from '../store/useVehicleStoreOff';
import { Car } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { useAuthStore } from '../store/useAuthStore';
const DashboardOff = () => {
  const totalVehiclesFN=useVehiclestore(s=>s.getVehicles);
  const vehicles=useVehiclestore(s=>s.vehicles);
  const pendingVehicles = vehicles.filter((v) => v.status === 'PENDING');
  const INPROGRESSvehicles = vehicles.filter((v) => v.status === 'IN_PROGRESS');
  const CompletedVehicles = vehicles.filter((v) => v.status === 'COMPLETED');
  const APPROVEDVEHICLES = vehicles.filter((v) => v.status === 'APPROVED');
  const {user}=useAuthStore();
  useEffect(()=>{
    totalVehiclesFN();
  },[totalVehiclesFN]);
  const getCount=(data)=>{
    return data.length;
  }
  const vehiclecardDetails = [
    {
      title: 'Total Tests',
      value: getCount(vehicles),
      icon: <Car/>,
      color: 'blue',
    },
    {
      title: 'Approved Tests',
      value: getCount(APPROVEDVEHICLES),
      icon: <Car/>,
      color: 'green',
    },
    {
      title: 'Pending Tests',
      value: getCount(pendingVehicles),
      icon: <Car/>,
      color: 'yellow',
    },
    {
      title: 'Tests Completed',
      value: getCount(CompletedVehicles),
      icon: <Car/>,
      color: 'purple',
    },
    {
        title: 'In Progress ',
        value: getCount(INPROGRESSvehicles),
        icon: <Car/>,
        color: 'yellow',
      },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
      {user ? (
        <div className="text-lg font-medium text-gray-700">
          Welcome, <span className="text-blue-600">{user.name}</span>!
          <div className="text-sm text-gray-500">Role: {user.role}</div>
        </div>
      ) : (
        <p className="text-red-500">Loading user...</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          vehiclecardDetails.map((v)=><MetricCard title={v.title} icon={v.icon} value={v.value} color={v.color} key={v.title}/>)
        }
      </div>
 
    </div> 
  )
}

export default DashboardOff
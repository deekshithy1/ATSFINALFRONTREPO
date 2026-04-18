import React, { useEffect, useState } from 'react';
import { useAtsStore } from '../store/useAtsStore';
import { useUserStore } from '../store/useUserStore';
import AddUser from './AddUser';

const ATSGRID = () => {
  const { ats, atsvehiclesfn } = useAtsStore();
  const { users, getAllUsers, setUsersNull, blockUser, unblockUser } = useUserStore();

  const [view, setview] = useState("list");
  const [selectedCenter, setSelectedCenter] = useState({name:"",id:"",code:""});
  const [isOpen,setOpen]=useState("closed");
  useEffect(() => {
    atsvehiclesfn();
  }, []);
  const isAdmin=users.filter(user=>user.role==="ATS_ADMIN");
  const handleFetchUsers = async (id,name,code) => {
    await getAllUsers(id);
    setSelectedCenter({ id, name ,code});

    setview("details");
  };

  const handleBack = () => {
    setUsersNull();
    setview("list");
  };
  console.log(selectedCenter)

  const handleBlock = async (email, centerId) => {
    await blockUser(email);
    await getAllUsers(centerId);
  };

  const handleUnblock = async (email, centerId) => {

    await unblockUser(email);
    await getAllUsers(centerId);
  };

  return (
    <div className='grid grid-cols-3 justify-evenly flex-wrap p-4  '>

      {view === 'list' && ats.map(a => (
        <div className='bg-white   shadow-md p-4 m-2  flex flex-col   rounded-2xl py-9 items-center' key={a._id}>
          <h2 className='text-lg font-semibold'>{a.name}</h2>
          <h3 className='text-gray-600'>{a.code}</h3>
          <button
            className='mt-2 bg-blue-600 text-white px-4  rounded-2xl py-2  w-3/4 mt-5'
            onClick={() => handleFetchUsers(a._id,a.name,a.code)}
          >
            Monitor
          </button>
        </div>
      ))}

      {/* {view === 'details' && (
        <div className="w-full ">
          <div className='flex justify-between items-center'>
          <button className='mb-4 bg-gray-300 px-3 py-1 rounded' onClick={handleBack}>
            Back to ATS List
          </button>
    {users.length===0&& <button className='bg-blue-600 text-white p-2 rounded-2xl w-1/2' onClick={()=>setOpen("open")}> ADD Admin</button>} 
     </div>   <div className='flex flex-col'>
            <h2 className='font-bold'>{selectedCenter.name}</h2>
            {users&&users.map(user => (
              <div key={user._id || user.email} className='bg-white p-4 flex justify-between items-center mb-2'>

                <div className='flex '>
                  <h2 className='font-bold'>{user.email}</h2>
                  <div
                    className={`text-sm px-2 py-1 rounded ${
                      user.role === 'TECHNICIAN'
                        ? 'text-blue-600 bg-blue-100'
                        : 'text-green-600 bg-green-100'
                    }`}
                  >
                    {user.role}
                  </div>
                </div>


                {user.isBlocked ? (
                  <button
                    className='bg-green-600 text-white px-3 py-1 rounded'
                    onClick={() => handleUnblock(user.email, selectedCenter.id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className='bg-red-600 text-white px-3 py-1 rounded'
                    onClick={() => handleBlock(user.email, selectedCenter.id)}
                  >
                    Suspend
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )} */}
      {view === 'details' && (
  <div className="w-full px-4">

    {/* Top Controls */}
    <div className='flex justify-between items-center mb-6'>
      <button
        className='bg-gray-300 px-3 py-1 rounded'
        onClick={handleBack}
      >
        Back to ATS List
      </button>

      {users.length === 0 && (
        <button
          className='bg-blue-600 text-white p-2 rounded-2xl px-6'
          onClick={() => setOpen("open")}
        >
          ADD Admin
        </button>
      )}
    </div>

    {/* ATS Center Name */}
    <h2 className='font-bold text-lg mb-4'>{selectedCenter.name}</h2>

    {/* Users List */}
    <div className='flex flex-col gap-3 max-w-3xl'>

      {users && users.map(user => (
        <div
          key={user._id || user.email}
          className='bg-white p-4 flex justify-between items-center rounded shadow-sm'
        >

          {/* User Info */}
          <div className='flex items-center gap-4'>
            <h2 className='font-bold'>{user.email}</h2>

            <div
              className={`text-sm px-2 py-1 rounded ${
                user.role === 'TECHNICIAN'
                  ? 'text-blue-600 bg-blue-100'
                  : 'text-green-600 bg-green-100'
              }`}
            >
              {user.role}
            </div>
          </div>

          {/* Action Button */}
          {user.isBlocked ? (
            <button
              className='bg-green-600 text-white px-4 py-1 rounded'
              onClick={() => handleUnblock(user.email, selectedCenter.id)}
            >
              Unblock
            </button>
          ) : (
            <button
              className='bg-red-600 text-white px-4 py-1 rounded'
              onClick={() => handleBlock(user.email, selectedCenter.id)}
            >
              Suspend
            </button>
          )}

        </div>
      ))}

    </div>
  </div>
)}
<AddUser isOpen={isOpen} onClose={()=>setOpen("closed")} atsCenterCode={selectedCenter.code}/>
    </div>
  );
};

export default ATSGRID;

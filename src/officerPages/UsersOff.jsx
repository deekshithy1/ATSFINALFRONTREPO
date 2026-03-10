// components/UsersOff.jsx
import React, { useEffect, useState } from 'react';
import { useAtsStore } from '../store/useAtsStore';
import { useUserStore } from '../store/useUserStore';
import axiosInstance from '../services/axiosInstance';
import AddUser from '../officerComponents/AddUser';
import ATSGRID from '../officerComponents/ATSGRID';

const UsersOff = () => {


  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-4">ATS Users</div>
      <ATSGRID  />

    </div>
  );
};

export default UsersOff;

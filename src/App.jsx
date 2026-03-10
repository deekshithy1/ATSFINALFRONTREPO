// import React, { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuthStore } from "./store/useAuthStore";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Vehicles from "./pages/Vehicles";
// import Tests from "./pages/Tests";
// import Reports from "./pages/Reports";
// import Approvals from "./pages/Approvals";
// import Users from "./pages/Users";
// import Settings from "./pages/Settings";
// import Layout from "./components/Layout";
// import VisualTestPage from "./pages/VisualTestPage";
// import FunctionalTestPage from "./pages/FunctionalTestPage";
// import DashboardOff from "./officerPages/DashBoardOff";
// import ATScentres from "./officerPages/ATScenters";
// import UsersOff from "./officerPages/UsersOff";

// const App = () => {
//   const { token, user, fetchUser } = useAuthStore();

//   useEffect(() => {
//     if (token && !user) {
//       fetchUser();
//     }
//   }, [token, user, fetchUser]);

//   if (token && !user) return null;

//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/login" element={<Login />} />

//       {/* Officer/Super Admin Routes */}
//       {token && (user?.role === "OFFICER" || user?.role === "SUPER_ADMIN") && (
//         <Route element={<Layout />}>
//           <Route path="/" element={<DashboardOff />} />
//           <Route path="/atsCenters" element={<ATScentres />} />
//           <Route path="/users" element={<UsersOff />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//       )}

//       {/* Technician & ATS_ADMIN Shared Routes */}
//       {token && ["TECHNICIAN", "ATS_ADMIN","ATS_OWNER"].includes(user?.role) && (
//         <Route element={<Layout />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/vehicles" element={<Vehicles />} />
//           <Route path="/tests" element={<Tests />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/visualtest" element={<VisualTestPage />} />
//           <Route path="/functionaltest" element={<FunctionalTestPage />} />

//           {/* ATS_ADMIN Only Routes */}
//           {(user?.role === "ATS_ADMIN"||user?.role==="ATS_OWNER") && (
//             <>
//               <Route path="/approvals" element={<Approvals />} />
//               <Route path="/users" element={<Users />} />

//             </>
//           )}
//           {
//            token&&  user?.role==="MVI" && 
//           <>
//            <Route path="/" element={<Layout/>}>
//             <Route path="/vehicles" element={<Vehicles/>}/>
//             </Route>
//             </>
//           }

//           <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//       )}

//       {/* Unauthorized role */}
//       {token && !["OFFICER", "SUPER_ADMIN", "ATS_ADMIN", "TECHNICIAN"].includes(user?.role) && (
//         <Route path="*" element={<div>Unauthorized</div>} />
//       )}

//       {/* Not logged in */}
//       {!token && <Route path="*" element={<Navigate to="/login" />} />}
//     </Routes>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Tests from "./pages/Tests";
import Reports from "./pages/Reports";
import Approvals from "./pages/Approvals";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import VisualTestPage from "./pages/VisualTestPage";
import FunctionalTestPage from "./pages/FunctionalTestPage";
import DashboardOff from "./officerPages/DashBoardOff";
import ATScentres from "./officerPages/ATScenters";
import UsersOff from "./officerPages/UsersOff";

const App = () => {
  const { token, user, fetchUser } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  if (token && !user) return null;

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Officer & Super Admin Routes */}
      {token && (user?.role === "OFFICER" || user?.role === "SUPER_ADMIN") && (
        <Route element={<Layout />}>
          <Route index element={<DashboardOff />} />
          <Route path="/atsCenters" element={<ATScentres />} />
          <Route path="/users" element={<UsersOff />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}

      {/* ATS_ADMIN, ATS_OWNER, TECHNICIAN Routes */}
      {token && ["ATS_ADMIN", "ATS_OWNER", "TECHNICIAN"].includes(user?.role) && (
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/visualtest" element={<VisualTestPage />} />
          <Route path="/functionaltest" element={<FunctionalTestPage />} />

          {/* ATS_ADMIN and ATS_OWNER Exclusive */}
          {["ATS_ADMIN", "ATS_OWNER"].includes(user?.role) && (
            <>
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/users" element={<Users />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}

      {/* MVI Role */}
      {token && user?.role === "MVI" && (
        <Route element={<Layout />}>
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/visualtest" element={<VisualTestPage/>}/>
          <Route path="/approvals" element={<Approvals/>}/>
          <Route path="*" element={<Navigate to="/vehicles" />} />
        </Route>
      )}

      {/* Unauthorized Access */}
      {token && !["OFFICER", "SUPER_ADMIN", "ATS_ADMIN", "ATS_OWNER", "TECHNICIAN", "MVI"].includes(user?.role) && (
        <Route path="*" element={<div>Unauthorized</div>} />
      )}

      {/* Not Logged In */}
      {!token && <Route path="*" element={<Navigate to="/login" />} />}
    </Routes>
  );
};

export default App;

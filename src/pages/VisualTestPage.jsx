// import React, { useEffect, useState, useMemo } from "react";
// import useTestStore from "../store/useTestStore";
// import VehicleSelection from "../components/VehicleSelection";
// import VehicleDetails from "../components/VehicleDetails";
// import VisualTestForm from "../components/VisualTestForm";
// import AlertMessage from "../components/AlertMessage";
// import { VISUAL_TEST_RULES } from "../components/VisualTestForm";
// import { useSearchParams } from "react-router-dom";
// const VisualTestPage = () => {
//   const {
//     vehicles,
//     selectedVehicle,
//     visualRules,
//     fetchPendingVisualVehicles,
//     fetchVehicleByRegn,
//     setVisualRules,
//     submitVisualTest,
//     resetVisualRules,
//   } = useTestStore();

//   const [selectedRegnNo, setSelectedRegnNo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [vehicleLoading, setVehicleLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showVehicleSelection, setShowVehicleSelection] = useState(true);
//   const [serachparam]=useSearchParams();
// const [currVehicle,setCurrVehicle]=useState({});
//   const ITEMS_PER_PAGE = 20; // 5x4 grid

//   const vehicleNumber=serachparam.get("bookingId")
//   useEffect(() => {
//     loadPendingVehicles();
//   }, []);
//   console.log(vehicles)

//   // Filter vehicles based on search term
//   const filteredVehicles = useMemo(() => {
//     if (!searchTerm) return vehicles;
//     return vehicles.filter(regnNo => 
//       regnNo.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [vehicles, searchTerm]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentVehicles = filteredVehicles.slice(startIndex, endIndex);

//   // Reset pagination when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

// useEffect(() => {
//   if (!vehicleNumber) return;

//   const getVehicle = async () => {
//     try {
//       const res = await fetchVehicleByRegn(vehicleNumber);
//      setCurrVehicle(res)
//       // setCurrVehicle(res?.data || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   getVehicle();
// }, [vehicleNumber]);
// console.log(currVehicle)
//   const handleApproveALL = async () => {
//     if (!selectedVehicle) {
//       setError("Please select a vehicle first");
//       return;
//     }
  
//     // Mark all rules as "P" (Pass)
//     const approvedRules = {};
//     VISUAL_TEST_RULES.forEach(rule => {
//       approvedRules[rule.key] = "P";
//     });
  
//     setVisualRules(approvedRules); // <- Updates Zustand store state
//     setError("");
//     setSuccess("");
  
//     setSubmitting(true);
//     try {
//       const res = await submitVisualTest(); // <- Will use updated visualRules from Zustand
//       setSuccess(res.message || "All rules approved and test submitted!");
  
//       // Reset UI state
//       setSelectedRegnNo("");
//       resetVisualRules();
//       setShowVehicleSelection(true);
//       await loadPendingVehicles(); // Refresh vehicle list
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit visual test");
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const loadPendingVehicles = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await fetchPendingVisualVehicles();
//     } catch (err) {
//       setError("Failed to load pending vehicles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = async (regnNo) => {
//     setVehicleLoading(true);
//     setError("");
//     setSuccess("");
//     setSelectedRegnNo(regnNo);
//     resetVisualRules();
    
//     try {
//       await fetchVehicleByRegn(regnNo);
//       setShowVehicleSelection(false); // Hide vehicle selection section
//     } catch (err) {
//       setError(`Failed to load vehicle details for ${regnNo}`);
//       setSelectedRegnNo("");
//     } finally {
//       setVehicleLoading(false);
//     }
//   };

//   const handleRuleChange = (rule, value) => {
//     setVisualRules({ ...visualRules, [rule]: value });
//   };

//   const handleSubmit = async () => {
//     if (!selectedVehicle) {
//       setError("Please select a vehicle first");
//       return;
//     }
  
//     // Ensure all required rules are filled
//     const allRulesFilled = VISUAL_TEST_RULES.every(
//       (rule) => visualRules[rule.key] && visualRules[rule.key] !== ""
//     );
  
//     if (!allRulesFilled) {
//       setError("Please fill in all visual test results before submitting.");
//       return;
//     }
  
//     setSubmitting(true);
//     setError("");
//     setSuccess("");
  
//     try {
//       const res = await submitVisualTest();
//       setSuccess(res.message || "Visual test submitted successfully!");
  
//       // Reset form state
//       setSelectedRegnNo("");
//       resetVisualRules();
//       setShowVehicleSelection(true);
  
//       // Refresh vehicle list
//       await loadPendingVehicles();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit visual test");
//     } finally {
//       setSubmitting(false);
//     }
//   };
  

//   const handleReset = () => {
//     setSelectedRegnNo("");
//     resetVisualRules();
//     setError("");
//     setSuccess("");
//     setShowVehicleSelection(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="min-h-screen  p-6">
//       <div className="max-w-[90%] mx-auto">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Visual Test Center</h2>

//           {/* Error/Success Messages */}
//           <AlertMessage type="error" message={error} />
//           <AlertMessage type="success" message={success} />

//           {/* Vehicle Selection Section */}
//           {showVehicleSelection && (
//             <VehicleSelection
//               searchTerm={searchTerm}
//               onSearchChange={handleSearchChange}
//               filteredVehicles={filteredVehicles}
//               currentVehicles={currentVehicles}
//               loading={loading}
//               vehicleLoading={vehicleLoading}
//               onVehicleSelect={handleSelect}
//               onRefresh={loadPendingVehicles}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//               startIndex={startIndex}
//               endIndex={endIndex}
//             />
//           )}

//           {/* Vehicle Details and Test Section */}
//           {selectedVehicle && !showVehicleSelection && (
//             <div>
//               <VehicleDetails vehicle={selectedVehicle} onBack={handleReset} />
//               <VisualTestForm
//                 visualRules={visualRules}
//                 onRuleChange={handleRuleChange}
//                 onSubmit={handleSubmit}
//                 onCancel={handleReset}
//                 onClearForm={() => resetVisualRules()}
//                 submitting={submitting}
//                 handleApproveALL={handleApproveALL}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisualTestPage;5

import React, { useEffect, useState, useMemo } from "react";
import useTestStore from "../store/useTestStore";
import VehicleSelection from "../components/VehicleSelection";
import VehicleDetails from "../components/VehicleDetails";
import VisualTestForm from "../components/VisualTestForm";
import AlertMessage from "../components/AlertMessage";
import { VISUAL_TEST_RULES } from "../components/VisualTestForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const VisualTestPage = () => {
  const {
    vehicles,
    selectedVehicle,
    visualRules,
    fetchPendingVisualVehicles,
    fetchVehicleByRegn,
    setVisualRules,
    submitVisualTest,
    resetVisualRules,
  } = useTestStore();

  const [searchParams] = useSearchParams();
  const vehicleNumber = searchParams.get("bookingId");

  const [selectedRegnNo, setSelectedRegnNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;
  const navigate=useNavigate();
  // Load pending vehicles
  useEffect(() => {
    if (!vehicleNumber) {
      loadPendingVehicles();
    }
  }, []);

  // Fetch vehicle if bookingId query param exists
  useEffect(() => {
    if (!vehicleNumber) return;

    const getVehicle = async () => {
      try {
        setVehicleLoading(true);
        await fetchVehicleByRegn(vehicleNumber);
        setSelectedRegnNo(vehicleNumber);
      } catch (err) {
        console.error(err);
        setError("Failed to load vehicle from bookingId");
      } finally {
        setVehicleLoading(false);
      }
    };

    getVehicle();
  }, [vehicleNumber]);

  const loadPendingVehicles = async () => {
    setLoading(true);
    setError("");
    try {
      await fetchPendingVisualVehicles();
    } catch (err) {
      setError("Failed to load pending vehicles");
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return vehicles;

    return vehicles.filter((regnNo) =>
      regnNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSelect = async (regnNo) => {
    setVehicleLoading(true);
    setError("");
    setSuccess("");
    setSelectedRegnNo(regnNo);
    resetVisualRules();

    try {
      await fetchVehicleByRegn(regnNo);
    } catch (err) {
      setError(`Failed to load vehicle details for ${regnNo}`);
      setSelectedRegnNo("");
    } finally {
      setVehicleLoading(false);
    }
  };

  const handleRuleChange = (rule, value) => {
    setVisualRules({ ...visualRules, [rule]: value });
  };

  const handleApproveALL = async () => {
    if (!selectedVehicle) {
      setError("Please select a vehicle first");
      return;
    }

    const approvedRules = {};
    VISUAL_TEST_RULES.forEach((rule) => {
      approvedRules[rule.key] = "P";
    });

    setVisualRules(approvedRules);

    // setSubmitting(true);
    setError("");
    setSuccess("");

    // try {
    //   const res = await submitVisualTest();
    //   setSuccess(res.message || "All rules approved and test submitted!");

    //   setSelectedRegnNo("");
    //   resetVisualRules();

    //   await loadPendingVehicles();
    // } catch (err) {
    //   setError(err.response?.data?.message || "Failed to submit visual test");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const handleSubmit = async () => {
    if (!selectedVehicle) {
      setError("Please select a vehicle first");
      return;
    }

    const allRulesFilled = VISUAL_TEST_RULES.every(
      (rule) => visualRules[rule.key] && visualRules[rule.key] !== ""
    );

    if (!allRulesFilled) {
      setError("Please fill all visual test results before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await submitVisualTest();
      setSuccess(res.message || "Visual test submitted successfully!");

      setSelectedRegnNo("");
      resetVisualRules();

      await loadPendingVehicles();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit visual test");
    } finally {
      setSubmitting(false);
      navigate("/vehicles")
    }
  };

  const handleReset = () => {
    navigate("/vehilces")
    setSelectedRegnNo("");
    resetVisualRules();
    setError("");
    setSuccess("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[90%] mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Visual Test Center
          </h2>

          <AlertMessage type="error" message={error} />
          <AlertMessage type="success" message={success} />

          {/* Vehicle Selection (Only if NO query param) */}
          {!vehicleNumber && !selectedVehicle && (
            <VehicleSelection
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filteredVehicles={filteredVehicles}
              currentVehicles={currentVehicles}
              loading={loading}
              vehicleLoading={vehicleLoading}
              onVehicleSelect={handleSelect}
              onRefresh={loadPendingVehicles}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          )}

          {/* Vehicle Test Section */}
          {selectedVehicle && (
            <div>
              <VehicleDetails vehicle={selectedVehicle} onBack={handleReset} />

              <VisualTestForm
                visualRules={visualRules}
                onRuleChange={handleRuleChange}
                onSubmit={handleSubmit}
                onCancel={handleReset}
                onClearForm={() => resetVisualRules()}
                submitting={submitting}
                handleApproveALL={handleApproveALL}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualTestPage;


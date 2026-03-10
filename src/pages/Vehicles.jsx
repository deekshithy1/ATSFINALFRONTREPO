import React, { useEffect, useState } from "react";
import { Eye, Edit, FileText, Play, RotateCcw, Plus } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useVehicleStore } from "../store/useVehicleStore";
import AddVehicleModal from "../components/AddVehicleModal";
import dayjs from "dayjs";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import useTestStore from "../store/useTestStore";

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
};

const ITEMS_PER_PAGE = 7;

const Vehicles = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const vehicles = useVehicleStore((s) => s.vehicles);
  const fetchTodayVehicles = useVehicleStore((s) => s.fetchTodayVehicles);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  // Fetch vehicles by date
  const fetchVehiclesByDate = async (date) => {
    try {
      const formattedDate = dayjs(date).format("DDMMYYYY");
      const res = await axiosInstance.get(`/vehicles/${formattedDate}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching vehicles by date:", err);
      return [];
    }
  };

  // Initial fetch based on selected date
  useEffect(() => {
    if (selectedDate === dayjs().format("YYYY-MM-DD")) {
      fetchTodayVehicles();
    } else {
      fetchVehiclesByDate(selectedDate).then((data) => {
        useVehicleStore.setState({ vehicles: data });
      });
    }
  }, [selectedDate, fetchTodayVehicles]);


  const fetchVehicles=async()=>{
    const res=await axiosInstance.get("/tests/visual/pendingVisuals");
    console.log(res.data.pending)
        return res.data.pending;
   }

  // Filtering logic
  useEffect(() => {
    let filteredList = [...vehicles];
  
    const applyFilter = async () => {
      if (user?.role === "MVI") {
        try {
          const res = await fetchVehicles(); // ✅ await here
          setFiltered(res); // ✅ this is now the correct pendingVisuals array
        } catch (err) {
          console.error("Failed to fetch MVI visual test vehicles:", err);
          setFiltered([]);
        }
        return;
      }
  
      if (user?.role === "TECHNICIAN") {
        filteredList = filteredList.filter(
          (v) =>
            v.status !== "APPROVED" &&
            v.status !== "COMPLETED" &&
            v.status !== "SENT_TO_NIC"
        );
      }
  
      if (searchTerm.trim()) {
        filteredList = filteredList.filter((v) =>
          v.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFiltered(filteredList);
      setCurrentPage(1);
    };
  
    applyFilter(); // ✅ run the async filtering
  }, [vehicles, user?.role, searchTerm]);
  
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleData = filtered.slice(
    pageStartIndex,
    pageStartIndex + ITEMS_PER_PAGE
  );

  // Handlers
  const handleClick = async (regnNo) => {
    try {
      const res = await axiosInstance.post("/tests/start", { regnNo });
      console.log(res);
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const handleVisualTest = (bookingId) => navigate(`/visualtest?bookingId=${bookingId}`);
  const handleFunctionalTest = (bookingId) => navigate(`/functionaltest?bookingId=${bookingId}`);
  const handleStartTest = (bookingId) => navigate(`/tests?bookingId=${bookingId}`);
  const handleApproval = (bookingId) => navigate(`/approvals?bookingId=${bookingId}`);
  const handleReport = (bookingId) => navigate(`/reports?bookingId=${bookingId}`);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Management</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search by Booking ID..."
            className="border border-gray-300 px-4 py-2 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {user?.role === "ATS_ADMIN" && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              <Plus size={16} /> Add Vehicle
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No vehicles found.</div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Booking ID</th>
                <th className="px-5 py-3">Regn No</th>
                <th className="px-5 py-3">Engine No</th>
                <th className="px-5 py-3">Chassis No</th>
                <th className="px-5 py-3">Lane Entry</th>
                <th className="px-5 py-3">Status</th>
                {!["ATS_OWNER"].includes(user?.role) && (
  <th className="px-5 py-3 text-center">Actions</th>
)}

               
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visibleData.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4 font-medium">{vehicle.bookingId}</td>
                  <td className="px-5 py-4">{vehicle.regnNo}</td>
                  <td className="px-5 py-4">{vehicle.engineNo}</td>
                  <td className="px-5 py-4">{vehicle.chassisNo}</td>
                  <td className="px-5 py-4">
                    {vehicle.laneEntryTime
                      ? dayjs(vehicle.laneEntryTime).format("HH:mm A")
                      : "-"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        statusColor[vehicle.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>{ user.role!=="ATS_OWNER"  &&     <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      
                      {vehicle.status === "PENDING" && (
                        <button
                          onClick={() => {
                            handleStartTest(vehicle.bookingId);
                            handleClick(vehicle.regnNo);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                          title="Start Test"
                        >
                          Start Test
                        </button>
                      )}

                      {vehicle.status === "IN_PROGRESS" && (
                        <>
                          {user?.role === "MVI" && (
                            <button
                              onClick={() => handleVisualTest(vehicle.bookingId)}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                              title="Visual Test"
                            >
                              Visual
                            </button>
                          )}
                          {(user?.role === "ATS_ADMIN" || user?.role === "TECHNICIAN") && (
                            <button
                              onClick={() => handleFunctionalTest(vehicle.bookingId)}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
                              title="Functional Test"
                            >
                              Functional
                            </button>
                          )}
                        </>
                      )}

                      {vehicle.status === "COMPLETED" && (
                        <button
                          onClick={() => handleApproval(vehicle.bookingId)}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded"
                          title="Go to Approval"
                        >
                          Approval
                        </button>
                      )}

                      {vehicle.status === "APPROVED" && (
                        <button
                          onClick={() => handleReport(vehicle.bookingId)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded"
                          title="View Report"
                        >
                          Report
                        </button>
                      )}

                      {vehicle.status === "FAILED" && (
                        <button
                          onClick={() => handleStartTest(vehicle.regnNo)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                          title="Retry Test"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </td> }
               
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-4">
        <div>
          Showing {pageStartIndex + 1} to{" "}
          {Math.min(pageStartIndex + ITEMS_PER_PAGE, filtered.length)} of{" "}
          {filtered.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Previous
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md border ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      <AddVehicleModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Vehicles;

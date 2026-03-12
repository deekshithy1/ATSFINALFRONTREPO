
import React, { useEffect, useState } from "react";
import { useVehicleStore } from "../store/useVehicleStore";
import { VehicleReportPDF } from "../components/Report";
import { pdf } from "@react-pdf/renderer";
import axiosInstance from "../services/axiosInstance";

const Reports = () => {
  const fetchSubmittedVehicles = useVehicleStore((s) => s.submittedVehicles);
  const submittedVehicles = useVehicleStore((s) => s.reportVehicles);

  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchSubmittedVehicles();
  }, [fetchSubmittedVehicles]);

  const handlePreview = async (regnNo) => {
    if (!regnNo) return;

    setLoadingId(regnNo);

    try {
      const { data } = await axiosInstance.get(
        `/tests/test/getTestReport/${regnNo}`
      );

      console.log(data)
      const vehicleData = data?.reportData;
      const vehicleNumber = data?.vehicleNumber;
      const images = data?.images || {};


      if (!vehicleData) throw new Error("No report data found");

      // Convert rules -> tests table
 
      const blob = await pdf(
        <VehicleReportPDF
          vehicle={vehicleData}
          vehicleNO={vehicleNumber}
          images={images}
          vehicleDetails={data?.vehicle}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Preview error:", err);
      alert("Failed to generate report");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>

        {submittedVehicles?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                    Registration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Test Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Engine No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {submittedVehicles.map((v) => (
                  <tr key={v._id}>
                    <td className="px-6 py-4 text-sm">{v.bookingId}</td>
                    <td className="px-6 py-4 text-sm">
                      {v.vehicle?.regnNo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {v.updatedAt?.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {v.vehicle?.engineNo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {v.vehicle?.status || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handlePreview(v.vehicle?.regnNo)}
                        disabled={loadingId === v.vehicle?.regnNo}
                        className={`px-4 py-2 rounded text-white ${
                          loadingId === v.vehicle?.regnNo
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-800"
                        }`}
                      >
                        {loadingId === v.vehicle?.regnNo
                          ? "Generating..."
                          : "Download Report"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
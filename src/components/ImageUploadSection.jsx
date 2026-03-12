

// import React, { useRef, useState } from "react";
// import axiosInstance from "../services/axiosInstance";

// const ImageUploadSection = () => {

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [cameraKey, setCameraKey] = useState(null);

//   const [showForm, setShowForm] = useState(true);

//   const [vehicleData, setVehicleData] = useState({
//     regnNo: "",
//     engineNo: "",
//     chassisNo: ""
//   });

//   const [images, setImages] = useState({});

//   const inputs = [
//     { key: "NUMBER_PLATE", label: "Number Plate" },
//     { key: "FRONT", label: "Front View" },
//     { key: "BACK", label: "Back View" },
//     { key: "RIGHT_SIDE", label: "Right Side" },
//     { key: "LEFT_SIDE", label: "Left Side" },
//     { key: "CHASIS_NUMBER", label: "Chassis Number" },
//     { key: "ODOMETER", label: "Odometer" }
//   ];

//   const data = [
//     { label: "Registration Number", name: "regnNo", buttonLabel: "Get Details" },
//     { label: "Engine Number", name: "engineNo" },
//     { label: "Chassis Number", name: "chassisNo" }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setVehicleData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleGetDetails = async (e) => {

//     e.preventDefault();

//     const res = await axiosInstance.get(`/vehicles/regn/${vehicleData.regnNo}`);

//     setVehicleData((prev) => ({
//       ...prev,
//       engineNo: res.data.engineNo,
//       chassisNo: res.data.chassisNo
//     }));
//   };

//   const handleConfirmVehicle = (e) => {
//     e.preventDefault();
//     setShowForm(false);
//   };

//   /* OPEN CAMERA */

//   const handleCapture = async (key) => {

//     setCameraKey(key);

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "environment" }
//     });

//     videoRef.current.srcObject = stream;
//   };

//   /* TAKE PHOTO */

//   const takePhoto = () => {

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(video, 0, 0);

//     canvas.toBlob((blob) => {

//       const file = new File(
//         [blob],
//         `${cameraKey}_${Date.now()}.jpg`,
//         { type: "image/jpeg" }
//       );

//       setImages((prev) => ({
//         ...prev,
//         [cameraKey]: file
//       }));

//       /* stop camera */

//       const stream = video.srcObject;

//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }

//       setCameraKey(null);

//     }, "image/jpeg", 0.8);
//   };

//   const allImagesUploaded = inputs.every((item) => images[item.key]);

//   const handleSubmit = async () => {

//     const confirmUpload = window.confirm(
//       `Please confirm upload for vehicle ${vehicleData.regnNo.toUpperCase()}`
//     );

//     if (!confirmUpload) return;

//     try {

//       const formData = new FormData();

//       Object.entries(images).forEach(([key, file]) => {
//         formData.append(key, file);
//       });

//       formData.append("regnNo", vehicleData.regnNo);

//       await axiosInstance.post(
//         `/upload/visual-test-images/${vehicleData.regnNo}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       setImages({});
//       setShowForm(true);

//       alert("Images uploaded successfully ✅");

//     } catch (error) {

//       console.error(error);

//       alert(error?.response?.data?.message || "Upload failed");
//     }
//   };

//   return (

//     <div className="p-6 flex justify-center">

//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">

//         <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
//           Vehicle Visual Inspection
//         </h2>

//         {showForm ? (

//           <form className="space-y-4">

//             {data.map((d) => (

//               <div key={d.name}>

//                 <label className="block text-gray-700 font-medium mb-1">
//                   {d.label}
//                 </label>

//                 <input
//                   type="text"
//                   name={d.name}
//                   value={vehicleData[d.name]}
//                   onChange={handleChange}
//                   readOnly={d.name !== "regnNo"}
//                   className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//                 />

//                 {d.buttonLabel && (
//                   <button
//                     onClick={handleGetDetails}
//                     className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                   >
//                     {d.buttonLabel}
//                   </button>
//                 )}

//               </div>

//             ))}

//             <div className="flex justify-center pt-4">

//               <button
//                 onClick={handleConfirmVehicle}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Confirm Vehicle
//               </button>

//             </div>

//           </form>

//         ) : (

//           <div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//               {inputs.map((item) => (

//                 <div
//                   key={item.key}
//                   className="border border-gray-300 rounded-xl p-4 flex flex-col items-center space-y-3 bg-gray-50"
//                 >

//                   <h3 className="font-semibold">{item.label}</h3>

//                   {images[item.key] ? (

//                     <img
//                       src={URL.createObjectURL(images[item.key])}
//                       className="w-40 h-32 object-cover rounded border"
//                       alt="preview"
//                     />

//                   ) : (

//                     <div className="w-40 h-32 flex items-center justify-center border rounded bg-gray-100 text-gray-400">
//                       No Photo
//                     </div>

//                   )}

//                   <button
//                     onClick={() => handleCapture(item.key)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     {images[item.key] ? "Retake Photo" : "Capture Photo"}
//                   </button>

//                 </div>

//               ))}

//             </div>

//             <div className="mt-8 flex justify-center">

//               <button
//                 disabled={!allImagesUploaded}
//                 onClick={handleSubmit}
//                 className={`px-8 py-3 rounded-lg text-white font-semibold
//                 ${
//                   allImagesUploaded
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Submit Inspection
//               </button>

//             </div>

//           </div>

//         )}

//       </div>

//       {/* CAMERA MODAL */}

//       {cameraKey && (

//         <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">

//           <video
//             ref={videoRef}
//             autoPlay
//             className="w-96 rounded"
//           />

//           <button
//             onClick={takePhoto}
//             className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Capture
//           </button>

//           <canvas ref={canvasRef} style={{ display: "none" }} />

//         </div>

//       )}

//     </div>
//   );
// };

// export default ImageUploadSection;
import React, { useRef, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const ImageUploadSection = () => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraKey, setCameraKey] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const [location, setLocation] = useState(null);

  const [vehicleData, setVehicleData] = useState({
    regnNo: "",
    engineNo: "",
    chassisNo: ""
  });

  const [images, setImages] = useState({});

  const inputs = [
    { key: "NUMBER_PLATE", label: "Number Plate" },
    { key: "FRONT", label: "Front View" },
    { key: "BACK", label: "Back View" },
    { key: "RIGHT_SIDE", label: "Right Side" },
    { key: "LEFT_SIDE", label: "Left Side" },
    { key: "CHASIS_NUMBER", label: "Chassis Number" },
    { key: "ODOMETER", label: "Odometer" }
  ];

  const data = [
    { label: "Registration Number", name: "regnNo", buttonLabel: "Get Details" },
    { label: "Engine Number", name: "engineNo" },
    { label: "Chassis Number", name: "chassisNo" }
  ];

  const handleChange = (e) => {

    const { name, value } = e.target;

    setVehicleData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  const handleGetDetails = async (e) => {

    e.preventDefault();

    const res = await axiosInstance.get(`/vehicles/regn/${vehicleData.regnNo}`);

    setVehicleData((prev) => ({
      ...prev,
      engineNo: res.data.engineNo,
      chassisNo: res.data.chassisNo
    }));

  };

  const handleConfirmVehicle = (e) => {

    e.preventDefault();
    setShowForm(false);

  };

  /* OPEN CAMERA */

  const handleCapture = async (key) => {

    setCameraKey(key);

    /* GET GEO LOCATION */

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        console.error("Location error", err);
      }
    );

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    videoRef.current.srcObject = stream;

  };

  /* TAKE PHOTO */

  const takePhoto = () => {

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    /* ADD WATERMARK */

    if (location) {

      const date = new Date().toLocaleString();

      const textLines = [
        `Vehicle: ${vehicleData.regnNo}`,
        `Lat: ${location.lat.toFixed(6)}`,
        `Lng: ${location.lng.toFixed(6)}`,
        `Time: ${date}`
      ];

      ctx.font = "20px Arial";
      ctx.fillStyle = "yellow";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;

      textLines.forEach((line, index) => {

        const x = 20;
        const y = canvas.height - (80 - index * 25);

        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);

      });

    }

    canvas.toBlob((blob) => {

      const file = new File(
        [blob],
        `${cameraKey}_${Date.now()}.jpg`,
        { type: "image/jpeg" }
      );

      setImages((prev) => ({
        ...prev,
        [cameraKey]: file
      }));

      const stream = video.srcObject;

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      setCameraKey(null);

    }, "image/jpeg", 0.8);

  };

  const allImagesUploaded = inputs.every((item) => images[item.key]);

  const handleSubmit = async () => {

    const confirmUpload = window.confirm(
      `Please confirm upload for vehicle ${vehicleData.regnNo.toUpperCase()}`
    );

    if (!confirmUpload) return;

    try {

      const formData = new FormData();

      Object.entries(images).forEach(([key, file]) => {
        formData.append(key, file);
      });

      formData.append("regnNo", vehicleData.regnNo);

      await axiosInstance.post(
        `/upload/visual-test-images/${vehicleData.regnNo}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setImages({});
      setShowForm(true);

      alert("Images uploaded successfully ✅");

    } catch (error) {

      console.error(error);

      alert(error?.response?.data?.message || "Upload failed");

    }

  };

  return (

    <div className="p-6 flex justify-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl">

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Vehicle Visual Inspection
        </h2>

        {showForm ? (

          <form className="space-y-4">

            {data.map((d) => (

              <div key={d.name}>

                <label className="block text-gray-700 font-medium mb-1">
                  {d.label}
                </label>

                <input
                  type="text"
                  name={d.name}
                  value={vehicleData[d.name]}
                  onChange={handleChange}
                  readOnly={d.name !== "regnNo"}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />

                {d.buttonLabel && (

                  <button
                    onClick={handleGetDetails}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {d.buttonLabel}
                  </button>

                )}

              </div>

            ))}

            <div className="flex justify-center pt-4">

              <button
                onClick={handleConfirmVehicle}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Vehicle
              </button>

            </div>

          </form>

        ) : (

          <div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {inputs.map((item) => (

                <div
                  key={item.key}
                  className="border border-gray-300 rounded-xl p-4 flex flex-col items-center space-y-3 bg-gray-50"
                >

                  <h3 className="font-semibold">{item.label}</h3>

                  {images[item.key] ? (

                    <img
                      src={URL.createObjectURL(images[item.key])}
                      className="w-40 h-32 object-cover rounded border"
                      alt="preview"
                    />

                  ) : (

                    <div className="w-40 h-32 flex items-center justify-center border rounded bg-gray-100 text-gray-400">
                      No Photo
                    </div>

                  )}

                  <button
                    onClick={() => handleCapture(item.key)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {images[item.key] ? "Retake Photo" : "Capture Photo"}
                  </button>

                </div>

              ))}

            </div>

            <div className="mt-8 flex justify-center">

              <button
                disabled={!allImagesUploaded}
                onClick={handleSubmit}
                className={`px-8 py-3 rounded-lg text-white font-semibold
                ${
                  allImagesUploaded
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Inspection
              </button>

            </div>

          </div>

        )}

      </div>

      {/* CAMERA MODAL */}

      {cameraKey && (

        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">

          <video
            ref={videoRef}
            autoPlay
            className="w-96 rounded"
          />

          <button
            onClick={takePhoto}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Capture
          </button>

          <canvas ref={canvasRef} style={{ display: "none" }} />

        </div>

      )}

    </div>

  );

};

export default ImageUploadSection;
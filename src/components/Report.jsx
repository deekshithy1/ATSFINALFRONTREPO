
// // import React from "react";
// // import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
// // import { VISUAL_TEST_RULES } from "./VisualTestForm";

// // const styles = StyleSheet.create({
// //   page: { padding: 30, fontSize: 9 },
// //   tableRow: {
// //     flexDirection: "row",
// //     borderBottomWidth: 1,
// //     borderLeftWidth: 1,
// //     borderColor: "#000",
// //     minHeight: 25,
// //     alignItems: "center",
// //   },
// //   tableHeader: {
// //     backgroundColor: "#f2f2f2",
// //     borderTopWidth: 1,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //   },
// //   // Column Widths
// //   colSl: { width: "8%", borderRightWidth: 1, borderColor: "#000", height: "100%", justifyContent: "center", textAlign: "center" },
// //   colName: { width: "35%", borderRightWidth: 1, borderColor: "#000", height: "100%", justifyContent: "center", paddingLeft: 5 },
// //   colRule: { width: "17%", borderRightWidth: 1, borderColor: "#000", height: "100%", justifyContent: "center", textAlign: "center" },
// //   colValue: { width: "25%", borderRightWidth: 1, borderColor: "#000", height: "100%", justifyContent: "center", textAlign: "center" },
// //   colResult: { width: "15%", borderRightWidth: 1, borderColor: "#000", height: "100%", justifyContent: "center", textAlign: "center" },
  

// //   // Image Section Styles
// //   sectionTitle: {
// //     marginTop: 20,
// //     marginBottom: 10,
// //     fontSize: 10,
// //     fontWeight: "bold",
// //     textDecoration: "underline",
// //   },
// //   imageGrid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     gap: 10,
// //   },
// //   imageBox: {
// //     width: "30%", // 3 images per row
// //     marginBottom: 10,
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     padding: 2,
// //   },
// //   imageItem: {
// //     width: "100%",
// //     height: 80,
// //     objectFit: "cover",
// //   },
// //   imageLabel: {
// //     fontSize: 7,
// //     textAlign: "center",
// //     marginTop: 2,
// //     textTransform: "capitalize",
// //   }
// // });

// // export const VehicleReportPDF = ({ vehicle, vehicleNO, images = {},vehicleDetails }) => {


// //   const visualTests=Object.entries(vehicle).filter(([v,k])=>v.startsWith("rule"))
// //   // const functionalTests=Object.keys(vehicle).filter((v)=>!v.startsWith("rule"))
// //   return (
// //     <Document title={`Report_${vehicleNO}`}>
// //       <Page style={styles.page}>


// // {
// //   vehicleDetails&& 


// //         <View style={[styles.tableRow,styles.tableHeader]}>
// //     <View style={styles.colSl}><Text>Sl.</Text></View>
// //           <View style={styles.colName}><Text>{vehicleDetails.bookingId}</Text></View>
// //           <View style={styles.colRule}><Text>{vehicleDetails.chassisNo}</Text></View>
        
// //           <View style={styles.colValue}><Text>{vehicleDetails.engineNo}</Text></View>
// //           <View style={styles.colResult}><Text>{vehicleDetails.laneEntryTime}</Text></View>

// //         </View>
// // }    
// //         {/* TABLE SECTION */}
// //         <View style={[styles.tableRow, styles.tableHeader]}>
// //           <View style={styles.colSl}><Text>Sl.</Text></View>
// //           <View style={styles.colName}><Text>Name of Test</Text></View>
// //           <View style={styles.colRule}><Text>Rule Ref.</Text></View>
        
// //           <View style={styles.colValue}><Text>Observation</Text></View>
// //           <View style={styles.colResult}><Text>Result</Text></View>
// //         </View>


// //         {Object.entries(vehicle).map(([key, value], index) => {
// //           const ruleObj = VISUAL_TEST_RULES.find((v) => v.key === key);
// //           return (
// //             <View key={key} style={styles.tableRow}>
// //               <View style={styles.colSl}><Text>{index + 1}</Text></View>
// //               <View style={styles.colName}>
// //                 <Text>{ruleObj ? ruleObj.label.split(" (")[0] : key}</Text>
// //               </View>
// //               <View style={styles.colRule}>
// //                 <Text>{ruleObj?.key.split("_")[1] || "N/A"}</Text>
// //               </View>
// //               <View style={styles.colValue}><Text>{value === "P" ? "OKAY" : "FAIL"}</Text></View>
// //               <View style={styles.colResult}>
// //                 <Text style={{ fontWeight: "bold" }}>{value === "P" ? "PASS" : "FAIL"}</Text>
// //               </View>
// //             </View>
// //           );
// //         })}

// //         {/* IMAGES SECTION */}
// //         {Object.keys(images).length > 0 && (
// //           <View break={Object.keys(vehicle).length > 15}> {/* Optional: Move images to next page if table is long */}
// //             <Text style={styles.sectionTitle}>Inspection Photographs</Text>
// //             <View style={styles.imageGrid}>
// //               {Object.entries(images).map(([key, base64Data]) => (
// //                 <View key={key} style={styles.imageBox}>
// //                   <Image src={base64Data} style={styles.imageItem} />
// //                   <Text style={styles.imageLabel}>{key.split('-')[0].replace('_', ' ')}</Text>
// //                 </View>
// //               ))}
// //             </View>
// //           </View>
// //         )}

// //       </Page>
// //     </Document>
// //   );
// // };
// import React from "react";
// import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
// import { VISUAL_TEST_RULES } from "./VisualTestForm";

// const styles = StyleSheet.create({
//   page: { padding: 30, fontSize: 9, fontFamily: "Helvetica" },
  
//   // FIXED VEHICLE HEADER
//   infoContainer: {
//     marginBottom: 15,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#000",
//     backgroundColor: "#fcfcfc",
//   },
//   infoRow: { 
//     flexDirection: "row", 
//     width: "100%", // Ensure the row takes full width
//     marginBottom: 5,
//     alignItems: 'flex-start', // Prevents vertical stretching
//     border:"2px"
//   },
//   infoColumn: {
//     flexDirection: "row",
//     width: "50%", // Split row into two equal halves
//     border:"1px"
//   },
//   infoLabel: { 
//     width: "70px", // Fixed width prevents collapsing
//     fontWeight: "bold",
//     color: "#333",
//     flexShrink: 0, // Force the label to keep its size
//   },
//   infoValue: { 
//     flex: 1, // Let the value take remaining space in the column
//     paddingRight: 10,
//     color: "#000",
//   },

//   // TABLE STYLES
//   tableTitle: { marginTop: 15, marginBottom: 5, fontSize: 10, fontWeight: "bold" },
//   table: { display: "table", width: "100%", borderTopWidth: 1, borderLeftWidth: 1, borderColor: "#000" },
//   tableRow: { flexDirection: "row", minHeight: 22, alignItems: "stretch" },
//   tableHeader: { backgroundColor: "#e0e0e0", fontWeight: "bold" },
//   cell: { borderRightWidth: 1, borderBottomWidth: 1, borderColor: "#000", justifyContent: "center", padding: 4 },
  
//   // COLUMNS
//   colSl: { width: "6%" },
//   colName: { width: "34%" },
//   colRule: { width: "15%" },
//   colApplicable: { width: "12%" },
//   colValue: { width: "18%" },
//   colResult: { width: "15%" },
//   centered: { textAlign: "center" },

//   // IMAGES
//   sectionTitle: { marginTop: 20, marginBottom: 10, fontSize: 10, fontWeight: "bold", textDecoration: "underline" },
//   imageGrid: { flexDirection: "row", flexWrap: "wrap" },
//   imageBox: { width: "30%", marginRight: "3%", marginBottom: 10, borderWidth: 1, borderColor: "#ccc", padding: 2 },
//   imageItem: { width: "100%", height: 80, objectFit: "cover" },
//   imageLabel: { fontSize: 7, textAlign: "center", marginTop: 2 }
// });

// const TableHeader = () => (
//   <View style={[styles.tableRow, styles.tableHeader]}>
//     <View style={[styles.cell, styles.colSl]}><Text style={styles.centered}>Sl.</Text></View>
//     <View style={[styles.cell, styles.colName]}><Text>Name of Test</Text></View>
//     <View style={[styles.cell, styles.colRule]}><Text style={styles.centered}>Rule Ref.</Text></View>
//     <View style={[styles.cell, styles.colApplicable]}><Text style={styles.centered}>Applicable</Text></View>
//     <View style={[styles.cell, styles.colValue]}><Text style={styles.centered}>Observation</Text></View>
//     <View style={[styles.cell, styles.colResult]}><Text style={styles.centered}>Result</Text></View>
//   </View>
// );

// const TableDataRow = ({ index, itemKey, value }) => {
//   const ruleObj = VISUAL_TEST_RULES.find((v) => v.key === itemKey);
//   const isApplicable = value !== null && value !== undefined && value !== "";
  
//   let observationText = value === "P" ? "OKAY" : (value === "F" || value === "0") ? "DEFECT" : value;
//   let isPass = value === "P" || (!isNaN(value) && value !== "0"); // Numbers count as pass usually

//   const formatLabel = (str) => {
//     if (ruleObj) return ruleObj.label.split(" (")[0];
//     return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
//   };

//   return (
//     <View style={styles.tableRow} key={itemKey}>
//       <View style={[styles.cell, styles.colSl]}><Text style={styles.centered}>{index + 1}</Text></View>
//       <View style={[styles.cell, styles.colName]}><Text>{formatLabel(itemKey)}</Text></View>
//       <View style={[styles.cell, styles.colRule]}><Text style={styles.centered}>{ruleObj?.key.split("_")[1] || "N/A"}</Text></View>
//       <View style={[styles.cell, styles.colApplicable]}><Text style={styles.centered}>{isApplicable ? "YES" : "NO"}</Text></View>
//       <View style={[styles.cell, styles.colValue]}><Text style={styles.centered}>{observationText}</Text></View>
//       <View style={[styles.cell, styles.colResult]}>
//         <Text style={[styles.centered, { fontWeight: "bold", color: isPass ? "black" : "red" }]}>
//           {isPass ? "PASS" : "FAIL"}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export const VehicleReportPDF = ({ vehicle = {}, vehicleNO, images = {}, vehicleDetails }) => {
//   const visualTests = Object.entries(vehicle).filter(([key]) => key.toLowerCase().startsWith("rule"));
//   const functionalTests = Object.entries(vehicle).filter(([key]) => !key.toLowerCase().startsWith("rule"));

//   return (
//     <Document title={`Report_${vehicleNO}`}>
//       <Page style={styles.page} size="A4">
        
//         {/* VEHICLE DETAILS - REFACTORED TO PREVENT COLLAPSING */}
//         {vehicleDetails && (
//           <View style={styles.infoContainer}>
//             <View style={styles.infoRow}>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.infoLabel}>Booking ID:</Text>
//                 <Text style={styles.infoValue}>{vehicleDetails.bookingId || "N/A"}</Text>
//               </View>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.infoLabel}>Chassis No:</Text>
//                 <Text style={styles.infoValue}>{vehicleDetails.chassisNo || "N/A"}</Text>
//               </View>
//             </View>
//             <View style={styles.infoRow}>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.infoLabel}>Engine No:</Text>
//                 <Text style={styles.infoValue}>{vehicleDetails.engineNo || "N/A"}</Text>
//               </View>
//               <View style={styles.infoColumn}>
//                 <Text style={styles.infoLabel}>Entry Time:</Text>
//                 <Text style={styles.infoValue}>{vehicleDetails.laneEntryTime || "N/A"}</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         <Text style={styles.tableTitle}>Visual Inspection (Rule 189)</Text>
//         <View style={styles.table}>
//           <TableHeader />
//           {visualTests.map(([key, value], index) => (
//             <TableDataRow key={key} index={index} itemKey={key} value={value} />
//           ))}
//         </View>

//         <View style={{ marginTop: 15 }}>
//           <Text style={styles.tableTitle}>Functional & Performance Metrics</Text>
//           <View style={styles.table}>
//             <TableHeader />
//             {functionalTests.map(([key, value], index) => (
//               <TableDataRow key={key} index={index} itemKey={key} value={value} />
//             ))}
//           </View>
//         </View>

//         {Object.keys(images).length > 0 && (
//           <View break>
//             <Text style={styles.sectionTitle}>Inspection Photographs</Text>
//             <View style={styles.imageGrid}>
//               {Object.entries(images).map(([key, base64Data]) => (
//                 <View key={key} style={styles.imageBox} wrap={false}>
//                   <Image src={base64Data} style={styles.imageItem} />
//                   <Text style={styles.imageLabel}>{key.split('-')[0].replace(/_/g, ' ')}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}
//       </Page>
//     </Document>
//   );
// };
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { VISUAL_TEST_RULES } from "./VisualTestForm";

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    fontSize: 9, 
    fontFamily: "Helvetica",
    color: "#333" 
  },
  
  // CLEANER VEHICLE HEADER (GRID STYLE)
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  infoBox: {
    width: "50%", 
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
    minHeight: 22,
    alignItems: "center",
  },
  infoLabel: {
    width: "35%",
    backgroundColor: "#f2f2f2", 
    height: "100%",
    paddingLeft: 6,
    fontWeight: "bold",
    fontSize: 8,
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#000",
    display: 'flex',
  },
  infoValue: {
    width: "65%",
    paddingLeft: 6,
    fontSize: 9,
    color: "#000",
    textTransform: "uppercase",
  },
  noBottomBorder: { borderBottomWidth: 0 },
  noRightBorder: { borderRightWidth: 0 },

  // TABLE STYLES
  tableTitle: { 
    marginTop: 10, 
    marginBottom: 6, 
    fontSize: 10, 
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000"
  },
  table: { 
    display: "table", 
    width: "100%", 
    borderTopWidth: 1, 
    borderLeftWidth: 1, 
    borderColor: "#000" 
  },
  tableRow: { 
    flexDirection: "row", 
    minHeight: 22, 
    alignItems: "stretch" 
  },
  tableHeader: { 
    backgroundColor: "#e0e0e0", 
    fontWeight: "bold" 
  },
  cell: { 
    borderRightWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: "#000", 
    justifyContent: "center", 
    padding: 4 
  },
  
  // COLUMN WIDTHS
  colSl: { width: "6%" },
  colName: { width: "34%" },
  colRule: { width: "15%" },
  colApplicable: { width: "12%" },
  colValue: { width: "18%" },
  colResult: { width: "15%" },
  centered: { textAlign: "center" },

  // IMAGES SECTION
  sectionTitle: { 
    marginTop: 25, 
    marginBottom: 10, 
    fontSize: 11, 
    fontWeight: "bold", 
    textDecoration: "underline" 
  },
  imageGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap",
    gap: 10
  },
  imageBox: { 
    width: "30%", 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 3 
  },
  imageItem: { 
    width: "100%", 
    height: 90, 
    objectFit: "cover" 
  },
  imageLabel: { 
    fontSize: 7, 
    textAlign: "center", 
    marginTop: 4,
    fontWeight: "bold",
    textTransform: "capitalize"
  }
});

const TableHeader = () => (
  <View style={[styles.tableRow, styles.tableHeader]}>
    <View style={[styles.cell, styles.colSl]}><Text style={styles.centered}>Sl.</Text></View>
    <View style={[styles.cell, styles.colName]}><Text>Name of Test</Text></View>
    <View style={[styles.cell, styles.colRule]}><Text style={styles.centered}>Rule Ref.</Text></View>
    <View style={[styles.cell, styles.colApplicable]}><Text style={styles.centered}>Applicable</Text></View>
    <View style={[styles.cell, styles.colValue]}><Text style={styles.centered}>Observation</Text></View>
    <View style={[styles.cell, styles.colResult]}><Text style={styles.centered}>Result</Text></View>
  </View>
);

const TableDataRow = ({ index, itemKey, value }) => {
  const ruleObj = VISUAL_TEST_RULES.find((v) => v.key === itemKey);
  const isApplicable = value !== null && value !== undefined && value !== "";
  
  // Format observation text
  let observationText = value === "P" ? "OKAY" : (value === "F" || value === "0") ? "DEFECT" : value;
  
  // Logic to determine Pass/Fail color
  const isPass = value === "P" || (typeof value === "number" && value > 0) || (typeof value === "string" && !isNaN(value) && value !== "0");

  const formatLabel = (str) => {
    if (ruleObj) return ruleObj.label.split(" (")[0];
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <View style={styles.tableRow} key={itemKey}>
      <View style={[styles.cell, styles.colSl]}><Text style={styles.centered}>{index + 1}</Text></View>
      <View style={[styles.cell, styles.colName]}><Text>{formatLabel(itemKey)}</Text></View>
      <View style={[styles.cell, styles.colRule]}><Text style={styles.centered}>{ruleObj?.key.split("_")[1] || "N/A"}</Text></View>
      <View style={[styles.cell, styles.colApplicable]}><Text style={styles.centered}>{isApplicable ? "YES" : "NO"}</Text></View>
      <View style={[styles.cell, styles.colValue]}><Text style={styles.centered}>{observationText || "—"}</Text></View>
      <View style={[styles.cell, styles.colResult]}>
        <Text style={[styles.centered, { fontWeight: "bold", color: isPass ? "#000" : "#D32F2F" }]}>
          {isPass ? "PASS" : "FAIL"}
        </Text>
      </View>
    </View>
  );
};

export const VehicleReportPDF = ({ vehicle = {}, vehicleNO, images = {}, vehicleDetails }) => {
  // Separate rules from other data metrics
  const visualTests = Object.entries(vehicle).filter(([key]) => key.toLowerCase().startsWith("rule"));
  const functionalTests = Object.entries(vehicle).filter(([key]) => !key.toLowerCase().startsWith("rule"));

  return (
    <Document title={`Inspection_Report_${vehicleNO}`}>
      <Page style={styles.page} size="A4">
        
        {/* REFACTORED VEHICLE DETAILS HEADER */}
        {vehicleDetails && (
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <View style={styles.infoLabel}><Text>Booking ID</Text></View>
              <Text style={styles.infoValue}>{vehicleDetails.bookingId || "N/A"}</Text>
            </View>
            <View style={[styles.infoBox, styles.noRightBorder]}>
              <View style={styles.infoLabel}><Text>Reg No.</Text></View>
              <Text style={styles.infoValue}>{vehicleNO || "N/A"}</Text>
            </View>

            <View style={styles.infoBox}>
              <View style={styles.infoLabel}><Text>Chassis No</Text></View>
              <Text style={styles.infoValue}>{vehicleDetails.chassisNo || "N/A"}</Text>
            </View>
            <View style={[styles.infoBox, styles.noRightBorder]}>
              <View style={styles.infoLabel}><Text>Engine No</Text></View>
              <Text style={styles.infoValue}>{vehicleDetails.engineNo || "N/A"}</Text>
            </View>

            <View style={[styles.infoBox, styles.noBottomBorder]}>
              <View style={styles.infoLabel}><Text>Entry Time</Text></View>
              <Text style={styles.infoValue}>{vehicleDetails.laneEntryTime || "N/A"}</Text>
            </View>
            <View style={[styles.infoBox, styles.noBottomBorder, styles.noRightBorder]}>
              <View style={styles.infoLabel}><Text>Report Date</Text></View>
              <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        )}

        {/* VISUAL INSPECTION TABLE */}
        <Text style={styles.tableTitle}>Visual Inspection (Rule 189)</Text>
        <View style={styles.table}>
          <TableHeader />
          {visualTests.map(([key, value], index) => (
            <TableDataRow key={key} index={index} itemKey={key} value={value} />
          ))}
        </View>

        {/* FUNCTIONAL METRICS TABLE */}
        {functionalTests.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.tableTitle}>Functional & Performance Metrics</Text>
            <View style={styles.table}>
              <TableHeader />
              {functionalTests.map(([key, value], index) => (
                <TableDataRow key={key} index={index} itemKey={key} value={value} />
              ))}
            </View>
          </View>
        )}

        {/* PHOTOGRAPHS SECTION */}
        {Object.keys(images).length > 0 && (
          <View break>
            <Text style={styles.sectionTitle}>Inspection Photographs</Text>
            <View style={styles.imageGrid}>
              {Object.entries(images).map(([key, base64Data]) => (
                <View key={key} style={styles.imageBox} wrap={false}>
                  <Image src={base64Data} style={styles.imageItem} />
                  <Text style={styles.imageLabel}>
                    {key.split('-')[0].replace(/_/g, ' ')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
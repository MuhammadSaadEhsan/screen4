// import React, { useEffect, useState } from "react";
// import { Card, Select } from "antd";
// import { Input, Button, Form } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import Password from "antd/es/input/Password";
// import { Upload } from "antd";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { imageDb } from "../firebase"; // adjust path as needed
// import { v4 as uuidv4 } from "uuid";

// export default function AddClientForm() {
//   const { id } = useParams();
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [selectedTestMethods, setSelectedTestMethods] = useState([]);
//   const [client, setClient] = useState({
//     name: "",
//     contact: "",
//     hqAddress: [
//       {
//         address: "",         // For HQ
//         contactName: "",     // Optional (can be empty for HQ)
//         contactEmail: "",    // Optional (can be empty for HQ)
//       },
//     ],
//     operationalBases: [{ address: "", contact: "" }],
//     emails: "",
//     password:"",
//     testMethods: [],
//     testingTechnology:[],
//     cutOffLevels: "",
//     costings: "",
//     // jobPack: {
//     //   jobRequest: {
//     //     location: "",
//     //     testType: "",
//     //     cutoffs: "",
//     //     actions: "",
//     //     shipmentDetails: "",
//     //     labDetails: "",
//     //   },
//     //   donorInfoDocs: "",
//     // },
//     jobPack:""
//   });
//   const testMethodOptions = [
//     "Random Testing",
//     "Pre-Employment Testing",
//     "Follow up Testing",
//     "With Cause Testing",
//   ];

//   const testingTechnologyOptions = {
//     "Random Testing": [
//       "Random - Breath Alcohol",
//       "Random - Breath Alcohol and Drug – Urine",
//       "Random - Breath Alcohol and Drug – Oral Fluid",
//       "Random - Breath Alcohol and Drug - Hair",
//     ],
//     "Pre-Employment Testing": [
//       "Pre-Employment - Hair Testing",
//     ],
//     "Follow up Testing": [
//       "Follow up - Breath Alcohol",
//       "Follow up - Breath Alcohol and Drug – Urine",
//       "Follow up - Breath Alcohol and Drug – Oral Fluid",
//       "Follow up - Breath Alcohol and Drug - Hair",
//     ],
//     "With Cause Testing": [
//       "With Cause - Breath Alcohol",
//       "With Cause - Breath Alcohol and Drug – Urine",
//       "With Cause - Breath Alcohol and Drug – Oral Fluid",
//       "With Cause - Breath Alcohol and Drug - Hair",
//     ],
//   };


//   const addNewSite = () => {
//   setClient((prev) => ({
//     ...prev,
//     hqAddress: [...prev.hqAddress, { address: "", contactName: "", contactEmail: "" }]
//   }));
// };

// const updateSiteField = (index, field, value) => {
//   // setClient((prev) => {
//   //   const updated = [...prev.hqAddress];
//   //   updated[index] = { ...updated[index], [field]: value };

//   //   return {
//   //     ...prev,
//   //     hqAddress: updated
//   //   };
//   // });
//   // let clientss = client;
//   // clientss.hqAddress[index][field] = value;
//   // // let updated = [...client.hqAddress];
//   // console.log(clientss);
//   // setClient(clientss);
//   // console.log(index, field, value); 
// };



//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/getclients/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch client data");
//         }
//         const data = await response.json();

//         console.log("Fetched client data:", data); // Check API response structure

//         if (!data || typeof data !== "object") {
//           console.error("Unexpected response format:", data);
//           return;
//         }

//         // setClient((prev) => ({
//         //   ...prev,
//         //   ...data, // Merge fetched data with the existing client structure
//         // }));
//         const { password, ...filteredData } = data;

//         setClient((prev) => ({
//           ...prev,
//           ...filteredData, // Merge fetched data without password
//           password: "", // Ensure password remains blank
//         }));
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         console.log("final");
//         console.log(client);
//         setLoading(false);
//       }
//     };

//     if (id) fetchClients();
//   }, [id]);

//   useEffect(() => {
//     console.log("Updated client state:", client);
//   }, [client]); // This will log the updated client state after React applies the update

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setClient({ ...client, [name]: value });
//   };

//   const handleOperationalBaseChange = (index, field, value) => {
//     const updatedBases = [...client.operationalBases];
//     updatedBases[index][field] = value;
//     setClient({ ...client, operationalBases: updatedBases });
//   };

//   const addOperationalBase = () => {
//     setClient({
//       ...client,
//       operationalBases: [
//         ...client.operationalBases,
//         { address: "", contact: "" },
//       ],
//     });
//   };

//   // const handleSubmit = async (values) => {
//   //   try {
//   //     let response;

//   //     if (client?._id) {
//   //       // Use PUT for updates
//   //       response = await fetch(
//   //         `${process.env.REACT_APP_API_URL}/updateclient/${client._id}`,
//   //         {
//   //           method: "PUT", // Changed to PUT
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           body: JSON.stringify(values),
//   //         }
//   //       );
//   //     } else {
//   //       // Use POST for adding a new client
//   //       response = await fetch(`${process.env.REACT_APP_API_URL}/addclient`, {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify(values),
//   //       });
//   //     }

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       console.log("Success:", data.message);
//   //       setClient(data.client || {}); // Update the state with new data if available

//   //       // Show success message
//   //       message(
//   //         client?._id
//   //           ? "Client updated successfully!"
//   //           : "Client added successfully!"
//   //       );

//   //       // Navigate after successful update/add
//   //       navigate("/clients");
//   //     } else {
//   //       console.error("Error:", data.message);
//   //       message("Error: " + data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("Request failed:", error);
//   //     message("Request failed. Please try again.");
//   //   }
//   // };

//   const handleSubmit = async (values) => {
//     try {
//       let jobPackUrl = "";

//       // 🔽 Check for uploaded file
//       const fileList = values.jobPack?.fileList;
//       if (fileList && fileList.length > 0) {
//         const file = fileList[0].originFileObj;

//         const storageRef = ref(imageDb, `jobpacks/${uuidv4()}_${file.name}`);
//         await uploadBytes(storageRef, file);
//         jobPackUrl = await getDownloadURL(storageRef);
//       }

//       // 🔽 Prepare updated client data
//       const clientData = {
//         ...values,
//         jobPack: jobPackUrl, // 📦 Store only URL now
//       };

//       let response;

//       if (client?._id) {
//         // 🔁 PUT for update
//         response = await fetch(
//           `${process.env.REACT_APP_API_URL}/updateclient/${client._id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(clientData),
//           }
//         );
//       } else {
//         // 🆕 POST for new client
//         response = await fetch(`${process.env.REACT_APP_API_URL}/addclient`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(clientData),
//         });
//       }

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Success:", data.message);
//         setClient(data.client || {});
//         message(client?._id ? "Client updated successfully!" : "Client added successfully!");
//         navigate("/clients");
//       } else {
//         console.error("Error:", data.message);
//         message("Error: " + data.message);
//       }
//     } catch (error) {
//       console.error("Request failed:", error);
//       message("Request failed. Please try again.");
//     }
//   };



//   const [form] = Form.useForm(); // Hook for controlled form management

//   // Update form fields when `client` state changes
//   useEffect(() => {
//     form.setFieldsValue(client); // This updates all fields when client data is fetched
//   }, [client]);
//   return (
//     <div
//       style={{
//         padding: "20px",
//         display: "grid",
//         placeItems: "center",

//         height: "100%",
//         background: "#80c209",
//       }}
//     >
//       <Card title="Add Client" style={{ width: "1300px", margin: "auto" }}>
//         <Form
//           form={form}
//           onFinish={handleSubmit}
//           layout="vertical"
//           initialValues={client} // This is just for the first render
//         >
//           <Form.Item
//             label="Client Name"
//             name="name"
//             onChange={(e) => setClient((prev) => ({ ...prev, name: e.target.value }))}
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Contact"
//             name="contact"
//             onChange={(e) => setClient((prev) => ({ ...prev, contact: e.target.value }))}
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>

//           {/* <Form.Item
//             label="HQ Address"
//             name="hqAddress"
//             rules={[{ required: true }]}
//           >
//             <Input.TextArea />
//           </Form.Item> */}
//           {/* <Form.Item label="HQ Address" required>
//   {client.hqAddress.map((address, index) => (
//     <Input.TextArea
//       key={index}
//       value={address}
//       onChange={(e) => handleAddressChange(index, e.target.value)}
//       style={{ marginBottom: 10 }}
//       placeholder={`Address ${index + 1}`}
//     />
//   ))}
//   <button type="button" onClick={addAddressField} style={{ marginTop: 8 }}>
//     + Add More
//   </button>
// </Form.Item> */}
// {/* {client.hqAddress.map((site, index) => (
//   <div
//     key={index}
//     style={{
//       marginBottom: "15px",
//       padding: "10px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//     }}
//   >
//     <h4>{index === 0 ? "HQ Address" : `Site Address ${index}`}</h4>

//     <Input.TextArea
//       placeholder="Enter address"
//       value={site.address}
//       onChange={(e) => updateSiteField(index, "address", e.target.value)}
//       style={{ marginBottom: "8px" }}
//     />

//     <Input
//       placeholder="Site Contact Name"
//       value={site.contactName}
//       onChange={(e) => updateSiteField(index, "contactName", e.target.value)}
//       style={{ marginBottom: "8px" }}
//     />

//     <Input
//       placeholder="Site Contact Email"
//       value={site.contactEmail}
//       onChange={(e) => updateSiteField(index, "contactEmail", e.target.value)}
//     />
//   </div>
// ))}

// <Button onClick={addNewSite}>+ Add Additional Site Address</Button> */}
// {client.hqAddress.map((site, index) => (
//   <div
//     key={index}
//     style={{
//       marginBottom: "15px",
//       padding: "10px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//     }}
//   >
//     <p>{index === 0 ? "HQ Address" : `Site Address ${index}`}</p>

//     <Input.TextArea
//       placeholder="Enter address"
//       // value={site.address}
//       onChange={(e) => updateSiteField(index, "address", e.target.value)}
//       style={{ marginBottom: "8px" }}
//     />

//     {index !== 0 && (
//       <>
//         <Input
//           placeholder="Site Contact Name"
//           // value={site.contactName}
//           onChange={(e) => updateSiteField(index, "contactName", e.target.value)}
//           style={{ marginBottom: "8px" }}
//         />

//         <Input
//           placeholder="Site Contact Email"
//           // value={site.contactEmail}
//           onChange={(e) => updateSiteField(index, "contactEmail", e.target.value)}
//         />
//       </>
//     )}
//   </div>
// ))}

// <Button onClick={addNewSite} style={{marginBottom:"30px"}}>+ Add Additional Site Address</Button>



//           <Form.Item
//             label="Main Contact Email Address"
//             name="emails"
//             onChange={(e) => setClient((prev) => ({ ...prev, emails: e.target.value }))}
//             rules={[{ required: true }]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item
//             label="Password"
//             name="password"
//             onChange={(e) => setClient((prev) => ({ ...prev, password: e.target.value }))}
//             // rules={[{ required: true, message: "Password is required!" }]}
//           >
//             <Input.Password />
//           </Form.Item>

//           {/* <Form.Item
//             label="Test Methods"
//             name="testMethods"
//             rules={[{ required: true }]}
//           >
//             <Input.TextArea />
//           </Form.Item> */}
//           <Form.Item label="Test Methods" name="testMethods" rules={[{ required: true }]}>
//   <Select
//     mode="multiple"
//     placeholder="Select test methods"
//     onChange={(value) => setSelectedTestMethods(value)}
//   >
//     {testMethodOptions.map((method) => (
//       <Select.Option key={method} value={method}>
//         {method}
//       </Select.Option>
//     ))}
//   </Select>
// </Form.Item>

// <Form.Item
//   label="Testing Technologies"
//   name="testingTechnology"
//   rules={[{ required: true }]}
// >
//   <Select
//     mode="multiple"
//     placeholder="Select testing technologies"
//   >
//     {selectedTestMethods.flatMap((method) =>
//       testingTechnologyOptions[method] || []
//     ).map((tech) => (
//       <Select.Option key={tech} value={tech}>
//         {tech}
//       </Select.Option>
//     ))}
//   </Select>
// </Form.Item>


//           {/* <Form.Item
//             label="Breath Alcohol Cut off Level"
//             name="cutOffLevels"
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item> */}

// <Form.Item
//   label="Breath Alcohol Cut off Level"
//   name="cutOffLevels"
//   rules={[{ required: true }]}
// >
//   <Select placeholder="Select Cut Off Level">
//     <Select.Option value="N/A">N/A</Select.Option>
//     <Select.Option value="0">0</Select.Option>
//     <Select.Option value="8">8</Select.Option>
//     <Select.Option value="22">22</Select.Option>
//     <Select.Option value="35">35</Select.Option>
//   </Select>
// </Form.Item>

//           <Form.Item
//             label="Costings"
//             name="costings"
//             rules={[{ required: true }]}
//             onChange={(e) => setClient((prev) => ({ ...prev, costings: e.target.value }))}
//           >
//             <Input />
//           </Form.Item>

//           {/* <h3>Job Pack</h3>
//           <Form.Item
//             label="Location"
//             name={["jobPack", "jobRequest", "location"]}
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Test Type"
//             name={["jobPack", "jobRequest", "testType"]}
//             rules={[{ required: true }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Actions Following Results"
//             name={["jobPack", "jobRequest", "actions"]}
//             rules={[{ required: true }]}
//           >
//             <Input.TextArea />
//           </Form.Item>

//           <Form.Item>
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 background: "#80c209",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//               }}
//             >
//               {client?._id ? "Update" : "Add"}
//             </button>
//           </Form.Item> */}
//           <h3>Job Pack</h3>
// <Form.Item
//   label="Upload Job Pack Document"
//   name="jobPack"
//   valuePropName="file"
//   rules={[{ required: true, message: "Please upload the job pack document." }]}
// >
//   <Upload
//     beforeUpload={() => false} // Prevent automatic upload
//     accept=".pdf,.doc,.docx"
//     maxCount={1}
//   >
//     <Button>Click to Upload</Button>
//   </Upload>
// </Form.Item>
// {client.jobPack && (
//   <div style={{ marginTop: "15px", display: "flex", gap: "15px", alignItems: "center" }}>
//     <a
//       href={client.jobPack}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         padding: "8px 16px",
//         backgroundColor: "#80c209",
//         color: "#fff",
//         textDecoration: "none",
//         borderRadius: "6px",
//         fontWeight: "bold",
//         marginBottom:"20px"
//       }}
//     >
//       🔍 View Job Pack
//     </a>
//     {/* <a
//       href={client.jobPack}
//       target="_blank"
//       rel="noopener noreferrer"
//       download
//       style={{
//         padding: "8px 16px",
//         backgroundColor: "#28a745",
//         color: "#fff",
//         textDecoration: "none",
//         borderRadius: "6px",
//         fontWeight: "bold",
//       }}
//     >
//       📥 Download
//     </a> */}
//   </div>
// )}

// <Form.Item>
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 background: "#80c209",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//               }}
//             >
//               {client?._id ? "Update" : "Add"}
//             </button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button, Form, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function AddClientForm() {
  const [isloading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [selectedTestMethods, setSelectedTestMethods] = useState([]);
  const [client, setClient] = useState({
    name: "",
    contact: "",
    hqAddress: [{ address: "", contactName: "", contactEmail: "" }],
    operationalBases: [{ address: "", contact: "" }],
    emails: "",
    password: "",
    testMethods: [],
    testingTechnology: [],
    cutOffLevels: "",
    costings: "",
    jobPack: "",

    // NEW FIELDS
    secondBreathTestRequired: "No",        // "Yes" or "No"
    drugKitType: "",                        // e.g. "Urine" or "Oral Fluid"
    nonNegativeSamplesToLab: "No",         // "Yes" or "No"
    laboratoryAddress: "",                 // Text
    sampleDeliveryMethod: "",
  });

  const testMethodOptions = [
    "Random Testing",
    "Pre-Employment Testing",
    "Follow up Testing",
    "With Cause Testing",
  ];

  const testingTechnologyOptions = {
    "Random Testing": [
      "Random - Breath Alcohol",
      "Random - Breath Alcohol and Drug – Urine",
      "Random - Breath Alcohol and Drug – Oral Fluid",
      "Random - Breath Alcohol and Drug - Hair",
    ],
    "Pre-Employment Testing": ["Pre-Employment - Hair Testing"],
    "Follow up Testing": [
      "Follow up - Breath Alcohol",
      "Follow up - Breath Alcohol and Drug – Urine",
      "Follow up - Breath Alcohol and Drug – Oral Fluid",
      "Follow up - Breath Alcohol and Drug - Hair",
    ],
    "With Cause Testing": [
      "With Cause - Breath Alcohol",
      "With Cause - Breath Alcohol and Drug – Urine",
      "With Cause - Breath Alcohol and Drug – Oral Fluid",
      "With Cause - Breath Alcohol and Drug - Hair",
    ],
  };
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/getclients/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();

        console.log("Fetched client data:", data); // Check API response structure

        if (!data || typeof data !== "object") {
          console.error("Unexpected response format:", data);
          return;
        }

        // setClient((prev) => ({
        //   ...prev,
        //   ...data, // Merge fetched data with the existing client structure
        // }));
        const { password, ...filteredData } = data;

        setClient((prev) => ({
          ...prev,
          ...filteredData, // Merge fetched data without password
          password: "", // Ensure password remains blank
        }));
      } catch (err) {
        // setError(err.message);
      } finally {
        console.log("final");
        console.log(client);
        // setLoading(false);
      }
    };

    if (id) fetchClients();
  }, [id]);

  const addNewSite = () => {
    setClient((prev) => ({
      ...prev,
      hqAddress: [...prev.hqAddress, { address: "", contactName: "", contactEmail: "" }],
    }));
  };

  const updateSiteField = (index, field, value) => {
    setClient((prev) => {
      const updated = [...prev.hqAddress];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, hqAddress: updated };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let jobPackUrl = client.jobPack;
      const fileList = form.getFieldValue("jobPack")?.fileList;

      if (fileList && fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(imageDb, `jobpacks/${uuidv4()}_${file.name}`);
        await uploadBytes(storageRef, file);
        jobPackUrl = await getDownloadURL(storageRef);
      }

      const payload = { ...client, jobPack: jobPackUrl };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${client._id ? `updateclient/${client._id}` : "addclient"}`,
        {
          method: client._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        message.success(client._id ? "Client updated successfully!" : "Client added successfully!");
        navigate("/clients");
      } else {
        message.error("Error: " + data.message);
      }
    } catch (error) {
      message.error("Request failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20, display: "grid", placeItems: "center", background: "#80c209" }}>
      <Card title="Add Client" style={{ width: 1300 }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Client Name">
            <Input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
          </Form.Item>

          <Form.Item label="Contact">
            <Input value={client.contact} onChange={(e) => setClient({ ...client, contact: e.target.value })} />
          </Form.Item>

          {client.hqAddress.map((site, index) => (
            <div key={index} style={{ padding: 10, border: "1px solid #ccc", marginBottom: 15, borderRadius: 6 }}>
              <p>{index === 0 ? "HQ Address" : `Site Address ${index}`}</p>
              <Input.TextArea
                placeholder="Enter address"
                value={site.address}
                onChange={(e) => updateSiteField(index, "address", e.target.value)}
                style={{ marginBottom: 8 }}
              />
              {index !== 0 && (
                <>
                  <Input
                    placeholder="Site Contact Name"
                    value={site.contactName}
                    onChange={(e) => updateSiteField(index, "contactName", e.target.value)}
                    style={{ marginBottom: 8 }}
                  />
                  <Input
                    placeholder="Site Contact Email"
                    value={site.contactEmail}
                    onChange={(e) => updateSiteField(index, "contactEmail", e.target.value)}
                  />
                </>
              )}
            </div>
          ))}

          <Button onClick={addNewSite} style={{ marginBottom: 30 }}>
            + Add Additional Site Address
          </Button>

          <Form.Item label="Main Contact Email Address">
            <Input.TextArea
              value={client.emails}
              onChange={(e) => setClient({ ...client, emails: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              value={client.password}
              onChange={(e) => setClient({ ...client, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Test Methods">
            <Select
              mode="multiple"
              value={client.testMethods}
              onChange={(value) => {
                setClient({ ...client, testMethods: value });
                setSelectedTestMethods(value);
              }}
              placeholder="Select test methods"
            >
              {testMethodOptions.map((method) => (
                <Select.Option key={method} value={method}>
                  {method}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Testing Technologies">
            <Select
              mode="multiple"
              value={client.testingTechnology}
              onChange={(value) => setClient({ ...client, testingTechnology: value })}
              placeholder="Select testing technologies"
            >
              {selectedTestMethods.flatMap((method) => testingTechnologyOptions[method] || []).map((tech) => (
                <Select.Option key={tech} value={tech}>
                  {tech}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Breath Alcohol Cut off Level">
            <Select
              value={client.cutOffLevels}
              onChange={(value) => setClient({ ...client, cutOffLevels: value })}
              placeholder="Select Cut Off Level"
            >
              {['N/A', '0', '8', '22', '35'].map((level) => (
                <Select.Option key={level} value={level}>{level}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Costings">
            <Input
              value={client.costings}
              onChange={(e) => setClient({ ...client, costings: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Client Details">
  <table style={{ width: "100%" }}>
    <tbody>
          <tr>
  <td><strong>Second Breath Test Required?</strong></td>
  <td>
    <label>
      <input
        type="radio"
        name="secondBreathTestRequired"
        value="Yes"
        checked={client.secondBreathTestRequired === "Yes"}
        onChange={(e) => setClient({ ...client, secondBreathTestRequired: e.target.value })}
      /> Yes
    </label>
    <label style={{ marginLeft: "15px" }}>
      <input
        type="radio"
        name="secondBreathTestRequired"
        value="No"
        checked={client.secondBreathTestRequired === "No"}
        onChange={(e) => setClient({ ...client, secondBreathTestRequired: e.target.value })}
      /> No
    </label>
  </td>
</tr>

<tr>
  <td><strong>Drugs (Kit Type)</strong></td>
  <td>
    <select
      value={client.drugKitType}
      onChange={(e) => setClient({ ...client, drugKitType: e.target.value })}
    >
      <option value="" disabled>Select Kit Type</option>
      <option value="Urine">Urine (POCT 10 Panel cup / BtL)</option>
      <option value="Oral Fluid">Oral Fluid (POCT 9NR / Oral-Eze BtL)</option>
    </select>
  </td>
</tr>

<tr>
  <td><strong>Non-Negative Samples to Lab?</strong></td>
  <td>
    <label>
      <input
        type="radio"
        name="nonNegativeSamplesToLab"
        value="Yes"
        checked={client.nonNegativeSamplesToLab === "Yes"}
        onChange={(e) => setClient({ ...client, nonNegativeSamplesToLab: e.target.value })}
      /> Yes
    </label>
    <label style={{ marginLeft: "15px" }}>
      <input
        type="radio"
        name="nonNegativeSamplesToLab"
        value="No"
        checked={client.nonNegativeSamplesToLab === "No"}
        onChange={(e) => setClient({ ...client, nonNegativeSamplesToLab: e.target.value })}
      /> No
    </label>
  </td>
</tr>

<tr>
  <td><strong>Laboratory Address</strong></td>
  <td>
    <Input
      value={client.laboratoryAddress}
      onChange={(e) => setClient({ ...client, laboratoryAddress: e.target.value })}
    />
  </td>
</tr>

<tr>
  <td><strong>Samples Back to Lab</strong></td>
  <td>
    <Input
      value={client.sampleDeliveryMethod}
      onChange={(e) => setClient({ ...client, sampleDeliveryMethod: e.target.value })}
    />
  </td>
</tr>
</tbody>
  </table>
</Form.Item>
{/* 

          <Form.Item label="Upload Job Pack Document" name="jobPack" valuePropName="file">
            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx" maxCount={1}>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <div style={{ marginTop: "15px", display: "flex", gap: "15px", alignItems: "center" }}>
            <a
              href={client.jobPack}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                backgroundColor: "#80c209",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                marginBottom: "20px"
              }}
            >
              🔍 View Job Pack
            </a>
          </div> */}

<Form.Item label="Upload Job Pack Document" name="jobPack" valuePropName="file">
  <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx" maxCount={1}>
    <Button>Click to Upload</Button>
  </Upload>
</Form.Item>



{(() => {
  const uploadedFile = form.getFieldValue("jobPack");

  // Case 1: show Firebase URL if client.jobPack is saved
  if (client.jobPack) {
    return (
      <div style={{ marginTop: 15, display: "flex", gap: 15 }}>
        <a
          href={client.jobPack}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 16px",
            backgroundColor: "#80c209",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}
        >
          🔍 View Saved Job Pack
        </a>
      </div>
    );
  }

  // Case 2: show preview if file is uploaded but not saved
  if (uploadedFile && uploadedFile.originFileObj) {
    const fileURL = URL.createObjectURL(uploadedFile.originFileObj);
    return (
      <div style={{ marginTop: 15, display: "flex", gap: 15 }}>
        <a
          href={fileURL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 16px",
            backgroundColor: "#f0ad4e",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          👁️ Preview Uploaded File
        </a>
      </div>
    );
  }

  // Case 3: no file at all
  return null;
})()}



          <Form.Item>
            {!isloading ? <button type="submit" style={submitStyle}>
              {client?._id ? "Update" : "Add"}
            </button> :<div style={{width:"100%",display: "flex",justifyContent:"center"}}><img src="/empty.gif" style={{width:"130px",}}/></div>}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const viewLinkStyle = {
  padding: "8px 16px",
  backgroundColor: "#80c209",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

const downloadLinkStyle = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

const submitStyle = {
  width: "100%",
  padding: "10px",
  background: "#80c209",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};
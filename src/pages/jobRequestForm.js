import "../css/profile.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { message } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Tooltip } from 'antd';
import "../css/Practitioner.css";

function JobRequestForm() {
  const [isloading, setIsLoading] = useState(false);
  const [clientDetails,setClientDetails] = useState()
  const [currentSignatureField, setCurrentSignatureField] = useState("");
  const openSignaturePad2 = (fieldName) => {
    setCurrentSignatureField(fieldName);
    setIsSignaturePadOpen(true);
    setTimeout(initializeCanvas, 0);
  };
  
  const [formData, setFormData] = useState({
    jobReferenceNo: "",
    dateAndTimeOfCollection: "",
    location: "",
    customer: "",
    customerEmail: "",
    nameOfOnsiteContact: "",
    contactOfTelephoneNo: "",
    numberOfDonors: "",
    TypeOfTest: "",
    callOutType: "",
    reasonForTest: "",

    date: "",
    collectionOfficerName: "",
    arrivalTime: "",
    departureTime: "",
    waitingTime: "",
    mileage: "",
    samplesMailed: "",
    breathAlcoholTestsCompleted: "",
    drugTestsCompleted: "",
    nonZeroBreathAlcoholTests: "",
    nonNegativeSamples: "",
    notes: "",
    facilities: {
      privateSecureRoom: false,
      wcFacilities: false,
      handWashing: false,
      securedWindows: false,
      emergencyExits: false,
      translatorRequired: false,
    },
    onsiteSignature: "",
    officerSignature: "",
    author: "",
    rev: "",
    alcoholTestResult: "",
    secondBreathTest: "",
    drugKitType: "",
    nonNegativeSamples: "",
    laboratoryAddress: "",
    sampleDeliveryMethod: "",
    flightVessel: "",
  });
  const navigate = useNavigate()
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [formData, setFormData] = useState({ donorSignature: "" });
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [donorOpen, setIsDonorOpen] = useState(false);
  const [donorConcentOpen, setIsDonorConcentOpen] = useState(false);
  const [collectorOpen, setIsCollectorOpen] = useState(false);
  const [collectorCertificationOpen, setIsCollectorCerificationOpen] =
    useState(false);


  const [customers, setCustomers] = useState([]);
  const [customerEmail, setCustomerEmail] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const token = Cookies.get("Token");
    if (
      !token ||
      (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" 
       &&
        token !== "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg"
       &&
        token !== "clientdgf45sdgf@89756dfgdhg&%df")
    ) {
      navigate("/");
      return;
    }
  }, [navigate]);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_API_URL}/getcustomers`);
  //       const data = await response.data;

  //       // Use a Set to track unique "name|email" combinations
  //       const uniqueMap = new Map();

  //       data.forEach((item) => {
  //         const key = `${item.name}|${item.emails}`;
  //         if (!uniqueMap.has(key)) {
  //           uniqueMap.set(key, {
  //             name: item.name,
  //             email: item.emails,
  //           });
  //         }
  //       });

  //       setCustomers(Array.from(uniqueMap.values()));
  //       const locationSet = new Map();

  //     data.forEach((customer) => {
  //       if (Array.isArray(customer.hqAddress)) {
  //         customer.hqAddress.forEach((addr) => {
  //           const key = `${addr.address}|${addr.contactEmail}`; // Avoid duplicates
  //           if (!locationSet.has(key)) {
  //             locationSet.set(key, {
  //               address: addr.address,
  //               ...addr,
  //             });
  //           }
  //         });
  //       }
  //     });

  //     setLocations(Array.from(locationSet.values())); // Final locations list
  //     } catch (error) {
  //       console.error("Failed to fetch customers", error);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getcustomers`);
        const data = await response.data;

        const uniqueMap = new Map();
        data.forEach((item) => {
          const key = `${item.name}|${item.emails}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, {
              name: item.name,
              email: item.emails,
              hqAddress: item.hqAddress
            });
          }
        });

        const uniqueCustomers = Array.from(uniqueMap.values());
        setCustomers(uniqueCustomers);
        setLocations(getAllAddresses(data));
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    };

    const getAllAddresses = (data) => {
      const locationSet = new Map();
      data.forEach((customer) => {
        if (Array.isArray(customer.hqAddress)) {
          customer.hqAddress.forEach((addr) => {
            const key = `${addr.address}|${addr.contactEmail}`;
            if (!locationSet.has(key)) {
              locationSet.set(key, {
                address: addr.address,
                contactName: addr.contactName,
                contactEmail: addr.contactEmail,
              });
            }
          });
        }
      });
      return Array.from(locationSet.values());
    };

    fetchCustomers();
  }, []);
  const extractEmailFromCustomer = (str) => {
    const match = str.match(/\((.*?)\)/);
    return match ? match[1] : null;
  };

  // 🧠 Filter locations for selected customer
  useEffect(() => {
    if (!formData.customer) return;

    const selectedEmail = extractEmailFromCustomer(formData.customer);
    const customerObj = customers.find((c) => c.email === selectedEmail);

    if (customerObj && Array.isArray(customerObj.hqAddress)) {
      setLocations(customerObj.hqAddress);
    } else {
      setLocations([]);
    }
  }, [formData.customer, customers]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleAddComment = (field) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      setFormData((prev) => {
        const updatedFormData = { ...prev, [field]: comment };
        return updatedFormData;
      });
    }
  };
  const generateUniqueJobRef = async () => {
    // 1. Fetch all existing job references
    const response = await fetch(`${process.env.REACT_APP_API_URL}/getreferenceno`);
    const existingRefs = await response.json();

    const existingSet = new Set(existingRefs.map(ref => ref.jobReferenceNo));

    // 2. Generate until we get a unique one
    let uniqueRef = "";
    do {
      const number = Math.floor(10000 + Math.random() * 900); // e.g. 3-digit for S4/123
      uniqueRef = `S4/${number}`;
    } while (existingSet.has(uniqueRef));

    return uniqueRef;
  };


  useEffect(() => {
    const setJobRef = async () => {
      const ref = await generateUniqueJobRef();
      setFormData(prev => ({ ...prev, jobReferenceNo: ref }));
    };

    if (!formData.jobReferenceNo) {
      setJobRef();
    }
  }, []);


  const pad = (data) => {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "400px",
            height: "200px",
            border: "1px solid #ccc",
            cursor: "crosshair",
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
        />
        <div style={{ marginTop: "10px" }}>
          <button
            type="button"
            onClick={clearCanvas}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={closeSignaturePadWithoutSave}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              closeSignaturePad(data);
            }}
            style={{
              padding: "5px 10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save & Close
          </button>
        </div>
      </div>
    );
  };

  const specificFields = [
    "DrugsandAlcoholUrineTest",
    "DrugsandAlcoholOralTest",
    "BreathAlcoholOnlyTest",
    "DrugsOnlyTest",
  ];
  const openSignaturePad = () => {
    setIsSignaturePadOpen(true);
    setTimeout(initializeCanvas, 0); // Initialize canvas after it renders
  };

  const closeSignaturePad = (mydata) => {
    setIsSignaturePadOpen(false);

    // Save canvas content as a data URL
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL();
    console.log(mydata);
    setFormData((prevData) => ({ ...prevData, [mydata]: signatureData }));
    setIsDonorOpen(false);
    setIsCollectorOpen(false);
    setIsDonorConcentOpen(false);
    setIsCollectorCerificationOpen(false);
  };
  const closeSignaturePadWithoutSave = () => {
    setIsSignaturePadOpen(false);

    // Save canvas content as a data URL
    const canvas = canvasRef.current;
    // const signatureData = canvas.toDataURL();
    // setFormData((prevData) => ({ ...prevData, donorSignature: signatureData }));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };


  const getFormattedDate = () => {
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return today.toLocaleDateString("en-GB", options);
  };

  // const handleChange = async (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => {
  //       const updatedData = {
  //           ...prevData,
  //           [name]: type === "checkbox" ? checked : value.toString(),
  //       };
  //       console.log(updatedData); // Logs the updated state immediately
  //       return updatedData;
  //   });
  // };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      let updatedData;

      // Check if the input belongs to facilities (nested object)
      if (name in prevData.facilities) {
        updatedData = {
          ...prevData,
          facilities: {
            ...prevData.facilities,
            [name]: checked, // Update checkbox inside facilities
          },
        };
      } else {
        updatedData = {
          ...prevData,
          [name]: type === "checkbox" ? checked : value.toString(),
        };
      }

      console.log(updatedData); // Logs the updated state immediately
      return updatedData;
    });
  };

  // console.log("Form Data Submitted: ", formData);
  // if (!formData.reasonForTest) {
  //   setIsError("reasonForTest");
  //   message.warning("Please select a reason for the test");
  // }
  // else if (!formData.gender) {
  //   setIsError("gender");
  //   message.warning("Please select gender");
  // }
  // else if (!formData.alcohoDeclaration) {
  //   setIsError("alcohoDeclaration");
  //   message.warning("Please answer RESIDUAL MOUTH ALCOHOL DECLARATION");
  // }
  // else if (!formData.donorSignature) {
  //   setIsError("donorSignature");
  //   message.warning("Please fill donor signature");
  // }
  // else if (!formData.collectorSignature) {
  //   setIsError("collectorSignature");
  //   message.warning("Please fill collector signature");
  // }
  // else if (!formData.collectorCertificationSignature) {
  //   setIsError("collectorCertificationSignature");
  //   message.warning("Please fill collector certification signature");
  // }

  // else {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/addscreen4data`,
        `${process.env.REACT_APP_API_URL}/addscreenforjobrequestform`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        message.success("Form submitted successfully!");
      } else {
        message.error(result.message || "Failed to submit form.");
      }

      // Reset form
      setFormData({
        jobReferenceNo: "",
        dateAndTimeOfCollection: "",
        location: "",
        customer: "",
        nameOfOnsiteContact: "",
        contactOfTelephoneNo: "",
        numberOfDonors: "",
        TypeOfTest: "",
        callOut: "",

        date: "",
        collectionOfficerName: "",
        arrivalTime: "",
        departureTime: "",
        waitingTime: "",
        mileage: "",
        samplesMailed: "",
        breathAlcoholTestsCompleted: "",
        drugTestsCompleted: "",
        nonZeroBreathAlcoholTests: "",
        nonNegativeSamples: "",
        notes: "",
        facilities: {
          privateSecureRoom: false,
          wcFacilities: false,
          handWashing: false,
          securedWindows: false,
          emergencyExits: false,
          translatorRequired: false,
        },
        onsiteSignature: "",
        officerSignature: "",
        author: "",
        rev: "",
        alcoholTestResult: "",
        secondBreathTest: "",
        drugKitType: "",
        nonNegativeSamples: "",
        laboratoryAddress: "",
        sampleDeliveryMethod: "",
      });
      navigate("/jobrequests")
    } catch (error) {
      console.error("Error: ", error);
      message.error("Submission failed due to server error.");
    }

  };
  const handleCustomerChange = async (e) => {
    const selectedValue = e.target.value;
  
    const emailMatch = selectedValue.match(/\(([^)]+)\)/); // extract email from "Ali (ali@gmail.com)"
    const selectedEmail = emailMatch ? emailMatch[1] : null;
  
    setFormData((prev) => ({
      ...prev,
      customer: selectedValue,
      customerEmail: selectedEmail, // Store the email separately if needed
    }));
  
    if (!selectedEmail) return;
  
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/getcustomerbyemail?email=${selectedEmail}`
      );
      const data = await res.json();
      setClientDetails(data)
  
      if (data && Array.isArray(data.hqAddress)) {
        setLocations(data.hqAddress);
      } else {
        setLocations([]); // fallback
      }
    } catch (err) {
      console.error("Failed to fetch customer details:", err);
      setLocations([]);
    }

  };
  
  // };

  return (
    <>
      {/* <Navbar /> */}
      <div
      className="jobrequestformwrapper"
        style={{
          // display: "flex",
          // justifyContent: "center",
          padding: "20px",
          display: "grid",
          placeItems: "center",
          // alignItems: "center",
          // height: "100vh",
          height: "100%",
          background: "#80c209",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="jobrequestform"
          style={{
            // marginTop: "1110px",
            background: "#ffffff",
            padding: "60px",
            paddingTop: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Tooltip title="Back">
      <div
        onClick={() => navigate('/jobrequests')}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          padding: '5px',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
        }}
        className="back-btn"
      >
        <img
        className="backbtnimg"
          src="/backbtn.png"
          alt="Back"
          style={{ width: '20px', marginTop: '25px' }}
        />
      </div>
    </Tooltip>
          <h2
          className="jobrequestformtitle"
            style={{
              textAlign: "center",
              color: "#80c209",
              padding: "10px",
            }}
          >
            REQUEST - COLLECTION OFFICER & TIMESHEET
          </h2>
          <h4 className="heading">JOB INFORMATION</h4>
          <hr />
          <div className="donor">
            <label>
              Job Reference Number
            </label>
            <input
              className="inputstyle"
              type="text"
              name="jobReferenceNo"
              value={formData.jobReferenceNo}
              onChange={handleChange}
              placeholder="S4/"
              readOnly
            //   required
            />
          </div>
          <hr />
          <div className="donor">
            <label>
              Date and time of Collection
            </label>
            <input
              className="inputstyle"
              type="datetime-local"
              name="dateAndTimeOfCollection"
              value={formData.dateAndTimeOfCollection}
              onChange={handleChange}
              placeholder="Enter Donor's Email"
              required
            />
          </div>
          <hr></hr>
        
          <div className="donor">
            <label>Customer</label>
           
            <select
  className="inputstyle"
  name="customer"
  value={formData.customer}
  onChange={handleCustomerChange} // 👈 custom function
  required
>

              <option value="" disabled>Select a customer</option>
              {customers.map((cust, index) => (
                <option key={index} value={`${cust.name} (${cust.email})`}>
                  {cust.name} ({cust.email})
                </option>
              ))}
            </select>
          </div>




          <hr></hr><div className="donor">
            <label style={{ width: "180px" }}>Location </label>
            
        <select
          className="inputstyle"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a location
          </option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc.address}>
              {loc.address} {loc.contactEmail && `(${loc.contactEmail})`}
            </option>
          ))}
        </select>
          </div>
          <hr></hr>
          <div className="donor">
            <label>Name of Onsite Contact</label>
            <input
              className="inputstyle"
              type="text"
              name="nameOfOnsiteContact"
              value={formData.nameOfOnsiteContact}
              onChange={handleChange}
            // required
            />
          </div>
          <hr></hr>
          <div className="donor">
            <label>Contact telephone no.</label>
            <input
              className="inputstyle"
              type="text"
              name="contactOfTelephoneNo"
              value={formData.contactOfTelephoneNo}
              onChange={handleChange}
            // required
            />
          </div>
          <hr></hr>
          <div className="donor">
            <label>Reason for Test</label>
            <select
              className="inputstyle"
              name="reasonForTest"
              value={formData.reasonForTest}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select reason
              </option>
              <option value="For Cause">For Cause</option>
              <option value="Random">Random</option>
              <option value="Pre-Employment">Pre-Employment</option>
              <option value="Follow Up">Follow Up</option>
            </select>
          </div>
          <hr></hr>
          <div className="donor">
            <label>Type Of Test</label>
            <select
              className="inputstyle"
              name="TypeOfTest"
              value={formData.TypeOfTest}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a test type
              </option>
              <option value="Breath Alcohol">Breath Alcohol</option>
              <option value="Urine POCT / BtL">Urine POCT / BtL</option>
              <option value="Oral Fluid POCT / BtL">
                Oral Fluid POCT / BtL
              </option>
              <option value="Non-Neg samples back to lab for confirmation">
                Non-Neg samples back to lab for confirmation
              </option>
            </select>
          </div>
          <hr></hr>
          <div className="donor">
            <label>Number of donors</label>
            <input
              className="inputstyle"
              type="number"
              name="numberOfDonors"
              value={formData.numberOfDonors}
              onChange={handleChange}
            // required
            />
          </div>
          <hr></hr>
          <div className="donor">
            <label>Flight/Vessel</label>
            <input
              className="inputstyle"
              type="text"
              name="flightVessel"
              value={formData.flightVessel}
              onChange={handleChange}

            />
          
          </div>
          <hr></hr>

        

          <h4 className="heading">The Onsite contact must:</h4>
          <ul className="ulitems">
            <li>
              must verify the arrival, departure & waiting times of the
              Collection Officer
            </li>
            <li>Sign the box below.</li>
          </ul>



          <h4 className="heading">CUSTOMER SPECIFIC INFORMATION</h4>

          <table border="1">
            <tbody>
             
              <tr>
                <td colSpan="1">
                  <strong  className="heading">CUSTOMER</strong>
                </td>
                <td>{formData.customer}</td>
              </tr>
              <tr>
                <td>
                  <strong  className="heading">ALCOHOL – Customer Cut Off Level</strong>
                </td>
                <td>{clientDetails?.cutOffLevels}</td>
              </tr>
           
                     <tr>
  <td><strong className="heading">Second Breath Test Required?</strong></td>
  <td>

    {clientDetails?.secondBreathTestRequired}
  </td>
</tr>

<tr>
  <td><strong className="heading">Drugs (Kit Type)</strong></td>
  <td>
  
    {clientDetails?.drugKitType}
  </td>
</tr>

<tr>
  <td><strong className="heading">Non-Negative Samples to Lab?</strong></td>
  <td>
    
    {clientDetails?.nonNegativeSamplesToLab}
  </td>
</tr>

             
              <tr>
                <td colSpan="2">
                  <strong className="heading">ADDITIONAL INFORMATION</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <ul>
                    <li>
                      <strong>Refusal:</strong> Make client aware, fully
                      complete, and sign the 'Refusal' form.
                    </li>
                    <li>
                      <strong>Shy Bladder:</strong> Follow the SOP, complete and
                      sign the 'Shy Bladder' Form.
                    </li>
                  </ul>
                </td>
              </tr>

  
              <tr>
                <td>
                  <strong className="heading">LABORATORY ADDRESS</strong>
                </td>
                <td>
                 {clientDetails?.laboratoryAddress}
                </td>
              </tr>

             
              <tr>
                <td>
                  <strong className="heading">SAMPLES BACK TO LAB</strong>
                </td>
                <td>
             
                  {clientDetails?.sampleDeliveryMethod}
                </td>
              </tr>

              
              <tr>
                <td colSpan="2">
                  <strong className="heading">SUPERVISION/CONTROL</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="heading">The Client’s Onsite Contact Should:</strong>
                </td>
                <td>
                  <ul>
                    <li>Always remain with the Collection Officer.</li>
                    <li>OR, be nearby and available to assist if required.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="heading">The Collection Officer is responsible for:</strong>
                </td>
                <td>
                  <ul>
                    <li>
                      Ensuring all Screen4 processes are followed correctly.
                    </li>
                    <li>Ensuring no intervention from the donor.</li>
                    <li>Ensuring donor is not left alone at any time.</li>
                    <li>
                      Ensuring donor does not eat, drink, smoke, or consume
                      substances during the testing period.
                    </li>
                    <li>
                      Promptly communicating results to Screen4 Operations.
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>



          <h4 className="heading">
            TIMESHEET (Collection Officer to complete, Onsite Contact to sign)
          </h4>

          {/* <form onSubmit={handleSubmit}>
            <table border="1">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Collection Officer's Name</td>
                  <td>
                    <input
                      type="text"
                      name="collectionOfficerName"
                      value={formData.collectionOfficerName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Arrival Time</td>
                  <td>
                    <input
                      type="time"
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Departure Time</td>
                  <td>
                    <input
                      type="time"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Waiting Time</td>
                  <td>
                    <input
                      type="text"
                      name="waitingTime"
                      value={formData.waitingTime}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Date & Time Samples Mailed</td>
                  <td>
                    <input
                      type="datetime-local"
                      name="samplesMailed"
                      value={formData.samplesMailed}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mileage</td>
                  <td>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Number of Breath Alcohol Tests Completed</td>
                  <td>
                    <input
                      type="number"
                      name="breathAlcoholTestsCompleted"
                      value={formData.breathAlcoholTestsCompleted}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Number of Drug Tests Completed</td>
                  <td>
                    <input
                      type="number"
                      name="drugTestsCompleted"
                      value={formData.drugTestsCompleted}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Number of ‘Non Zero’ Breath Alcohol Tests</td>
                  <td>
                    <input
                      type="number"
                      name="nonZeroBreathAlcoholTests"
                      value={formData.nonZeroBreathAlcoholTests}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Number of Non-Negative Samples Sent to Laboratory</td>
                  <td>
                    <input
                      type="number"
                      name="nonNegativeSamples"
                      value={formData.nonNegativeSamples}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <strong>ONSITE CONTACT SIGNATURE</strong>
                  </td>
                </tr>
                <tr>
                  <td>Notes (e.g. travel/donor/facility issues)</td>
                  <td colSpan="3">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <strong>Facilities Check (tick box)</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <label>
                      <input
                        type="checkbox"
                        name="privateSecureRoom"
                        checked={formData.facilities.privateSecureRoom}
                        onChange={handleChange}
                      />
                      Private & Secure Room / Collection Area
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="wcFacilities"
                        checked={formData.facilities.wcFacilities}
                        onChange={handleChange}
                      />
                      Suitable WC Facilities, +1 Door Access/Egress
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="handWashing"
                        checked={formData.facilities.handWashing}
                        onChange={handleChange}
                      />
                      Suitable Hand Washing Facilities
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="securedWindows"
                        checked={formData.facilities.securedWindows}
                        onChange={handleChange}
                      />
                      Secured Windows if at Ground Level
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="emergencyExits"
                        checked={formData.facilities.emergencyExits}
                        onChange={handleChange}
                      />
                      Onsite Emergency Exits / Assembly Points
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="translatorRequired"
                        checked={formData.facilities.translatorRequired}
                        onChange={handleChange}
                      />
                      Translator (if required)
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <strong>COLLECTION OFFICER SIGNATURE</strong>
                  </td>
                </tr>
                <tr>
                  <td>Onsite Contact Signature</td>
                  <td>
                    <div class="">
                
                     <input
                    className="inputstyle"
                    type="text"
                    name="onsiteSignature"
                    value=""//{formData.onsiteSignature}
                    placeholder=""
                    onClick={() => openSignaturePad2("onsiteSignature")}
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.onsiteSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px" }}
         
                  />
                </div>
              
      {isSignaturePadOpen && pad(currentSignatureField)}

                  </td>
                  <td>Collection Officer Signature</td>
                  <td>
                    <div class="">
                 
                    <input
                    className="inputstyle"
                    type="text"
                    name="officerSignature"
                    value=""
                    placeholder=""
                    onClick={() => openSignaturePad2("officerSignature")}
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.officerSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px" }}
         
                  />
                </div>
            {isSignaturePadOpen && pad(currentSignatureField)}

                  </td>
                </tr>
              </tbody>
            </table>
          </form> */}

<form onSubmit={handleSubmit}>
            <table border="1" className="customTable">
              <tbody>
                <tr colSpan="2">
                <td>Date</td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Collection Officer's Name</td>
                  <td>
                    <input
                      type="text"
                      name="collectionOfficerName"
                      value={formData.collectionOfficerName}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Arrival Time</td>
                  <td>
                    <input
                      type="time"
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                <td>Departure Time</td>
                  <td>
                    <input
                      type="time"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Waiting Time</td>
                  <td>
                    <input
                      type="text"
                      name="waitingTime"
                      value={formData.waitingTime}
                      onChange={handleChange}
                    />
                  </td>                  
                </tr>
                <tr>
                <td>Date & Time Samples Mailed</td>
                  <td className="DateTimeSamplesMailed">
                    <input
                      type="datetime-local"
                      name="samplesMailed"
                      value={formData.samplesMailed}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mileage</td>
                  <td>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Number of Breath Alcohol Tests Completed</td>
                  <td>
                    <input
                      type="number"
                      name="breathAlcoholTestsCompleted"
                      value={formData.breathAlcoholTestsCompleted}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                <td>Number of Drug Tests Completed</td>
                  <td>
                    <input
                      type="number"
                      name="drugTestsCompleted"
                      value={formData.drugTestsCompleted}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Number of ‘Non Zero’ Breath Alcohol Tests</td>
                  <td>
                    <input
                      type="number"
                      name="nonZeroBreathAlcoholTests"
                      value={formData.nonZeroBreathAlcoholTests}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                <td>Number of Non-Negative Samples Sent to Laboratory</td>
                  <td>
                    <input
                      type="number"
                      name="nonNegativeSamples"
                      value={formData.nonNegativeSamples}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>ONSITE CONTACT SIGNATURE</strong>
                  </td>
                </tr>
                <tr>
                  <td>Notes (e.g. travel/donor/facility issues)</td>
                  <td colSpan="1">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>Facilities Check (tick box)</strong>
                  </td>
                </tr>
                <tr className="facilitiesCheck">
                  <td colSpan="2">
                    <label>
                      <input
                        type="checkbox"
                        name="privateSecureRoom"
                        checked={formData.facilities.privateSecureRoom}
                        onChange={handleChange}
                      />
                      Private & Secure Room / Collection Area
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="wcFacilities"
                        checked={formData.facilities.wcFacilities}
                        onChange={handleChange}
                      />
                      Suitable WC Facilities, +1 Door Access/Egress
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="handWashing"
                        checked={formData.facilities.handWashing}
                        onChange={handleChange}
                      />
                      Suitable Hand Washing Facilities
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="securedWindows"
                        checked={formData.facilities.securedWindows}
                        onChange={handleChange}
                      />
                      Secured Windows if at Ground Level
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="emergencyExits"
                        checked={formData.facilities.emergencyExits}
                        onChange={handleChange}
                      />
                      Onsite Emergency Exits / Assembly Points
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="translatorRequired"
                        checked={formData.facilities.translatorRequired}
                        onChange={handleChange}
                      />
                      Translator (if required)
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong  className="heading">COLLECTION OFFICER SIGNATURE</strong>
                  </td>
                </tr>
                <tr>
                  <td>Onsite Contact Signature</td>
                  <td>
                    <div class="">
                
                     <input
                    className="inputstyle"
                    type="text"
                    name="onsiteSignature"
                    value=""//{formData.onsiteSignature}
                    placeholder=""
                    onClick={() => openSignaturePad2("onsiteSignature")}
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.onsiteSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px" }}
         
                  />
                </div>
              
      {isSignaturePadOpen && pad(currentSignatureField)}

                  </td>
                 
                </tr>
              <tr> <td>Collection Officer Signature</td>
                  <td>
                    <div class="">
                 
                    <input
                    className="inputstyle"
                    type="text"
                    name="officerSignature"
                    value=""
                    placeholder=""
                    onClick={() => openSignaturePad2("officerSignature")}
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.officerSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px" }}
         
                  />
                </div>
            {isSignaturePadOpen && pad(currentSignatureField)}

                  </td></tr>
              </tbody>
            </table>
</form>
          <div className="note">
            <strong className="heading">** CO to NOTE **:</strong>
            <ul>
              <li>This page & Chain of Custody Form</li>
              <li>Refusal, Shy Bladder Forms etc.</li>
            </ul>
            <p>
              are to be emailed to{" "}
              <a href="mailto:operations@screen4.org">operations@screen4.org</a>{" "}
              ASAP after the collection is completed.
            </p>
          </div>

        {!isloading ? <button
        className="createjob2"
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#19b0e6",
              background: "#80c209",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit
          </button> : <div style={{width:"100%",display: "flex",justifyContent:"center"}}><img src="/empty.gif" style={{width:"130px",}}/></div>}
        </form>
      </div>
    </>
  );
}

export default JobRequestForm;

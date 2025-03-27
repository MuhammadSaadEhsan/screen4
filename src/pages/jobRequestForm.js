import "../css/profile.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { message } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JobRequestForm() {
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

    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/getcustomers`);
          const data = await response.data;
    
          // Use a Set to track unique "name|email" combinations
          const uniqueMap = new Map();
    
          data.forEach((item) => {
            const key = `${item.name}|${item.emails}`;
            if (!uniqueMap.has(key)) {
              uniqueMap.set(key, {
                name: item.name,
                email: item.emails,
              });
            }
          });
    
          setCustomers(Array.from(uniqueMap.values()));
        } catch (error) {
          console.error("Failed to fetch customers", error);
        }
      };
    
      fetchCustomers();
    }, []);
    

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

  const [formData, setFormData] = useState({
    jobReferenceNo: "",
    dateAndTimeOfCollection: "",
    location: "",
    customer: "",
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
  });

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
  // };

  return (
    <>
      {/* <Navbar /> */}
      <div
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
          style={{
            // marginTop: "1110px",
            background: "#ffffff",
            padding: "60px",
            paddingTop: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "900px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#80c209",
              padding: "10px",
            }}
          >
            REQUEST - COLLECTION OFFICER & TIMESHEET
          </h2>
          <h4>JOB INFORMATION</h4>
          <hr />
          <div className="donor">
            {/* Donor's Name */}
            <label>
              Job Reference Number
              {/* <span style={{color: "red"}}>*</span> */}
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
            {/* Donor's Name */}
            <label>
              Date and time of Collection
              {/* <span style={{color: "red"}}>*</span> */}
            </label>
            <input
              className="inputstyle"
              type="datetime-local"
              name="dateAndTimeOfCollection"
              value={formData.dateAndTimeOfCollection}
              onChange={handleChange}
              placeholder="Enter Donor's Email"
              //   required
            />
          </div>
          <hr></hr>
          {/* <div
            className="2nd-row"
            style={{ display: "flex", justifyContent: "space-between" }}
          > */}
          
          {/* <div className="donor">
            <label>Customer</label>
            <input
              className="inputstyle"
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              // required
            />
          </div> */}
<div className="donor">
  <label>Customer</label>
  <select
    className="inputstyle"
    name="customer"
    value={formData.customer}
    onChange={handleChange}
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
            <input
              className="inputstyle"
              type="text"
              name="location"
              value={formData.location}
              placeholder="Enter Location"
              onChange={handleChange}
            />
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
         
          {/* <div className="donor">
            <label>Call-out Type</label>
            <select
              className="inputstyle"
              name="callOutType"
              value={formData.callOutType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select call-out type
              </option>
              <option value="Unplanned">Unplanned</option>
              <option value="Pre-Planned">Pre-Planned</option>
            </select>
          </div>
          <hr></hr> */}
         
          <h4>The Onsite contact must:</h4>
          <ul>
            <li>
              must verify the arrival, departure & waiting times of the
              Collection Officer
            </li>
            <li>Sign the box below.</li>
          </ul>
          


          <h4>CUSTOMER SPECIFIC INFORMATION</h4>

          <table border="1">
            <tbody>
              {/* CUSTOMER SECTION */}
              <tr>
                <td colSpan="2">
                  <strong>CUSTOMER</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ALCOHOL – Customer Cut Off Level</strong>
                </td>
                <td>35ug / 100ml</td>
              </tr>
              <tr>
                <td>
                  <strong>Alcohol Test Result (Numeric Only)</strong>
                </td>
                <td>
                  <input
                    type="number"
                    name="alcoholTestResult"
                    value={formData.alcoholTestResult}
                    onChange={handleChange}
                    placeholder="Enter result"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Second Breath Test Required?</strong>
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="secondBreathTest"
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="secondBreathTest"
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </td>
              </tr>

              {/* DRUGS SECTION */}
              <tr>
                <td>
                  <strong>DRUGS</strong>
                </td>
                <td>
                  <select
                    name="drugKitType"
                    value={formData.drugKitType}
                    onChange={handleChange}
                  >
                    <option value="">Select Kit Type</option>
                    <option value="Urine">
                      Urine (POCT 10 Panel cup / BtL)
                    </option>
                    <option value="Oral Fluid">
                      Oral Fluid (POCT 9NR / Oral-Eze BtL)
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Non-Negative Samples Sent to Lab?</strong>
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="nonNegativeSamples"
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="nonNegativeSamples"
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </td>
              </tr>

              {/* ADDITIONAL INFORMATION (STATIC TEXT) */}
              <tr>
                <td colSpan="2">
                  <strong>ADDITIONAL INFORMATION</strong>
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

              {/* LABORATORY SECTION */}
              <tr>
                <td>
                  <strong>LABORATORY ADDRESS</strong>
                </td>
                <td>
                  <input
                    type="text"
                    name="laboratoryAddress"
                    value={formData.laboratoryAddress}
                    onChange={handleChange}
                    placeholder="Enter lab address"
                  />
                </td>
              </tr>

              {/* SAMPLES DELIVERY */}
              <tr>
                <td>
                  <strong>SAMPLES BACK TO LAB</strong>
                </td>
                <td>
                  <input
                    type="text"
                    name="sampleDeliveryMethod"
                    value={formData.sampleDeliveryMethod}
                    onChange={handleChange}
                    placeholder="Enter method & details of delivery"
                  />
                </td>
              </tr>

              {/* SUPERVISION/CONTROL SECTION (STATIC TEXT) */}
              <tr>
                <td colSpan="2">
                  <strong>SUPERVISION/CONTROL</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>The Client’s Onsite Contact Should:</strong>
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
                  <strong>The Collection Officer is responsible for:</strong>
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

         

          <h4>
            TIMESHEET (Collection Officer to complete, Onsite Contact to sign)
          </h4>

          <form onSubmit={handleSubmit}>
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
                    <input
                      type="text"
                      name="onsiteSignature"
                      value={formData.onsiteSignature}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Collection Officer Signature</td>
                  <td>
                    <input
                      type="text"
                      name="officerSignature"
                      value={formData.officerSignature}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className="note">
            <strong>** CO to NOTE **:</strong>
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

          <button
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
          </button>
        </form>
      </div>
    </>
  );
}

export default JobRequestForm;

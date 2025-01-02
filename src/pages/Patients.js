import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidemanu from "../components/sidemanu";

const Patients = () => {
  const [patients, setPatients] = useState([]); // State to store patient data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getallpatients`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatients(data.data || []); // Update the state with the fetched data
      } catch (error) {
        setError(error.message); // Set the error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurred
      }
    };

    fetchPatients();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Inline CSS styles for the table
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom:"30px"
  };

  const thTdStyle = {
    padding: '10px',
    border: '1px solid #19b0e6',
    // textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f4f4f4',
  };

  const trEvenStyle = {
    // backgroundColor: '#f9f9f9',
  };

  return (
    <div>
      <Navbar />
      <div className="deshboardmain">
        {/* <Sidemanu /> */}
        {/* <div className="Practitionermainbody">
          <div className="header">
            <h1 className="pppheading" style={{marginBottom:"20px"}}>Patients</h1>
          </div>
          
          {loading ? (
            <p>Loading patients...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : (
            <div className="imp"><table style={tableStyle} className="tablep">
            <thead className="tablephead">
              <tr>
                <th style={{ ...thTdStyle }}>S.No</th>
                <th style={thTdStyle}>Patient Name</th>
                <th style={thTdStyle}>Sample Date</th>
                <th style={thTdStyle}>Kit Code</th>
                <th style={thTdStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} style={index % 2 === 0 ? trEvenStyle : {}}>
                  <td style={thTdStyle}>{index + 1}</td> 
                  <td style={thTdStyle}>{patient.name}</td>
                  <td style={thTdStyle}>{patient.sampleDate+"  \n"}</td> 
                  <td style={thTdStyle}>{patient.kitCode+"\n"}</td> 
                  <td style={thTdStyle}>{patient.email}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Patients;

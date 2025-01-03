// import React, { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
// import Sidemanu from "../components/sidemanu";

// const Patients = () => {
//   const [client, setClient] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchScreen4Data = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:1337/getscreen4data`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch client data");
//         }
//         const data = await response.json();
//         setClient(data.data || []); // Update the state with the fetched data
//       } catch (error) {
//         setError(error.message); // Set the error state if something goes wrong
//       } finally {
//         setLoading(false); // Set loading to false once the data is fetched or error occurred
//       }
//     };

//     fetchScreen4Data();
//   }, []); // Empty dependency array ensures this runs once when the component mounts
  
//   return (
//     <div>
//       <Navbar />
//       <div className="deshboardmain">
//         {/* <Sidemanu />  */}
//         <div className="Practitionermainbody" style={{paddingTop:"20px",paddingLeft:"20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
//           <div class="key" style={{ fontSize:"20px",marginBottom: "10px" }}>
//             All Clients
//           </div>
//           <div>
//   {client.map((client, index) => (
//     <div
//       key={index}
//       style={{
//         padding: "20px",
//         marginBottom: "20px",
//         width: "120%",
//         height: "130px",
//         borderRadius: "13px",
//         background: "#f3ffdf",
//         border: "1px solid #80c20a",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "flex-start",
//         }}
//       >
//         <div>
//           <div className="key">
//             Donor's Name: <span className="mybold">{client.donorName}</span>
//           </div>
//           <div className="key">
//             Date of Birth: <span className="mybold">{client.dob}</span>
//           </div>
//           <div className="key">
//             Company Name: <span className="mybold">{client.companyName}</span>
//           </div>
//           <div className="key">
//             Location: <span className="mybold">{client.location}</span>
//           </div>
//           <div className="key">
//             ID Source: <span className="mybold">{client.idsource}</span>
//           </div>
//         </div>
//         <div>
//           <div className="key">
//             Bar Code Number: <span className="mybold">{client.barcodeno}</span>
//           </div>
//           <div className="key">
//             Ref Number: <span className="mybold">{client.refno}</span>
//           </div>
//           <div className="key">
//             Date of Test: <span className="mybold">{client.dateoftest}</span>
//           </div>
//           <div className="key">
//             Reason For Test: <span className="mybold">{client.reasonForTest}</span>
//           </div>
//           <div className="key">
//             Flight/Vessel: <span className="mybold">{client.flight}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patients;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../components/navbar";
import Sidemanu from "../components/sidemanu";

const Patients = () => {
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchScreen4Data = async () => {
      try {
        const response = await fetch(`http://localhost:1337/getscreen4data`);
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        setClient(data.data || []); // Update the state with the fetched data
      } catch (error) {
        setError(error.message); // Set the error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurred
      }
    };

    fetchScreen4Data();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleClientClick = (id) => {
    navigate(`/deshboard/${id}`); // Navigate to the desired route
  };

  return (
    <div>
      <Navbar />
      <div className="deshboardmain">
        {/* <Sidemanu /> */}
        <div
          className="Practitionermainbody"
          style={{
            paddingTop: "20px",
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="key" style={{ fontSize: "20px", marginBottom: "10px" }}>
            All Clients
          </div>
          <div>
            {client.map((client, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  marginBottom: "20px",
                  width: "120%",
                  height: "130px",
                  borderRadius: "13px",
                  background: "#f3ffdf",
                  border: "1px solid #80c20a",
                  cursor: "pointer", // Indicate clickable area
                }}
                onClick={() => handleClientClick(client._id)} // Handle click
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div className="key">
                      Donor's Name: <span className="mybold">{client.donorName}</span>
                    </div>
                    <div className="key">
                      Date of Birth: <span className="mybold">{client.dob}</span>
                    </div>
                    <div className="key">
                      Company Name: <span className="mybold">{client.companyName}</span>
                    </div>
                    <div className="key">
                      Location: <span className="mybold">{client.location}</span>
                    </div>
                    <div className="key">
                      ID Source: <span className="mybold">{client.idsource}</span>
                    </div>
                  </div>
                  <div>
                    <div className="key">
                      Bar Code Number: <span className="mybold">{client.barcodeno}</span>
                    </div>
                    <div className="key">
                      Ref Number: <span className="mybold">{client.refno}</span>
                    </div>
                    <div className="key">
                      Date of Test: <span className="mybold">{client.dateoftest}</span>
                    </div>
                    <div className="key">
                      Reason For Test:{" "}
                      <span className="mybold">{client.reasonForTest}</span>
                    </div>
                    <div className="key">
                      Flight/Vessel: <span className="mybold">{client.flight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;

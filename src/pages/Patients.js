// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import Navbar from "../components/navbar";
// import Sidemanu from "../components/sidemanu";
// import Cookies from 'js-cookie';

// const Patients = () => {
//   const [client, setClient] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Initialize navigate function

//   useEffect(() => {
//     const fetchScreen4Data = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/getscreen4data`);
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

//   const handleClientClick = (id) => {
//     navigate(`/deshboard/${id}`); // Navigate to the desired route
//   };


//   useEffect(() => {
//     const token = Cookies.get("Token")
//     // Check token validity
//     if (
//       !token ||
//       (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" &&
//         token !== "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg")
//     ) {
//       navigate("/"); // Redirect to Index.js page
//       return;
//     }})

//   return (
//     <div>
//       <Navbar />
//       <div className="deshboardmain" style={{background:"#80c209"}}>
//         {/* <Sidemanu /> */}
//         <div
//           className="Practitionermainbody"
//           style={{
//             paddingTop: "20px",
//             paddingLeft: "20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             paddingBottom:"100px"
//           }}
//         >
//           <div className="key" style={{fontSize: "20px", marginBottom: "10px" }}>
//             All Clients
//           </div>
//           <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
//             {client.map((client, index) => (
//               <div
//                 key={index}
//                 style={{
//                   padding: "20px",
//                   marginBottom: "20px",
//                   width: "60%",
//                   height: "130px",
//                   borderRadius: "13px",
//                   background: "#f3ffdf",
//                   border: "1px solid #80c20a",
//                   cursor: "pointer", // Indicate clickable area
//                 }}
//                 onClick={() => handleClientClick(client._id)} // Handle click
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-around",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <div>
//                     <div className="key">
//                       Donor's Name: <span className="mybold">{client.donorName}</span>
//                     </div>
//                     <div className="key">
//                       Date of Birth: <span className="mybold">{client.dob}</span>
//                     </div>
//                     <div className="key">
//                       Company Name: <span className="mybold">{client.companyName}</span>
//                     </div>
//                     <div className="key">
//                       Location: <span className="mybold">{client.location}</span>
//                     </div>
//                     <div className="key">
//                       ID Source: <span className="mybold">{client.idsource}</span>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="key">
//                       Bar Code Number: <span className="mybold">{client.barcodeno}</span>
//                     </div>
//                     <div className="key">
//                       Ref Number: <span className="mybold">{client.refno}</span>
//                     </div>
//                     <div className="key">
//                       Date of Test: <span className="mybold">{client.dateoftest}</span>
//                     </div>
//                     <div className="key">
//                       Reason For Test:{" "}
//                       <span className="mybold">{client.reasonForTest}</span>
//                     </div>
//                     <div className="key">
//                       Flight/Vessel: <span className="mybold">{client.flight}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
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
import Cookies from 'js-cookie';

const Patients = () => {
  const [client, setClient] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]); // State for filtered clients
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchScreen4Data = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getscreen4data`);
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        setClient(data.data || []); // Update the state with the fetched data
        setFilteredClients(data.data || []); // Initialize filtered list with all data
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

  useEffect(() => {
    const token = Cookies.get("Token")
    // Check token validity
    if (
      !token ||
      (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" &&
        token !== "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg")
    ) {
      navigate("/"); // Redirect to Index.js page
      return;
    }
  }, [navigate]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase(); // Convert search query to lowercase
    setSearchQuery(query);

    // Filter clients based on donorName, companyName, or any other field
    const filtered = client.filter(
      (c) =>
        c.donorName.toLowerCase().includes(query) ||
        c.companyName.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query)
    );

    setFilteredClients(filtered); // Update filtered clients
  };

  return (
    <div>
      <Navbar />
      <div className="deshboardmain" style={{ background: "#80c209" }}>
        {/* <Sidemanu /> */}
        <div
          className="Practitionermainbody"
          style={{
            paddingTop: "20px",
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "100px",
          }}
        >
          <div className="key" style={{ fontSize: "20px", marginBottom: "10px" }}>
            All Clients
          </div>

          {/* Search Input */}
          {/* <input
            type="text"
            placeholder="🔍 | Search by name, company, or location..."
            value={searchQuery}
            
            onChange={handleSearchChange}
            style={{
              marginBottom: "20px",
              padding: "10px",
              paddingLeft:"20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "61.5%",
              borderRadius:"20px",
              fontSize: "16px",
            }}
          /> */}
          <div style={{ position: "relative", width: "61.5%", marginBottom: "20px" }}>
  <span
    style={{
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      fontSize: "16px",
      color: "#ccc",
      pointerEvents: "none", // Prevent interaction with the icon
    }}
  >
    🔍
  </span>
  <input
    type="text"
    placeholder="Search by name, company, or location..."
    value={searchQuery}
    onChange={handleSearchChange}
    style={{
      width: "100%",
      padding: "10px",
      paddingLeft: "35px", // Add padding to accommodate the icon
      borderRadius: "20px",
      border: "1px solid #ccc",
      fontSize: "16px",
    }}
  />
</div>


          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {filteredClients.map((client, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  marginBottom: "20px",
                  width: "60%",
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

            {/* Show message if no results found */}
            {filteredClients.length === 0 && (
              <div style={{ marginTop: "20px", fontSize: "18px", color: " #80c20a" }}>
                { searchQuery==='' ? "Loading Clients 🔃":"No clients found matching your search."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;

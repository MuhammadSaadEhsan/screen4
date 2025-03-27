import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";


const AllClients = () => {

  const [selectedTab, setSelectedTab] = useState("Pending");
  const navigate = useNavigate();
  const token = Cookies.get("Token")

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterClients(selectedTab, query);
  };

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getclients`);
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          console.error("Unexpected response format:", data);
          setClients([]);
          return;
        }
        
        setClients(data);
        setFilteredClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    filterClients(searchQuery);
  }, [searchQuery, clients]);

  const filterClients = (query) => {
    if (!query) {
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.contact.includes(query) ||
      c.hqAddress.toLowerCase().includes(query.toLowerCase()) ||
      c.emails.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleClientClick = async (id) => {
    // if(selectedTab==='Pending'){
      navigate(`/addclient/${id}`);
    // }

}

  return (
    <div>
      <Navbar />
      <div className="deshboardmain" style={{ background: "#80c209" }}>
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
<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "relative" }}>
  {/* Centered Text */}
  <div
    className="key"
    style={{
      fontSize: "24px",
      marginBottom: "10px",
      marginTop: "10px",
      textAlign: "center",
      position: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ?  "absolute" : null,
      left: "50%",
      transform: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ?  "translateX(-50%)":null, // Ensures perfect centering
    }}
  >
    All Clients
  </div>

  {/* Right-Aligned Button */}
 {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? <Link to="/addclient" style={{ textDecoration: "none", marginLeft: "auto" }}>
    <div
      className="key"
      style={{
        fontSize: "14px",
        marginBottom: "10px",
        marginTop: "10px",
        background: "#80c209",
        color: "white",
        padding: "10px 18px",
        borderRadius: "10px",
        fontWeight: "bold",
        textDecoration: "none",
      }}
    >
      Add a Client
    </div>
  </Link> : null}
</div>


          {/* Search */}
          <div
            style={{
              position: "relative",
              width: "61.5%",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#ccc",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by customer, Job reference number, or location..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "10px",
                paddingLeft: "35px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Client List */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loading ? (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#80c20a",
                }}
              >
                Loading clients...
              </div>
            ) : error ? (
              <div
                style={{ marginTop: "20px", fontSize: "18px", color: "red" }}
              >
                {error}
              </div>
            ) :  filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                  <div
                  key={index}
                  style={{
                      padding: "20px",
                    marginBottom: "20px",
                    width: "60%",
                    height: "72px",
                    borderRadius: "13px",
                    background: "#f3ffdf",
                    border: "1px solid #80c20a",
                    cursor: "pointer",
                }}
                onClick={() => handleClientClick(client._id)}
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
                        Customer :{" "}
                        <span className="mybold">{client.name}</span>
                      </div>
                      <div className="key">
                        Email :{" "}
                        <span className="mybold">{client.emails}</span>
                      </div>
                      {/* <div className="key">
                        Address :{" "}
                        <span className="mybold">{client.hqAddress}</span>
                      </div> */}
                      {/* <div className="key">
  Address:
  <span className="mybold">
    {client.hqAddress.map((addr, idx) => (
      <div key={idx}>
        {addr.address}
        {addr.contactName && ` | Contact: ${addr.contactName}`}
        {addr.contactEmail && ` | Email: ${addr.contactEmail}`}
      </div>
    ))}
  </span>
</div> */}

             
                  </div>
                 
                  
                    
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#80c20a",
                }}
              >
                No clients found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClients;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";

const JobRequests = () => {
  const [client, setClient] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScreen4Data = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/getjobrequests`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        setClient(data.data || []);
        setFilteredClients(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScreen4Data();
  }, []);

  useEffect(() => {
    const token = Cookies.get("Token");
    if (
      !token ||
      (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" &&
        token !== "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg")
    ) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const filterClients = (tab, query) => {
    let filtered = client;

    // if (tab === "Pending") {
    //   filtered = client.filter((c) => !c.isUpdated);
    // } else if (tab === "Completed") {
    //   filtered = client.filter((c) => c.isUpdated);
    // }

    // if (query) {
      filtered = filtered.filter(
        (c) =>
          c.customer?.toLowerCase().includes(query) ||
          c.jobReferenceNo?.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query)
      );
    // }

    setFilteredClients(filtered);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterClients(selectedTab, query);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    filterClients(tab, searchQuery);
  };

  const handleClientClick = (id) => {
    navigate(`/jobrequest/${id}`);
  };

  const handleSendEmail = async (client, event) => {
    event.stopPropagation(); // Stop propagation to prevent card click

    if (client.isEmailed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sendscreenemailtodonor/${client._id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFilteredClients((prevClients) =>
        prevClients.map((c) =>
          c._id === client._id ? { ...c, isEmailed: true } : c
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

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
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)", // Ensures perfect centering
    }}
  >
    Job Requests Forms
  </div>

  {/* Right-Aligned Button */}
  <Link to="/screen4testform2" style={{ textDecoration: "none", marginLeft: "auto" }}>
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
      Create a Job Request
    </div>
  </Link>
</div>


          {/* Tabs */}
          {/* <div style={{ marginBottom: "25px", marginTop: "5px", display: "flex", gap: "10px" }}>
            {["All", "Pending", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: selectedTab === tab ? "none" : "1px solid #7fc109",
                  backgroundColor: selectedTab === tab ? "#7fc109" : "#f3ffdf",
                  color: selectedTab === tab ? "#fff" : "#000",
                  cursor: "pointer",
                  width: "100px"
                }}
              >
                {tab}
              </button>
            ))}
          </div> */}

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
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
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
                        Job Reference Number :{" "}
                        <span className="mybold">{client.jobReferenceNo}</span>
                      </div>
                      <div className="key">
                        Customer :{" "}
                        <span className="mybold">{client.customer}</span>
                      </div>
                      <div className="key">
                        Location :{" "}
                        <span className="mybold">{client.location}</span>
                      </div>
                      {/* <div className="key">Date And Time Of Collection : <span className="mybold">{client.dateAndTimeOfCollection}</span></div> */}
                      <div className="key">
                        Date And Time Of Collection :{" "}
                        <span className="mybold">
                          {new Date(
                            client.dateAndTimeOfCollection
                          ).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>

                      {/* <div className="key">Reason for Test: <span className="mybold">{client.reasonforTest}</span></div> */}
                    </div>
                    {/* <div>
                      <div className="key">Bar Code Number: <span className="mybold">{client.barcodeno}</span></div>
                      <div className="key">Ref Number: <span className="mybold">{client.refno}</span></div>
                      <div className="key">Date of Test: <span className="mybold">{client.dateoftest}</span></div>
                      <div className="key">Reason For Test: <span className="mybold">{client.reasonForTest}</span></div>
                      <div className="key">Flight/Vessel: <span className="mybold">{client.flight}</span></div>
                    </div> */}
                    {selectedTab === "Completed" && (
                      <button
                        onClick={(event) => handleSendEmail(client, event)}
                        disabled={client.isEmailed}
                        style={{
                          marginTop: "0px",
                          padding: "10px 30px",
                          borderRadius: "20px",
                          border: client.isEmailed
                            ? "1px solid #80c20a"
                            : "none",
                          backgroundColor: client.isEmailed
                            ? "#f3ffdf"
                            : "#80c20a",
                          color: client.isEmailed ? "#80c20a" : "white",
                          cursor: client.isEmailed ? "not-allowed" : "pointer",
                        }}
                      >
                        {client.isEmailed
                          ? "Email Sent"
                          : "Send Email To Donor"}
                      </button>
                    )}
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

export default JobRequests;

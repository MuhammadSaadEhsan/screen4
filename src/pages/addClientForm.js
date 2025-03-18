import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Input, Button, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Password from "antd/es/input/Password";

export default function AddClientForm() {
  const { id } = useParams();
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    contact: "",
    hqAddress: "",
    operationalBases: [{ address: "", contact: "" }],
    emails: "",
    password:"",
    testMethods: "",
    cutOffLevels: "",
    costings: "",
    jobPack: {
      jobRequest: {
        location: "",
        testType: "",
        cutoffs: "",
        actions: "",
        shipmentDetails: "",
        labDetails: "",
      },
      donorInfoDocs: "",
    },
  });

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
        setError(err.message);
      } finally {
        console.log("final");
        console.log(client);
        setLoading(false);
      }
    };

    if (id) fetchClients();
  }, [id]);

  useEffect(() => {
    console.log("Updated client state:", client);
  }, [client]); // This will log the updated client state after React applies the update

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleOperationalBaseChange = (index, field, value) => {
    const updatedBases = [...client.operationalBases];
    updatedBases[index][field] = value;
    setClient({ ...client, operationalBases: updatedBases });
  };

  const addOperationalBase = () => {
    setClient({
      ...client,
      operationalBases: [
        ...client.operationalBases,
        { address: "", contact: "" },
      ],
    });
  };

  const handleSubmit = async (values) => {
    try {
      let response;

      if (client?._id) {
        // Use PUT for updates
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/updateclient/${client._id}`,
          {
            method: "PUT", // Changed to PUT
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
      } else {
        // Use POST for adding a new client
        response = await fetch(`${process.env.REACT_APP_API_URL}/addclient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data.message);
        setClient(data.client || {}); // Update the state with new data if available

        // Show success message
        alert(
          client?._id
            ? "Client updated successfully!"
            : "Client added successfully!"
        );

        // Navigate after successful update/add
        navigate("/clients");
      } else {
        console.error("Error:", data.message);
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed. Please try again.");
    }
  };

  const [form] = Form.useForm(); // Hook for controlled form management

  // Update form fields when `client` state changes
  useEffect(() => {
    form.setFieldsValue(client); // This updates all fields when client data is fetched
  }, [client]);
  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        placeItems: "center",

        height: "100%",
        background: "#80c209",
      }}
    >
      <Card title="Add Client" style={{ width: "1300px", margin: "auto" }}>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={client} // This is just for the first render
        >
          <Form.Item
            label="Client Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="HQ Address"
            name="hqAddress"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Email Addresses"
            name="emails"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            // rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Test Methods"
            name="testMethods"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Cut Off Levels"
            name="cutOffLevels"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Costings"
            name="costings"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <h3>Job Pack</h3>
          <Form.Item
            label="Location"
            name={["jobPack", "jobRequest", "location"]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Test Type"
            name={["jobPack", "jobRequest", "testType"]}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Actions Following Results"
            name={["jobPack", "jobRequest", "actions"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#80c209",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {client?._id ? "Update" : "Add"}
            </button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

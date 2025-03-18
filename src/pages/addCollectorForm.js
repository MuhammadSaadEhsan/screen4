import React, { useState } from 'react';
import { Card, Input, Button, Form, message } from 'antd';
import { useNavigate,useParams} from 'react-router-dom';
import { useEffect } from 'react';

const AddCollectorForm = () => {
      const { id } = useParams();
    const navigate = useNavigate()
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/getcollector/${id}`
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

        setFormData((prev) => ({
          ...prev,
          ...filteredData, // Merge fetched data without password
          password: "", // Ensure password remains blank
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        console.log("final");
        console.log(formData);
        setLoading(false);
      }
    };

    if (id) fetchClients();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (values) => {
    try {
        let response;
  
        if (formData?._id) {
          // Use PUT for updates
          response = await fetch(
            `${process.env.REACT_APP_API_URL}/updatecollector/${formData._id}`,
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
          response = await fetch(`${process.env.REACT_APP_API_URL}/addcollector`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
        }
  
      const result = await response.json();
      console.log("API Response:", result); // ✅ Log API response
  
      if (response.ok) {
        message.success('Collector added successfully!');
        setFormData({ email: '', password: '' });
      } else {
        message.error(result.message || 'Failed to add collector');
      }

      navigate("/collectors")
    } catch (error) {
      console.error("Error submitting form:", error); // ✅ Log error
      message.error('An error occurred while adding collector');
    }
  };
  const [form] = Form.useForm(); 
  useEffect(() => {
    form.setFieldsValue(formData); // This updates all fields when client data is fetched
  }, [formData]);


    useEffect(() => {
      console.log("Updated client state:", formData);
    }, [formData]); // This will log the updated client state after React applies the update
  
  return (
    <div
    style={{
      padding: "20px",
      display: "grid",
      placeItems: "center",

      height: "100vh",
      background: "#80c209",
    }}
  >
    <Card title="Add Collector" style={{ width: "600px", margin: 'auto', marginTop: 50 }}>
      <Form layout="vertical" form={form}  onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ type: 'text' }]}> 
          <Input name="name" value={formData.name} onChange={handleChange} />
        </Form.Item>
        
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}> 
          <Input name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>
        
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }]}> 
          <Input.Password name="password" value={formData.password} onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          {/* <Button type="primary" htmlType="submit">Add Collector</Button> */}
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
              {formData?._id ? "Update Collector" : "Add Collector"}
            </button>
        </Form.Item>
      </Form>
    </Card></div>
  );
};

export default AddCollectorForm;
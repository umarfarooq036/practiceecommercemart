
import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { auth } from "../../hook/auth";
import ImageUploader from "./ImageUploader";
import InputField from "../InputField";

const ProductForm = () => {
  const user = auth();
  console.log("user\; " , user);
  const userId = user?.id;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    images: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = (urls) => {
    console.log("Image URLs received:", urls);
    setFormData((prevData) => ({
      ...prevData,
      images: urls, // Set URLs directly in formData
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Form data:", formData);

    setError("");
    setLoading(true);

    try {
      // Ensure images URLs are present
      if (formData.images.length === 0) {
        throw new Error("No images selected");
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        price: formData.price,
        quantity: formData.quantity,
        images: formData.images, // URLs here
        userId: userId,
      };

      console.log("Sending product data to backend..." , productData);
      const response = await axios.post(
        "http://localhost:3002/api/products",
        productData
      );
      console.log("Response:", response.data);

      // Clear form fields or reset state after successful submission
      setFormData({
        name: "",
        price: "",
        quantity: "",
        images: [],
      });

      alert("Product added successfully");
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          width: "200px",
        }}
      >
        Add Product
      </Button>

      <Modal show={showModal} size="xl" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Price"
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
            />
            <InputField
              label="Quantity"
              type="number"
              min="0"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <ImageUploader onImagesChange={handleImagesChange} />
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <Button
              className="mt-5"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForm;

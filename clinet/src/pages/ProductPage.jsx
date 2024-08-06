import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../components/Navbar"; // Ensure path is correct
import ProductForm from "../components/product-upload/ProductForm";
import ProductList from "../components/product-listing/ProductList"; // Ensure path is correct

const ProductPage = () => (
  <Container  className='d-flex  flex-column gap-3'>
  
    <AppNavbar />
    
      <ProductForm />
      <ProductList />
   
    </Container>
);

export default ProductPage;

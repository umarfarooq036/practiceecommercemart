import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/products');
        // Assuming response.data.products is the array of products
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError('Data format error');
        }
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product._id}>
            <Card className="shadow-sm border-light rounded">
              {product.images && product.images.length > 0 && (
                // <Card.Img variant="top" src={product.images[0]} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Img
  variant="top"
  src={product.images[0]}
  style={{ minHeight: '250px', maxHeight: '400px', width: '100%' }}
/>

              )}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Quantity:</strong> {product.quantity}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { Form, ProgressBar, Alert, Row, Col, Card } from 'react-bootstrap';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

const ImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const maxImages = 6;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }
    setError('');
    const newFiles = files.slice(0, maxImages - images.length);
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);
    handleUpload(newFiles);
  };

  const handleUpload = (files) => {
    setUploading(true);
    setUploadProgress(0);

    const uploadTasks = files.map((image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });

    Promise.all(uploadTasks)
      .then((urls) => {
        onImagesChange(urls); // Pass URLs directly to parent
        setImageUrls((prevUrls) => [...prevUrls, ...urls].slice(0, maxImages));
        setImages([]);
      })
      .catch(() => {
        setError('Error uploading images');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Form.Group controlId="formImages">
      <Form.Label>Upload Images</Form.Label>
      <Form.Control type="file" multiple onChange={handleImageChange} />
      {error && <Alert variant="danger">{error}</Alert>}
      {uploading && (
        <div className="my-3">
          <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />
        </div>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {imageUrls.length > 0 &&
          imageUrls.map((url, index) => (
            <Col key={index}>
              <Card className="m-5">
                <Card.Img variant="top" src={url} className="img-fluid" style={{ width: "250px", height: "250px" }} />
              </Card>
            </Col>
          ))}
      </Row>
    </Form.Group>
  );
};

export default ImageUploader;

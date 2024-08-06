import React from 'react';
import { Form } from 'react-bootstrap';
const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Control className='mt-2' type={type} name={name} placeholder={label} value={value} onChange={onChange} min={0} required/>
    </Form.Group>
  );
};

export default InputField;

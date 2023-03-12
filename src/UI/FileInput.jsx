import React from 'react';
import customErrors from '../customErrors/customErrors';
import Form from 'react-bootstrap/Form';


const FileInput = ({ name, type, setError, handleParse }) => {
    const handleFileChange = async (e) => {
        try {
            // validate date with some library
            const inputFile = e.target.files[0];
            await handleParse(inputFile);
        } catch (error) {
            setError(customErrors.userMessage);
        }
    };

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label> Enter CSV File: </Form.Label>
            <Form.Control
                onChange={handleFileChange}
                name={name}
                type={type} />
        </Form.Group>
    );
}

export default FileInput
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import styled from 'styled-components';
// import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f3f4f6;
  padding: 1rem;
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 28rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: black;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: #6b7280;

  &::file-selector-button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: #eff6ff;
    color: #2563eb;
    cursor: pointer;
  }

  &:hover::file-selector-button {
    background-color: #dbeafe;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const Alert = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: ${props => props.$success ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$success ? '#047857' : '#b91c1c'};
`;

export default function FileUpload() {
  // const [file1, setFile1] = useState(null);
  // const [file2, setFile2] = useState(null);
  // const [message, setMessage] = useState('');
  // const [isSuccess, setIsSuccess] = useState(false);

  // const handleFileChange1 = (e) => {
  //   setFile1(e.target.files[0]);
  // };

  // const handleFileChange2 = (e) => {
  //   setFile2(e.target.files[0]);
  // };

  // const navigate = useNavigate();

  const handleClick = () => {
    window.location.href = 'http://127.0.0.1:5000';
  };

  // const handleFileUpload = async () => {
  //   if (!file1 || !file2) {
  //     setMessage('Please select both files.');
  //     setIsSuccess(false);
  //     return;
  //   }

    // const formData = new FormData();
    // formData.append('recommendation', file1);
    // formData.append('resume', file2);

    // try {
    //   const response = await fetch('http://localhost:3000/analyze', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     setMessage('Files processed successfully!');
    //     setIsSuccess(true);
    //     console.log('Analysis results:', result);
    //   } else {
    //     setMessage('Processing failed. Please try again.');
    //     setIsSuccess(false);
    //   }
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   setMessage('An error occurred during processing.');
    //   setIsSuccess(false);
    // }
  // };

  return (
    <Container>
      <Card>
        <Title>Upload Files</Title>
        
        {/* <InputGroup>
          <Label>ZIP File:</Label>
          <FileInput type="file" onChange={handleFileChange1} accept=".zip" />
        </InputGroup>
        
        <InputGroup>
          <Label>PDF File:</Label>
          <FileInput type="file" onChange={handleFileChange2} accept=".pdf" />
        </InputGroup> */}

        <Button onClick={handleClick}>
          <Upload size={16} style={{ marginRight: '0.5rem' }} />
          Upload Files
        </Button>

        {/* {message && (
          <Alert success={isSuccess.toString()}>{message}</Alert>
        )} */}
      </Card>
    </Container>
  );
}

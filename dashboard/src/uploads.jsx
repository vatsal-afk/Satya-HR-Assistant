import React, { useState } from 'react';

function Upload() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file1 || !file2) {
      setMessage('Please select both files.');
      return;
    }

    // You can handle the actual file upload logic here
    // For now, we'll just simulate an upload.
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    // Simulate API call
    setMessage('Files uploaded successfully!');
    console.log('Files:', file1, file2);

    // Example for actual API call:
    // fetch('/upload-endpoint', { method: 'POST', body: formData })
    //   .then(response => response.json())
    //   .then(data => console.log('Upload success:', data))
    //   .catch(error => console.error('Upload error:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload Two Files</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>
          File 1:
          <input type="file" onChange={handleFileChange1} />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          File 2:
          <input type="file" onChange={handleFileChange2} />
        </label>
      </div>

      <button onClick={handleFileUpload} style={{ padding: '10px', cursor: 'pointer' }}>
        Upload Files
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;

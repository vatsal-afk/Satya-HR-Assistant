import React, { useState } from 'react';

const DownloadPDFButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    setShowErrorMessage(false);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: window.location.href }),
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'webpage.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setShowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Download'}
      </button>
      {showErrorMessage && (
        <p style={{ color: 'red' }}>An error occurred while generating the PDF. Please try again later.</p>
      )}
    </div>
  );
};

export default DownloadPDFButton;
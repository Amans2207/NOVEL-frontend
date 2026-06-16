import React from 'react';
import SEO from './SEO';

const ComingSoon = ({ title }) => {
  return (
    <>
      <SEO title={title} description={`Learn more about ${title} at Novel Enterprises.`} />
      <div style={{ padding: '80px 40px', minHeight: '60vh', textAlign: 'center', backgroundColor: '#f5f7fa' }}>
      <h1 style={{ color: '#041f4a', fontSize: '2.5rem', marginBottom: '20px' }}>{title}</h1>
      <p style={{ color: '#666' }}>Content for this page is coming soon.</p>
    </div>
    </>
  );
};

export default ComingSoon;

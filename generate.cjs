const fs = require('fs');
const pages = ['Services', 'AmcCmc', 'Industries', 'Spares', 'Racking', 'Gallery', 'Careers'];
pages.forEach(page => {
  const content = `import React from 'react';

const ${page} = () => {
  return (
    <div style={{ padding: '80px 40px', minHeight: '60vh', textAlign: 'center', backgroundColor: '#f5f7fa' }}>
      <h1 style={{ color: '#041f4a', fontSize: '2.5rem', marginBottom: '20px' }}>${page.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <p style={{ color: '#666' }}>Content for this page is coming soon.</p>
    </div>
  );
};

export default ${page};`;
  fs.writeFileSync(`src/pages/${page}.jsx`, content);
});

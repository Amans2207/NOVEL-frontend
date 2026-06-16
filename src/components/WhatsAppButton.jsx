import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappNumber = "918010562953";
  const message = encodeURIComponent("Hello Novel Enterprises, I would like to inquire about your material handling equipment and services.");
  
  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${message}`} 
      target="_blank" 
      rel="noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={34} />
    </a>
  );
};

export default WhatsAppButton;

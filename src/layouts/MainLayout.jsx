import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmartPopup from '../components/SmartPopup';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppButton from '../components/WhatsAppButton';
import './MainLayout.css';

const MainLayout = ({ visitorCount }) => {
  return (
    <>
      <ScrollToTop />
      <SmartPopup />
      <WhatsAppButton />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer visitorCount={visitorCount} />
    </>
  );
};

export default MainLayout;

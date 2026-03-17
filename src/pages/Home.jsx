import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import JobBulletin from '../components/landing/JobBulletin';
import CVUploadSection from '../components/landing/CVUploadSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <JobBulletin />
      <CVUploadSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

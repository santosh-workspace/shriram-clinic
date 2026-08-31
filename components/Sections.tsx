'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/sections/Hero').then((m) => m.Hero));
const About = dynamic(() => import('@/components/sections/About').then((m) => m.About));
const Services = dynamic(() => import('@/components/sections/Services').then((m) => m.Services));
const Journey = dynamic(() => import('@/components/sections/Journey').then((m) => m.Journey));
const Doctor = dynamic(() => import('@/components/sections/Doctor').then((m) => m.Doctor));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then((m) => m.Testimonials));
const Faq = dynamic(() => import('@/components/sections/Faq').then((m) => m.Faq));
const Location = dynamic(() => import('@/components/sections/Location').then((m) => m.Location));
const BookingCta = dynamic(() => import('@/components/sections/BookingCta').then((m) => m.BookingCta));

export function Sections() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Journey />
      <Doctor />
      <Testimonials />
      <Faq />
      <Location />
      <BookingCta />
    </>
  );
}

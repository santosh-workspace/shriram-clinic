/**
 * Single source of truth for clinic content.
 * Replace the placeholder phone / map values with the real ones before launch.
 */

export const site = {
  name: 'ShriRam Clinic',
  nameMarathi: 'श्रीराम क्लिनिक',
  tagline: 'Healthcare with compassion. Care you can trust.',
  description:
    'A trusted neighbourhood clinic in Alandi, Pune — general medicine, family care and preventive health, delivered with warmth and patience.',
  url: 'https://shriramclinic.in',
  locality: 'Alandi',
  city: 'Pune',
  region: 'Maharashtra',
  country: 'IN',
  postalCode: '412105',
  streetAddress: 'Alandi, Pune',
  phoneDisplay: '+91 87884 25916',
  phoneHref: '+918788425916',
  whatsapp: '918788425916',
  email: 'care@shriramclinic.in',
  // Online appointment scheduling
  bookingUrl: 'https://calendly.com/logicminthq',
  geo: { lat: 18.6773, lng: 73.8977 },
  hours: [
    { day: 'Mon — Sat', time: '9:00 AM – 1:30 PM · 5:00 PM – 9:30 PM' },
    { day: 'Sunday', time: '9:00 AM – 12:30 PM' },
  ],
  social: {
    instagram: '#',
    facebook: '#',
  },
} as const;

export const doctors = [
  {
    name: 'Dr. Vikas Bade',
    creds: 'B.A.M.S.',
    reg: 'Reg. No. I-100789-A',
    role: 'General Physician & Founder',
  },
  {
    name: 'Dr. Rajnandini Bade',
    creds: 'B.A.M.S.',
    reg: '',
    role: "General Physician · Women's Health",
  },
] as const;

export const services = [
  {
    n: '01',
    title: 'General Physician Consultation',
    body: 'Unhurried consultations for everyday illness, chronic conditions and second opinions.',
  },
  {
    n: '02',
    title: 'Preventive Health Checkups',
    body: 'Structured screenings that catch concerns early and keep the whole family well.',
  },
  {
    n: '03',
    title: 'Diabetes Management',
    body: 'Ongoing blood-sugar care, diet guidance and monitoring tailored to your life.',
  },
  {
    n: '04',
    title: 'Hypertension Care',
    body: 'Blood-pressure control with regular follow-up and medication you can trust.',
  },
  {
    n: '05',
    title: 'Fever & Infection Treatment',
    body: 'Prompt diagnosis and treatment for seasonal fevers and common infections.',
  },
  {
    n: '06',
    title: "Women's Health",
    body: 'Sensitive, private care across every stage — from wellness to specialist referral.',
  },
  {
    n: '07',
    title: 'Elderly Care',
    body: 'Patient, respectful medicine for our senior patients and their families.',
  },
  {
    n: '08',
    title: 'Child & Family Medicine',
    body: 'Gentle paediatric care and one clinic the whole family can grow up with.',
  },
  {
    n: '09',
    title: 'Vaccinations',
    body: 'Routine and seasonal immunisations for children and adults.',
  },
  {
    n: '10',
    title: 'Health Screenings',
    body: 'Lab tests, ECG and day-care facilities available on site.',
  },
] as const;

export const journey = [
  {
    step: 'I',
    title: 'Appointment',
    body: 'Book by phone, WhatsApp or walk in. We hold time so you are never rushed.',
  },
  {
    step: 'II',
    title: 'Consultation',
    body: 'A real conversation. We listen to the whole story before anything else.',
  },
  {
    step: 'III',
    title: 'Diagnosis',
    body: 'Clear explanations, on-site tests, and a plan you actually understand.',
  },
  {
    step: 'IV',
    title: 'Treatment',
    body: 'Thoughtful, proportionate care — nothing more, nothing less than you need.',
  },
  {
    step: 'V',
    title: 'Follow-up',
    body: 'We stay with you afterwards, because getting better is a relationship.',
  },
] as const;

// TODO: point `url` at the clinic's real Google Business Profile and set
// rating/count to the live figures before launch. The quotes below are
// placeholders — replace them with genuine Google reviews.
export const reviews = {
  rating: '4.9',
  count: '120+',
  url: 'https://www.google.com/maps/search/ShriRam+Clinic+Alandi',
} as const;

export const testimonials = [
  {
    quote:
      'Doctor sir listens properly and never rushes. My father has been under his care for three years — we trust no one else.',
    name: 'Sunita Kulkarni',
    detail: 'Alandi',
  },
  {
    quote:
      'Clean, calm and genuinely caring. They explained my mother’s diabetes plan in a way we could finally follow.',
    name: 'Amit Deshpande',
    detail: 'Moshi',
  },
  {
    quote:
      'Took my daughter here with a high fever late in the evening. Seen quickly, treated gently. Deeply reassuring.',
    name: 'Pooja Shinde',
    detail: 'Dighi',
  },
  {
    quote:
      'The whole family goes here now. It feels less like a clinic and more like someone in the neighbourhood who has your back.',
    name: 'Ganesh Pawar',
    detail: 'Chakan',
  },
] as const;

export const faqs = [
  {
    q: 'Do I need an appointment, or can I walk in?',
    a: 'Both are welcome. Walk-ins are seen in turn, but booking by phone or WhatsApp means we can hold a slot and keep your waiting time short.',
  },
  {
    q: 'What are the clinic timings?',
    a: 'We are open Monday to Saturday, 9:00 AM to 1:30 PM and 5:00 PM to 9:30 PM, and Sunday mornings from 9:00 AM to 12:30 PM.',
  },
  {
    q: 'Are lab tests and ECG available at the clinic?',
    a: 'Yes. Routine blood tests, blood-sugar monitoring, ECG and day-care facilities are available on site, so most concerns are handled in one visit.',
  },
  {
    q: 'Do you treat children and elderly patients?',
    a: 'We care for the whole family — from young children through to senior citizens — and adjust our approach to each person’s needs.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We serve Alandi and the surrounding areas including Moshi, Chakan, Dighi and Bhosari. The clinic is easy to reach with parking nearby.',
  },
  {
    q: 'How do I reach the clinic in an emergency?',
    a: 'Call us directly during clinic hours. For serious emergencies please call 108 (ambulance) or go to the nearest hospital immediately.',
  },
] as const;

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Journey', href: '#journey' },
  { label: 'Doctor', href: '#doctor' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Visit', href: '#location' },
] as const;

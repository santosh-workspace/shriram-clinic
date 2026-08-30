/**
 * Bilingual content dictionary (English + Marathi).
 * Non-translatable data (phone, email, geo, review counts) lives in site.ts.
 * `mr` is type-checked against the shape of `en`, so the two can never drift.
 */

export type Lang = 'en' | 'mr';

const en = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Journey', href: '#journey' },
    { label: 'Doctor', href: '#doctor' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Visit', href: '#location' },
  ],

  ui: {
    book: 'Book appointment',
    callNow: 'Call now',
    scrollExplore: 'Scroll to explore',
    home: 'ShriRam Clinic — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    eyebrow: 'General Physician · Alandi, Pune',
    titlePre: 'Healthcare with ',
    titleEm: 'compassion.',
    titlePost: 'Care you trust.',
    sub: 'A neighbourhood clinic where you are heard, unhurried and genuinely cared for — for your whole family, across a lifetime of small and large moments.',
  },

  about: {
    eyebrow: 'The clinic',
    heading: 'A quieter kind of clinic, built on being genuinely listened to.',
    p1: 'ShriRam Clinic began with a simple conviction: that good medicine starts with time and attention. In a world of five-minute appointments, we chose to slow down.',
    p2: 'We are a family practice at heart. The same doctor sees you through a seasonal fever and through the long arc of managing diabetes — building the kind of relationship where nothing about your health feels like a stranger’s problem to solve.',
    stats: [
      { v: '12+', l: 'Years serving Alandi' },
      { v: '15k+', l: 'Patients cared for' },
      { v: '4.9', l: 'Average patient rating' },
    ],
    caption: 'ShriRam Clinic · Alandi, Pune',
  },

  services: {
    eyebrow: 'What we care for',
    heading: 'Everyday medicine, given the attention it deserves.',
    intro:
      'From a sudden fever to the steady work of managing a chronic condition — one clinic, one relationship, for the whole family.',
    items: [
      { n: '01', title: 'General Physician Consultation', body: 'Unhurried consultations for everyday illness, chronic conditions and second opinions.' },
      { n: '02', title: 'Preventive Health Checkups', body: 'Structured screenings that catch concerns early and keep the whole family well.' },
      { n: '03', title: 'Diabetes Management', body: 'Ongoing blood-sugar care, diet guidance and monitoring tailored to your life.' },
      { n: '04', title: 'Hypertension Care', body: 'Blood-pressure control with regular follow-up and medication you can trust.' },
      { n: '05', title: 'Fever & Infection Treatment', body: 'Prompt diagnosis and treatment for seasonal fevers and common infections.' },
      { n: '06', title: "Women's Health", body: 'Sensitive, private care across every stage — from wellness to specialist referral.' },
      { n: '07', title: 'Elderly Care', body: 'Patient, respectful medicine for our senior patients and their families.' },
      { n: '08', title: 'Child & Family Medicine', body: 'Gentle paediatric care and one clinic the whole family can grow up with.' },
      { n: '09', title: 'Vaccinations', body: 'Routine and seasonal immunisations for children and adults.' },
      { n: '10', title: 'Health Screenings', body: 'Lab tests, ECG and day-care facilities available on site.' },
    ],
  },

  journey: {
    eyebrow: 'How care unfolds',
    heading: 'Every visit, the same five steps.',
    sub: 'Care is not a transaction. It is a sequence we walk with you — beginning to end, and back again when you need us.',
    scroll: 'Scroll →',
    steps: [
      { step: 'I', title: 'Appointment', body: 'Book by phone, WhatsApp or walk in. We hold time so you are never rushed.' },
      { step: 'II', title: 'Consultation', body: 'A real conversation. We listen to the whole story before anything else.' },
      { step: 'III', title: 'Diagnosis', body: 'Clear explanations, on-site tests, and a plan you actually understand.' },
      { step: 'IV', title: 'Treatment', body: 'Thoughtful, proportionate care — nothing more, nothing less than you need.' },
      { step: 'V', title: 'Follow-up', body: 'We stay with you afterwards, because getting better is a relationship.' },
    ],
  },

  doctor: {
    eyebrow: 'Meet your doctor',
    name: 'Dr. Vikas Bade',
    role: 'General Physician & Founder',
    quote:
      '“Medicine taught me the science. My patients taught me the rest — that being unwell is frightening, and that the first treatment is to be truly heard.”',
    creds: [
      { k: 'Qualification', v: 'B.A.M.S.' },
      { k: 'Registration', v: 'I-100789-A' },
      { k: 'Focus', v: 'Family & general medicine' },
      { k: 'Languages', v: 'Marathi · Hindi · English' },
    ],
    alongside: 'Alongside Dr. Rajnandini Bade, B.A.M.S.',
  },

  reviewsBlock: {
    eyebrow: 'Verified Google reviews',
    heading: 'In their words',
    reviewsOn: 'reviews on',
    postedOn: 'Posted on Google',
    items: [
      { quote: 'Doctor sir listens properly and never rushes. My father has been under his care for three years — we trust no one else.', name: 'Sunita Kulkarni', detail: 'Alandi' },
      { quote: 'Clean, calm and genuinely caring. They explained my mother’s diabetes plan in a way we could finally follow.', name: 'Amit Deshpande', detail: 'Moshi' },
      { quote: 'Took my daughter here with a high fever late in the evening. Seen quickly, treated gently. Deeply reassuring.', name: 'Pooja Shinde', detail: 'Dighi' },
      { quote: 'The whole family goes here now. It feels less like a clinic and more like someone in the neighbourhood who has your back.', name: 'Ganesh Pawar', detail: 'Chakan' },
    ],
  },

  faq: {
    eyebrow: 'Good to know',
    heading: 'Questions, answered plainly.',
    items: [
      { q: 'Do I need an appointment, or can I walk in?', a: 'Both are welcome. Walk-ins are seen in turn, but booking by phone or WhatsApp means we can hold a slot and keep your waiting time short.' },
      { q: 'What are the clinic timings?', a: 'We are open Monday to Saturday, 9:00 AM to 1:30 PM and 5:00 PM to 9:30 PM, and Sunday mornings from 9:00 AM to 12:30 PM.' },
      { q: 'Are lab tests and ECG available at the clinic?', a: 'Yes. Routine blood tests, blood-sugar monitoring, ECG and day-care facilities are available on site, so most concerns are handled in one visit.' },
      { q: 'Do you treat children and elderly patients?', a: 'We care for the whole family — from young children through to senior citizens — and adjust our approach to each person’s needs.' },
      { q: 'Which areas do you serve?', a: 'We serve Alandi and the surrounding areas including Moshi, Chakan, Dighi and Bhosari. The clinic is easy to reach with parking nearby.' },
      { q: 'How do I reach the clinic in an emergency?', a: 'Call us directly during clinic hours. For serious emergencies please call 108 (ambulance) or go to the nearest hospital immediately.' },
    ],
  },

  location: {
    eyebrow: 'Visit us',
    heading: 'Find us in the heart of Alandi.',
    getDirections: 'Get directions →',
    addressLabel: 'Address',
    address: 'ShriRam Clinic, Alandi, Pune\nMaharashtra 412105',
    hoursLabel: 'Hours',
    hours: [
      { day: 'Mon — Sat', time: '9:00 AM – 1:30 PM · 5:00 PM – 9:30 PM' },
      { day: 'Sunday', time: '9:00 AM – 12:30 PM' },
    ],
    nearbyLabel: 'Nearby',
    landmarks: ['Near Alandi Devasthan', 'Alandi–Markal Road', 'Moshi · Dighi · Chakan nearby'],
  },

  booking: {
    eyebrow: 'Book an appointment',
    headingPre: 'Your health deserves',
    headingEm: 'thoughtful care.',
    sub: 'Leave your details and we’ll confirm your slot on WhatsApp — usually within the hour during clinic times. Prefer to talk? Call us directly.',
    callCta: 'Call',
    whatsappCta: 'WhatsApp us',
    form: {
      name: 'Full name',
      namePh: 'Your name',
      phone: 'Phone',
      phonePh: '+91 …',
      when: 'Preferred time',
      whenOpt: '(optional)',
      whenPh: 'e.g. Tomorrow evening',
      reason: 'Reason for visit',
      reasonPh: 'Briefly, what’s it about?',
      submit: 'Request appointment',
      note: 'We reply on WhatsApp. Your details are never shared.',
      errName: 'Please enter your name.',
      errPhone: 'Enter a valid phone number.',
      errReason: 'Tell us briefly what it’s about.',
      sentTitle: 'Request on its way',
      sentBody: 'We’re opening WhatsApp so you can send your request. We’ll confirm shortly.',
      bookAnother: 'Book another',
    },
    waGreeting: "Hello ShriRam Clinic, I'd like to book an appointment.",
  },

  footer: {
    tagline: 'Healthcare with compassion. Care you can trust.',
    localityLine: 'Alandi, Pune · Maharashtra',
    explore: 'Explore',
    reachUs: 'Reach us',
    rights: 'All rights reserved.',
    emergency1: 'Not for emergencies — call',
    emergency2: 'for an ambulance.',
  },
};

const mr: typeof en = {
  nav: [
    { label: 'आमच्याविषयी', href: '#about' },
    { label: 'सेवा', href: '#services' },
    { label: 'प्रवास', href: '#journey' },
    { label: 'डॉक्टर', href: '#doctor' },
    { label: 'अभिप्राय', href: '#testimonials' },
    { label: 'भेट द्या', href: '#location' },
  ],

  ui: {
    book: 'अपॉइंटमेंट बुक करा',
    callNow: 'आता कॉल करा',
    scrollExplore: 'अधिक पाहण्यासाठी स्क्रोल करा',
    home: 'श्रीराम क्लिनिक — मुख्यपृष्ठ',
    openMenu: 'मेनू उघडा',
    closeMenu: 'मेनू बंद करा',
  },

  hero: {
    eyebrow: 'जनरल फिजिशियन · आळंदी, पुणे',
    titlePre: 'करुणेने ',
    titleEm: 'आरोग्यसेवा.',
    titlePost: 'विश्वास ठेवावी अशी काळजी.',
    sub: 'एक असे क्लिनिक जिथे तुमचं ऐकलं जातं, घाई न करता आणि मनापासून काळजी घेतली जाते — तुमच्या संपूर्ण कुटुंबासाठी, आयुष्यभराच्या लहान-मोठ्या प्रत्येक क्षणी.',
  },

  about: {
    eyebrow: 'क्लिनिकविषयी',
    heading: 'एक शांत स्वरूपाचं क्लिनिक — जिथे तुमचं मनापासून ऐकलं जातं.',
    p1: 'श्रीराम क्लिनिकची सुरुवात एका साध्या विश्वासातून झाली: चांगल्या उपचारांची सुरुवात वेळ आणि लक्ष देण्यातून होते. पाच मिनिटांच्या अपॉइंटमेंटच्या जगात, आम्ही थोडं थांबून सावकाश काळजी घेण्याचं ठरवलं.',
    p2: 'आम्ही मुळात एक कौटुंबिक प्रॅक्टिस आहोत. तोच डॉक्टर तुम्हाला मौसमी तापापासून ते मधुमेहासारख्या दीर्घकालीन आजारापर्यंत साथ देतो — असं नातं जिथे तुमच्या आरोग्याविषयी काहीही परकं वाटत नाही.',
    stats: [
      { v: '12+', l: 'आळंदीत सेवेची वर्षे' },
      { v: '15k+', l: 'रुग्णांची घेतलेली काळजी' },
      { v: '4.9', l: 'सरासरी रुग्ण मानांकन' },
    ],
    caption: 'श्रीराम क्लिनिक · आळंदी, पुणे',
  },

  services: {
    eyebrow: 'आम्ही कशाची काळजी घेतो',
    heading: 'रोजच्या आरोग्याची, त्याला हवं तेवढं लक्ष देऊन काळजी.',
    intro:
      'अचानक आलेल्या तापापासून ते दीर्घकालीन आजाराच्या सातत्यपूर्ण उपचारांपर्यंत — संपूर्ण कुटुंबासाठी एकच क्लिनिक, एकच नातं.',
    items: [
      { n: '01', title: 'जनरल फिजिशियन सल्लामसलत', body: 'रोजचे आजार, दीर्घकालीन व्याधी आणि दुसऱ्या मतासाठी घाई न करता सल्लामसलत.' },
      { n: '02', title: 'प्रतिबंधात्मक आरोग्य तपासणी', body: 'आजार लवकर ओळखणाऱ्या आणि संपूर्ण कुटुंब निरोगी ठेवणाऱ्या नियोजित तपासण्या.' },
      { n: '03', title: 'मधुमेह व्यवस्थापन', body: 'रक्तातील साखरेची सतत काळजी, आहार मार्गदर्शन आणि तुमच्या जीवनशैलीनुसार देखरेख.' },
      { n: '04', title: 'रक्तदाब (बीपी) काळजी', body: 'नियमित पाठपुरावा आणि विश्वासार्ह औषधोपचारांसह रक्तदाब नियंत्रण.' },
      { n: '05', title: 'ताप व संसर्ग उपचार', body: 'मौसमी ताप आणि सामान्य संसर्गांचे त्वरित निदान व उपचार.' },
      { n: '06', title: 'महिला आरोग्य', body: 'प्रत्येक टप्प्यावर संवेदनशील, खासगी काळजी — निरोगीपणापासून तज्ज्ञ सल्ल्यापर्यंत.' },
      { n: '07', title: 'ज्येष्ठ नागरिक काळजी', body: 'आमच्या ज्येष्ठ रुग्णांसाठी आणि त्यांच्या कुटुंबासाठी संयमी, आदरपूर्वक उपचार.' },
      { n: '08', title: 'बालरोग व कौटुंबिक उपचार', body: 'सौम्य बालरोग काळजी आणि संपूर्ण कुटुंब वाढू शकेल असं एकच क्लिनिक.' },
      { n: '09', title: 'लसीकरण', body: 'लहान मुलांसाठी आणि प्रौढांसाठी नियमित व मौसमी लसीकरण.' },
      { n: '10', title: 'आरोग्य तपासण्या', body: 'रक्त तपासण्या, ईसीजी आणि डे-केअर सुविधा जागेवरच उपलब्ध.' },
    ],
  },

  journey: {
    eyebrow: 'काळजी कशी उलगडते',
    heading: 'प्रत्येक भेटीत, तेच पाच टप्पे.',
    sub: 'काळजी म्हणजे व्यवहार नाही. हा एक प्रवास आहे जो आम्ही तुमच्यासोबत चालतो — सुरुवातीपासून शेवटपर्यंत, आणि गरज पडल्यास पुन्हा.',
    scroll: 'स्क्रोल करा →',
    steps: [
      { step: 'I', title: 'अपॉइंटमेंट', body: 'फोन, व्हॉट्सअ‍ॅप किंवा थेट या. आम्ही वेळ राखून ठेवतो, त्यामुळे तुमची कधीही घाई होत नाही.' },
      { step: 'II', title: 'सल्लामसलत', body: 'खरा संवाद. काहीही करण्याआधी आम्ही तुमची संपूर्ण हकीकत ऐकतो.' },
      { step: 'III', title: 'निदान', body: 'स्पष्ट माहिती, जागेवरच तपासण्या, आणि तुम्हाला खरोखर समजेल असा उपचार आराखडा.' },
      { step: 'IV', title: 'उपचार', body: 'विचारपूर्वक, योग्य प्रमाणात उपचार — गरजेपेक्षा जास्त नाही, कमीही नाही.' },
      { step: 'V', title: 'पाठपुरावा', body: 'आम्ही नंतरही तुमच्यासोबत राहतो, कारण बरं होणं हे एक नातं आहे.' },
    ],
  },

  doctor: {
    eyebrow: 'तुमच्या डॉक्टरांची भेट',
    name: 'डॉ. विकास बडे',
    role: 'जनरल फिजिशियन व संस्थापक',
    quote:
      '“वैद्यकशास्त्राने मला विज्ञान शिकवलं. माझ्या रुग्णांनी बाकीचं शिकवलं — आजारी असणं भीतीदायक असतं, आणि पहिला उपचार म्हणजे मनापासून ऐकून घेणं.”',
    creds: [
      { k: 'पात्रता', v: 'B.A.M.S.' },
      { k: 'नोंदणी', v: 'I-100789-A' },
      { k: 'विशेष लक्ष', v: 'कौटुंबिक व सर्वसाधारण उपचार' },
      { k: 'भाषा', v: 'मराठी · हिंदी · इंग्रजी' },
    ],
    alongside: 'सोबत डॉ. रजनंदिनी बडे, B.A.M.S.',
  },

  reviewsBlock: {
    eyebrow: 'पडताळलेले Google अभिप्राय',
    heading: 'त्यांच्याच शब्दांत',
    reviewsOn: 'अभिप्राय ·',
    postedOn: 'Google वर पोस्ट केलेले',
    items: [
      { quote: 'डॉक्टर साहेब नीट ऐकतात आणि कधीच घाई करत नाहीत. माझे वडील तीन वर्षांपासून त्यांच्या उपचाराखाली आहेत — आम्ही दुसऱ्या कुणावरही विश्वास ठेवत नाही.', name: 'सुनीता कुलकर्णी', detail: 'आळंदी' },
      { quote: 'स्वच्छ, शांत आणि खरोखर काळजी घेणारे. माझ्या आईचा मधुमेहाचा उपचार त्यांनी असा समजावला की आम्हाला शेवटी तो नीट पाळता आला.', name: 'अमित देशपांडे', detail: 'मोशी' },
      { quote: 'माझ्या मुलीला रात्री उशिरा खूप ताप आला होता, तेव्हा इथे आणलं. लगेच तपासलं, हळुवारपणे उपचार केले. खूप आधार वाटला.', name: 'पूजा शिंदे', detail: 'दिघी' },
      { quote: 'आता संपूर्ण कुटुंब इथेच येतं. हे क्लिनिकपेक्षा शेजारी असलेल्या, तुमच्या पाठीशी उभ्या राहणाऱ्या कुणासारखं वाटतं.', name: 'गणेश पवार', detail: 'चाकण' },
    ],
  },

  faq: {
    eyebrow: 'जाणून घ्या',
    heading: 'प्रश्न, सोप्या शब्दांत उत्तरं.',
    items: [
      { q: 'अपॉइंटमेंट आवश्यक आहे का, की थेट येऊ शकतो?', a: 'दोन्ही चालेल. थेट येणाऱ्यांना क्रमाने पाहिलं जातं, पण फोन किंवा व्हॉट्सअ‍ॅपवर बुक केल्यास आम्ही वेळ राखून ठेवतो आणि तुमचा प्रतीक्षा वेळ कमी राहतो.' },
      { q: 'क्लिनिकची वेळ काय आहे?', a: 'आम्ही सोमवार ते शनिवार सकाळी ९:०० ते दुपारी १:३० आणि संध्याकाळी ५:०० ते रात्री ९:३० उघडे असतो, तसेच रविवारी सकाळी ९:०० ते १२:३०.' },
      { q: 'क्लिनिकमध्ये लॅब तपासण्या व ईसीजी उपलब्ध आहेत का?', a: 'होय. नियमित रक्त तपासण्या, रक्तशर्करा देखरेख, ईसीजी आणि डे-केअर सुविधा जागेवरच उपलब्ध आहेत, त्यामुळे बहुतांश गोष्टी एकाच भेटीत होतात.' },
      { q: 'तुम्ही लहान मुलं आणि ज्येष्ठ रुग्णांवर उपचार करता का?', a: 'आम्ही संपूर्ण कुटुंबाची काळजी घेतो — लहान मुलांपासून ते ज्येष्ठ नागरिकांपर्यंत — आणि प्रत्येकाच्या गरजेनुसार आमचा दृष्टिकोन बदलतो.' },
      { q: 'तुम्ही कोणत्या भागांत सेवा देता?', a: 'आम्ही आळंदी आणि आसपासच्या मोशी, चाकण, दिघी व भोसरी भागांत सेवा देतो. क्लिनिकला पोहोचणं सोपं असून जवळ पार्किंगही आहे.' },
      { q: 'आणीबाणीत क्लिनिकशी कसा संपर्क साधावा?', a: 'क्लिनिकच्या वेळेत आम्हाला थेट कॉल करा. गंभीर आणीबाणीसाठी कृपया १०८ (रुग्णवाहिका) वर कॉल करा किंवा जवळच्या रुग्णालयात त्वरित जा.' },
    ],
  },

  location: {
    eyebrow: 'आम्हाला भेट द्या',
    heading: 'आळंदीच्या मध्यवर्ती भागात आम्हाला भेटा.',
    getDirections: 'दिशा मिळवा →',
    addressLabel: 'पत्ता',
    address: 'श्रीराम क्लिनिक, आळंदी, पुणे\nमहाराष्ट्र ४१२१०५',
    hoursLabel: 'वेळा',
    hours: [
      { day: 'सोम — शनि', time: 'सकाळी ९:०० – दु. १:३० · सं. ५:०० – रा. ९:३०' },
      { day: 'रविवार', time: 'सकाळी ९:०० – दु. १२:३०' },
    ],
    nearbyLabel: 'जवळपास',
    landmarks: ['आळंदी देवस्थानाजवळ', 'आळंदी–मरकळ रस्ता', 'मोशी · दिघी · चाकण जवळ'],
  },

  booking: {
    eyebrow: 'अपॉइंटमेंट बुक करा',
    headingPre: 'तुमच्या आरोग्याला हवी',
    headingEm: 'विचारपूर्वक काळजी.',
    sub: 'तुमची माहिती द्या, आम्ही व्हॉट्सअ‍ॅपवर तुमची वेळ निश्चित करू — क्लिनिकच्या वेळेत साधारण तासाभरात. बोलायचं आहे? थेट कॉल करा.',
    callCta: 'कॉल करा',
    whatsappCta: 'व्हॉट्सअ‍ॅप करा',
    form: {
      name: 'पूर्ण नाव',
      namePh: 'तुमचं नाव',
      phone: 'फोन',
      phonePh: '+91 …',
      when: 'सोयीची वेळ',
      whenOpt: '(ऐच्छिक)',
      whenPh: 'उदा. उद्या संध्याकाळी',
      reason: 'भेटीचं कारण',
      reasonPh: 'थोडक्यात, कशासाठी?',
      submit: 'अपॉइंटमेंटची विनंती करा',
      note: 'आम्ही व्हॉट्सअ‍ॅपवर उत्तर देतो. तुमची माहिती कधीही शेअर केली जात नाही.',
      errName: 'कृपया तुमचं नाव लिहा.',
      errPhone: 'वैध फोन नंबर लिहा.',
      errReason: 'कशासाठी ते थोडक्यात सांगा.',
      sentTitle: 'विनंती पाठवली जात आहे',
      sentBody: 'तुमची विनंती पाठवण्यासाठी आम्ही व्हॉट्सअ‍ॅप उघडत आहोत. आम्ही लवकरच निश्चिती देऊ.',
      bookAnother: 'आणखी एक बुक करा',
    },
    waGreeting: 'नमस्कार श्रीराम क्लिनिक, मला अपॉइंटमेंट बुक करायची आहे.',
  },

  footer: {
    tagline: 'करुणेने आरोग्यसेवा. विश्वास ठेवावी अशी काळजी.',
    localityLine: 'आळंदी, पुणे · महाराष्ट्र',
    explore: 'पहा',
    reachUs: 'संपर्क',
    rights: 'सर्व हक्क राखीव.',
    emergency1: 'आणीबाणीसाठी नाही — रुग्णवाहिकेसाठी',
    emergency2: 'वर कॉल करा.',
  },
};

export const content: Record<Lang, typeof en> = { en, mr };

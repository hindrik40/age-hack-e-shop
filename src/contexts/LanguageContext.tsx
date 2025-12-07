'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'sv' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  sv: {
    // Navigation
  'nav.home': 'Hem',
  'nav.products': 'Produkter',
  'nav.about': 'Om Oss',
  'nav.contact': 'Kontakt',
  'nav.cart': 'Kundvagn',
  'nav.wishlist': 'Önskelista',
  'nav.search': 'Sök',
  'nav.wellness': 'Wellness Guide',
  'nav.forum': 'Expertforum',
  'nav.experts': 'Experter',
  'nav.treatments': 'Behandlingar',
  'nav.studies': 'Vetenskapliga Studier',
  'nav.blog': 'Blogg',
  'nav.complaints': 'Reklamationer',
    'search.placeholder': 'Sök efter produkter, ingredienser...',
    
    // Cart
    'cart.title': 'Kundvagn',
    'cart.empty': 'Din kundvagn är tom',
    
    // Mobile
    'mobile.home': 'Hem',
    'mobile.products': 'Produkter',
    'mobile.antiAging': 'Anti-Aging',
    'mobile.ayurvedic': 'Ayurvediska Produkter',
    'mobile.chineseMedicine': 'Kinesisk Medicin',
    'mobile.healthTests': 'Hälsotester',
    'mobile.wellness': 'Wellness Guide',
    'mobile.about': 'Om Oss',
    'mobile.startShopping': 'Börja Shoppa',
    
    // Hero Section
    'hero.title': 'En kropp och själ i harmoni',
    'hero.subtitle': 'Holistisk wellness för alla åldrar',
    'hero.description': 'Upptäck vårt utvalda sortiment av anti-aging produkter, ayurvediska behandlingar och hälsotester',
    'hero.cta.primary': 'Utforska Produkter',
    'hero.cta.secondary': 'Wellness Guide',
    
    // About page
    'about.storyTitle': 'Vår Historia',
    'about.storyText': 'Grundat 2024 med en vision att kombinera traditionell visdom med modern vetenskap inom skönhet och hälsa. Vi erbjuder noggrant utvalda produkter inom anti-aging, ayurveda, kinesisk medicin och hälsotester.',
    'about.storyText2': 'Vår resa började med insikten att sann skönhet kommer inifrån. Genom att erbjuda högkvalitativa produkter och tester hjälper vi våra kunder att uppnå optimal hälsa och strålande skönhet.',
    'about.missionTitle': 'Vårt Uppdrag',
    'about.missionText': 'Att erbjuda högkvalitativa, vetenskapligt baserade produkter och tester som främjar både inre och yttre skönhet. Vi strävar efter att göra holistisk hälsa tillgänglig för alla genom noggrant utvalda produkter och personlig vägledning.',
    'about.visionTitle': 'Vår Vision',
    'about.visionText': 'Att bli den ledande destinationen för holistisk skönhet och hälsa i Sverige, där kunder kan hitta allt de behöver för att uppnå optimal hälsa och strålande skönhet genom en kombination av traditionell visdom och modern vetenskap.',
    'about.teamTitle': 'Vårt Team',
    'about.teamSubtitle': 'Möt passionerade experter som driver vår vision om holistisk hälsa och skönhet',
    'about.founderName': 'Ditt Namn',
    'about.founderTitle': 'Grundare & VD',
    'about.founderText': 'Passionerad entreprenör med visionen att kombinera traditionell visdom med modern vetenskap för optimal hälsa och skönhet.',
    'about.healthExpertName': 'Dr. Maria Lindström',
    'about.healthExpertTitle': 'Hälsocoach & Näringsfysiolog',
    'about.healthExpertText': 'Expert inom funktionsmedicin och näringslära med fokus på holistisk hälsa och anti-aging.',
    'about.beautyExpertName': 'Sofia Andersson',
    'about.beautyExpertTitle': 'Skönhetsexpert & Hudterapeut',
    'about.beautyExpertText': 'Certifierad hudterapeut med specialisering inom naturlig hudvård och ayurvediska behandlingar.',
    'about.values.naturalText': 'Vi prioriterar naturliga och ekologiska ingredienser',
    'about.values.caringText': 'Vi bryr oss om våra kunders välbefinnande',
    'about.values.qualityText': 'Endast de bästa produkterna väljs ut',
    'about.values.communityText': 'Vi bygger en hälsosam gemenskap',

    // About page CTAs
    'about.ctaTitle': 'Börja Din Hälsoresa Idag',
    'about.ctaSubtitle': 'Utforska våra produkter och hitta det perfekta valet för din hälsoresa',
    'about.ctaButton': 'Utforska Våra Produkter',
    
    // Age categories
    'age.young': 'Ung',
    'age.middle': '40-50 år',
    'age.senior': '60-70 år',
    
    // Gender
    'gender.women': 'Kvinnor',
    'gender.men': 'Män',
    'gender.woman': 'Kvinna',
    'gender.man': 'Man',
    
    // Product sections
    'section.antiaging': 'Anti-Aging',
    'section.ayurveda': 'Ayurveda',
    'section.tcm': 'Kinesisk Medicin',
    'section.healthtests': 'Hälsotester',
    'section.wellness': 'Välmående',
    
    // About page
    'about.title': 'Om Oss',
    'about.subtitle': 'Din Partner för Skönhet och Välmående',
    'about.history': 'Vår Historia',
    'about.mission': 'Vårt Uppdrag',
    'about.vision': 'Vår Vision',
    'about.team': 'Vårt Team',
    'about.values': 'Våra Värderingar',
    'about.values.natural': 'Naturligt',
    'about.values.caring': 'Omtänksamt',
    'about.values.quality': 'Kvalitet',
    'about.values.community': 'Gemenskap',
    
    // Contact
    'contact.title': 'Kontakta Oss',
    'contact.email': 'E-post',
    'contact.phone': 'Telefon',
    'contact.address': 'Adress',
    'contact.supportPhone': 'Support: 08-555 123 45',
    
    // Complaints/Reclamations
    'complaints.title': 'Reklamationer',
    'complaints.subtitle': 'Vi tar dina reklamationer på allvar',
    'complaints.description': 'Om du inte är nöjd med en produkt eller tjänst, vänligen kontakta oss så hjälper vi dig.',
    'complaints.form.name': 'Namn',
    'complaints.form.email': 'E-post',
    'complaints.form.orderNumber': 'Ordernummer',
    'complaints.form.message': 'Beskriv ditt ärende',
    'complaints.form.submit': 'Skicka reklamation',
    'complaints.form.success': 'Din reklamation har skickats. Vi återkommer inom 24 timmar.',
    
    // Scientific Studies
    'studies.title': 'Vetenskapliga Studier',
    'studies.subtitle': 'Forskning bakom våra produkter',
    'studies.description': 'Utforska den vetenskapliga forskningen som ligger till grund för våra produkter och behandlingar.',
    'studies.readMore': 'Läs mer',
    'studies.antiaging': 'Anti-Aging Forskning',
    'studies.ayurveda': 'Ayurvedisk Medicin',
    'studies.tcm': 'Kinesisk Medicin',
    'studies.peptides': 'Peptid Forskning',
    
    // Blog/Feedback
    'blog.title': 'Blogg & Feedback',
    'blog.subtitle': 'Dela dina erfarenheter och läs andras',
    'blog.writePost': 'Skriv ett inlägg',
    'blog.yourName': 'Ditt namn',
    'blog.yourEmail': 'Din e-post',
    'blog.yourMessage': 'Ditt meddelande',
    'blog.submit': 'Publicera',
    'blog.success': 'Ditt inlägg har publicerats!',
    
    // Purchase Counter
    'products.purchased': 'köp',
    'products.purchaseCount': 'personer har köpt denna produkt',
    
    // Common
    'common.addToCart': 'Lägg i Kundvagn',
    'common.quickView': 'Snabbvisning',
    'common.wishlist': 'Önskelista',
    'common.search': 'Sök',
    'common.currency': 'SEK',
    'common.language': 'Språk',
    // Checkout
    'checkout.title': 'Betalning',
    'checkout.subtitle': 'Slutför din beställning',
    'checkout.personalInfo': 'Personuppgifter',
    'checkout.firstName': 'Förnamn',
    'checkout.lastName': 'Efternamn',
    'checkout.email': 'E-post',
    'checkout.phone': 'Telefon',
    'checkout.shippingAddress': 'Leveransadress',
    'checkout.address': 'Adress',
    'checkout.city': 'Stad',
    'checkout.zipCode': 'Postnummer',
    'checkout.paymentInfo': 'Betalningsinformation',
    'checkout.cardNumber': 'Kortnummer',
    'checkout.expiryDate': 'Utgångsdatum',
    'checkout.expiryPlaceholder': 'MM/ÅÅ',
    'checkout.cvv': 'CVV',
    'checkout.pay': 'Betala',
    'checkout.processing': 'Bearbetar...',
    'checkout.orderSummary': 'Din Beställning',
    'checkout.confirmMessage': 'Vill du betala eller fortsätta handla?\nOK = Betala, Avbryt = Fortsätta handla',
    'checkout.continueShopping': 'Du kan fortsätta handla.',
    'checkout.paymentSuccessTitle': 'Betalning genomförd!',
    'checkout.paymentSuccessDesc': 'Din order har mottagits och kommer att behandlas inom 24 timmar.',
      'forum.backToForum': 'Tillbaka till Forum',
      'forum.askTitle': 'Ställ en fråga till våra experter',
      'forum.askSubtitle': 'Få personliga svar från certifierade experter inom ayurveda, kinesisk medicin och anti-aging.',
      'forum.category': 'Kategori',
      'forum.filters': 'Filter',
      'forum.searchQuestions': 'Sök frågor',
      'forum.noQuestions': 'Inga frågor ännu',
      'forum.beFirstToAsk': 'Var först med att ställa en fråga',
      'forum.totalQuestions': 'Totalt antal frågor',
      'forum.answeredQuestions': 'Besvarade frågor',
      'forum.certifiedExperts': 'Certifierade experter',
      // Forum detail labels
      'forum.viewProfile': 'Visa Profil',
      'forum.yearsExperience': 'års erfarenhet',
      'forum.answered': 'Besvarad',
      'forum.showMore': 'Visa mer',
      'forum.showLess': 'Visa mindre',
      'forum.expertAnswers': 'Expert Svar',
      'forum.featured': 'Utvald',
      'forum.anonymous': 'Anonym',
      'forum.answers': 'svar',
      'forum.waitingForAnswer': 'Väntar på expertsvar...',
      'forum.showAllAnswers': 'Visa alla',
      // Added forum keys used by components/forum/ExpertForum.tsx
      'expert_forum': 'Expertforum',
      'expert_forum_desc': 'Ställ frågor till våra certifierade experter inom Ayurveda, Traditionell Kinesisk Medicin och Anti-Aging terapi',
      'filter_questions': 'Filtrera frågor',
      'search': 'Sök',
      'search_questions': 'Sök frågor...',
      'category': 'Kategori',
      'answered_only': 'Endast besvarade',
      'view_experts': 'Visa experter',
      'recent_questions': 'Senaste frågor',
      'questions_found': 'frågor hittades',
      'no_questions_found': 'Inga frågor hittades',
      'try_different_filters': 'Justera dina filter eller var först med att ställa en fråga!'
      ,
      'ask_first_question': 'Ställ den första frågan',
      // Experts page keys
      'experts.title': 'Vårt expertteam',
      'experts.subtitle': 'Möt våra certifierade experter inom Ayurveda, Traditionell Kinesisk Medicin och Anti-Aging terapi',
      'experts.filterTitle': 'Filtrera experter',
      'experts.search': 'Sök',
      'experts.searchPlaceholder': 'Sök experter...',
      'experts.category': 'Kategori',
      'experts.expertsFound': 'experter hittades',
      'experts.noExperts': 'Inga experter hittades',
      'experts.adjustFiltersHint': 'Försök justera dina filter eller sökord',
      'experts.clearFilters': 'Rensa filter',
      'experts.recentQA': 'Senaste frågor & svar',
      'experts.noRecentActivity': 'Ingen senaste aktivitet',
      'experts.noRecentActivityHint': 'Denna expert har inte besvarat några frågor ännu. Kom tillbaka snart!',
      'experts.browseForum': 'Bläddra bland forumfrågor',
      'experts.notFound': 'Expert saknas',
      'experts.notFoundDesc': 'Experten du letar efter kunde inte hittas.',
      'experts.backToExperts': 'Till experter',
      // Forum/Expert labels
      'forum.certifications': 'Certifieringar',
      // Category names
      'categories.all': 'Alla kategorier',
      'categories.diet': 'Kost',
      'categories.sleep': 'Sömn',
      'categories.movement': 'Rörelse',
      'categories.stress': 'Stress',
      'categories.spirituality': 'Andlighet',
      'categories.mentalHealth': 'Själslig hälsa',
      // Ask form labels
      'ask_question': 'Ställ en fråga',
      'specialization': 'Specialisering',
      'question_title': 'Frågetitel',
      'enter_question_title': 'Ange din frågetitel...',
      'question_details': 'Frågedetaljer',
      'describe_your_question': 'Beskriv din fråga eller ditt bekymmer i detalj...',
      'your_name': 'Ditt namn',
      'enter_your_name': 'Ange ditt namn...',
      'your_email': 'Din e-post',
      'enter_your_email': 'Ange din e-postadress...',
      'submit_question': 'Skicka fråga',
      'sending': 'Skickar...',
      'anonymous': 'Ställ frågan anonymt',
      'cancel': 'Avbryt',
      // Ask form messages
      'error': 'Fel',
      'success': 'Klart',
      'please_fill_all_fields': 'Fyll i alla obligatoriska fält',
      'please_enter_valid_email': 'Ange en giltig e-postadress',
      'question_submitted': 'Din fråga har skickats!',
      'failed_to_submit_question': 'Kunde inte skicka frågan. Försök igen.',
      'lang.en': 'Engelska',
      'lang.sv': 'Svenska',
      'lang.hi': 'Hindi',
      'lang.gu': 'Gujarati',
      'lang.zh': 'Kinesiska',
      'lang.es': 'Spanska',
    },
    en: {
    // Navigation
  'nav.home': 'Home',
  'nav.products': 'Products',
  'nav.about': 'About Us',
  'nav.contact': 'Contact',
  'nav.cart': 'Cart',
  'nav.wishlist': 'Wishlist',
  'nav.search': 'Search',
  'nav.wellness': 'Wellness Guide',
  'nav.forum': 'Expert Forum',
  'nav.experts': 'Experts',
  'nav.treatments': 'Treatments',
  'nav.studies': 'Scientific Studies',
  'nav.blog': 'Blog',
  'nav.complaints': 'Complaints',
    'search.placeholder': 'Search for products, ingredients...',
    'forum.backToForum': 'Back to Forum',
    'forum.askTitle': 'Ask a Question to Our Experts',
    'forum.askSubtitle': 'Get personalized answers from certified experts in Ayurveda, Traditional Chinese Medicine, and anti-aging.',
    'forum.category': 'Category',
    'forum.filters': 'Filters',
    'forum.searchQuestions': 'Search questions',
    'forum.noQuestions': 'No questions yet',
    'forum.beFirstToAsk': 'Be the first to ask a question',
    'forum.totalQuestions': 'Total questions',
    'forum.answeredQuestions': 'Answered questions',
    'forum.certifiedExperts': 'Certified experts',
    // Forum detail labels
    'forum.viewProfile': 'View Profile',
    'forum.yearsExperience': 'years experience',
    'forum.answered': 'Answered',
    'forum.showMore': 'Show more',
    'forum.showLess': 'Show less',
    'forum.expertAnswers': 'Expert Answers',
    'forum.featured': 'Featured',
    'forum.anonymous': 'Anonymous',
    'forum.answers': 'answers',
    'forum.waitingForAnswer': 'Waiting for expert answer...',
    'forum.showAllAnswers': 'Show all',
    // Added forum keys used by components/forum/ExpertForum.tsx
    'expert_forum': 'Expert Forum',
    'expert_forum_desc': 'Ask questions to our certified experts in Ayurveda, Traditional Chinese Medicine, and Anti-Aging therapies',
    'filter_questions': 'Filter Questions',
    'search': 'Search',
    'search_questions': 'Search questions...',
    'category': 'Category',
    'answered_only': 'Answered only',
    'view_experts': 'View Experts',
    'recent_questions': 'Recent Questions',
    'questions_found': 'questions found',
    'no_questions_found': 'No questions found',
    'try_different_filters': 'Try adjusting your filters or be the first to ask a question!',
    'ask_first_question': 'Ask the First Question',
    // Experts page keys
    'experts.title': 'Our Expert Panel',
    'experts.subtitle': 'Meet our certified experts in Ayurveda, Traditional Chinese Medicine, and Anti-Aging therapies',
    'experts.filterTitle': 'Filter Experts',
    'experts.search': 'Search',
    'experts.searchPlaceholder': 'Search experts...',
    'experts.category': 'Category',
    'experts.expertsFound': 'experts found',
    'experts.noExperts': 'No experts found',
    'experts.adjustFiltersHint': 'Try adjusting your filters or search terms',
    'experts.clearFilters': 'Clear Filters',
    'experts.recentQA': 'Recent Questions & Answers',
    'experts.noRecentActivity': 'No Recent Activity',
    'experts.noRecentActivityHint': "This expert hasn't answered any questions yet. Check back soon!",
    'experts.browseForum': 'Browse Forum Questions',
    'experts.notFound': 'Expert Not Found',
    'experts.notFoundDesc': "The expert you're looking for could not be found.",
    'experts.backToExperts': 'Back to Experts',
    // Forum/Expert labels
    'forum.certifications': 'Certifications',
    // Category names
    'categories.all': 'All Categories',
    'categories.diet': 'Diet',
    'categories.sleep': 'Sleep',
    'categories.movement': 'Movement',
    'categories.stress': 'Stress',
    'categories.spirituality': 'Spirituality',
    'categories.mentalHealth': 'Mental Health',
    // Ask form labels
    'ask_question': 'Ask a Question',
      'specialization': 'Specialization',
      'question_title': 'Question Title',
      'enter_question_title': 'Enter your question title...',
      'question_details': 'Question Details',
      'describe_your_question': 'Please describe your question or concern in detail...',
      'your_name': 'Your Name',
      'enter_your_name': 'Enter your name...',
      'your_email': 'Your Email',
      'enter_your_email': 'Enter your email address...',
      'submit_question': 'Submit Question',
      'sending': 'Sending...',
      'anonymous': 'Ask anonymously',
      'cancel': 'Cancel',
      // Ask form messages
      'error': 'Error',
      'success': 'Success',
      'please_fill_all_fields': 'Please fill in all required fields',
      'please_enter_valid_email': 'Please enter a valid email address',
      'question_submitted': 'Your question has been submitted successfully!',
      'failed_to_submit_question': 'Failed to submit question. Please try again.',
      'lang.en': 'English',
      'lang.sv': 'Swedish',
      'lang.hi': 'Hindi',
      'lang.gu': 'Gujarati',
      'lang.zh': 'Chinese',
      'lang.es': 'Spanish',
    
    // Cart
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty',
    
    // Mobile
    'mobile.home': 'Home',
    'mobile.products': 'Products',
    'mobile.antiAging': 'Anti-Aging',
    'mobile.ayurvedic': 'Ayurvedic Products',
    'mobile.chineseMedicine': 'Chinese Medicine',
    'mobile.healthTests': 'Health Tests',
    'mobile.wellness': 'Wellness Guide',
    'mobile.about': 'About Us',
    'mobile.startShopping': 'Start Shopping',
    
    // Hero Section
    'hero.title': 'Inner & Outer Radiance',
    'hero.subtitle': 'Discover the power of holistic wellness with our carefully selected peptides, ayurvedic products and wellness solutions. Scientifically based. Naturally effective.',
    'hero.cta.primary': 'Explore Products',
    'hero.cta.secondary': 'Learn More',
    
    // Age categories
    'age.young': 'Young',
    'age.middle': '40-50 years',
    'age.senior': '60-70 years',
    
    // Gender
    'gender.women': 'Women',
    'gender.men': 'Men',
    'gender.woman': 'Woman',
    'gender.man': 'Man',
    
    // Product sections
    'section.antiaging': 'Anti-Aging',
    'section.ayurveda': 'Ayurveda',
    'section.tcm': 'Chinese Medicine',
    'section.healthtests': 'Health Tests',
    'section.wellness': 'Wellness',
    
    // About page
    'about.title': 'About Us',
    'about.subtitle': 'Your Partner for Beauty and Wellness',
    'about.history': 'Our History',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.team': 'Our Team',
    'about.values': 'Our Values',
    'about.values.natural': 'Natural',
    'about.values.caring': 'Caring',
    'about.values.quality': 'Quality',
    'about.values.community': 'Community',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.supportPhone': 'Support: +1-555-123-4567',
    
    // Complaints/Reclamations
    'complaints.title': 'Complaints',
    'complaints.subtitle': 'We take your complaints seriously',
    'complaints.description': 'If you are not satisfied with a product or service, please contact us and we will help you.',
    'complaints.form.name': 'Name',
    'complaints.form.email': 'Email',
    'complaints.form.orderNumber': 'Order Number',
    'complaints.form.message': 'Describe your case',
    'complaints.form.submit': 'Submit Complaint',
    'complaints.form.success': 'Your complaint has been sent. We will respond within 24 hours.',
    
    // Scientific Studies
    'studies.title': 'Scientific Studies',
    'studies.subtitle': 'Research behind our products',
    'studies.description': 'Explore the scientific research that forms the basis of our products and treatments.',
    'studies.readMore': 'Read more',
    'studies.antiaging': 'Anti-Aging Research',
    'studies.ayurveda': 'Ayurvedic Medicine',
    'studies.tcm': 'Chinese Medicine',
    'studies.peptides': 'Peptide Research',
    
    // Blog/Feedback
    'blog.title': 'Blog & Feedback',
    'blog.subtitle': 'Share your experiences and read others',
    'blog.writePost': 'Write a post',
    'blog.yourName': 'Your name',
    'blog.yourEmail': 'Your email',
    'blog.yourMessage': 'Your message',
    'blog.submit': 'Publish',
    'blog.success': 'Your post has been published!',
    
    // Purchase Counter
    'products.purchased': 'purchased',
    'products.purchaseCount': 'people have bought this product',
    
    // Common
    'common.addToCart': 'Add to Cart',
    'common.quickView': 'Quick View',
    'common.wishlist': 'Wishlist',
    'common.search': 'Search',
    'common.currency': 'USD',
    'common.language': 'Language',

    // Checkout
    'checkout.title': 'Payment',
    'checkout.subtitle': 'Complete your order',
    'checkout.personalInfo': 'Personal Information',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.zipCode': 'Postal Code',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.cardNumber': 'Card Number',
    'checkout.expiryDate': 'Expiry Date',
    'checkout.expiryPlaceholder': 'MM/YY',
    'checkout.cvv': 'CVV',
    'checkout.pay': 'Pay',
    'checkout.processing': 'Processing...',
    'checkout.orderSummary': 'Order Summary',
    'checkout.confirmMessage': 'Do you want to pay or continue shopping?\nOK = Pay, Cancel = Continue shopping',
    'checkout.continueShopping': 'You can continue shopping.',
    'checkout.paymentSuccessTitle': 'Payment completed!',
    'checkout.paymentSuccessDesc': 'Your order has been received and will be processed within 24 hours.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sv');

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    return dict[key] ?? fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
import { Partner, Product, PartnerFile, User, ChatThread, Order } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_fashion_1793028909349.jpg';

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'maison-aurum',
    name: 'Maison Aurum',
    location: 'Place Vendôme, Paris',
    tagline: 'Haute Couture Eveningwear & 24k Gold Thread Embroidery',
    ethos: 'Reviving antique gilded weaving techniques for modern galas and timeless ceremonial presence.',
    accentColor: '#c5a059',
    heroImage: '/src/assets/images/partner_aurum_1793028924779.jpg',
    founded: 1928,
    leadDesigner: 'Elena Vance',
    specialty: 'Gold-Woven Gowns & Gilded Tailoring',
    bannerText: 'Private Paris Showroom Appointments by Concierge Request',
    story: 'Founded along the historic Place Vendôme, Maison Aurum blends rare metallic filaments with double-faced Lyon silk. Each piece requires between 180 and 420 hand-needle hours by master embroiderers.'
  },
  {
    id: 'atelier-veloce',
    name: 'Atelier Veloce',
    location: 'Via Montenapoleone, Milan',
    tagline: 'Architectural Bespoke Tailoring & Tuscan Hand-Burnished Leather',
    ethos: 'Precise geometric cuts honoring Milanese structural tailoring and bespoke generational leathercraft.',
    accentColor: '#93a1a9',
    heroImage: '/src/assets/images/partner_veloce_1793028938130.jpg',
    founded: 1964,
    leadDesigner: 'Marco Rossi',
    specialty: 'Virgin Wool Overcoats & Structural Suiting',
    bannerText: 'Milanese Savoir-Faire with Full Bespoke Fitting Coordination',
    story: 'Atelier Veloce sources virgin merino wool and calfskin from historic Tuscan tanneries, cutting each lapel and lining by bespoke proportion calipers.'
  },
  {
    id: 'serenite-noir',
    name: 'Sérénité Noir',
    location: 'Gion District, Kyoto',
    tagline: 'Avant-Garde Draped Silks & Monochromatic Minimalist Silhouettes',
    ethos: 'Wabi-sabi philosophy captured through unbleached raw silks, plant charcoal dyes, and fluid draped motion.',
    accentColor: '#70707b',
    heroImage: '/src/assets/images/partner_serenite_1793028949941.jpg',
    founded: 2011,
    leadDesigner: 'Aya Tanaka',
    specialty: 'Deconstructed Kimono Overcoats & Raw Silk Tunics',
    bannerText: 'Limited Seasonal Mill Runs with Master Dye Certification',
    story: 'Sérénité Noir operates from a quiet cedar compound in Kyoto. Fabric is steeped in river water and charred pine ash to achieve non-reflective, deep obsidian tones.'
  },
  {
    id: 'solstice-studio',
    name: 'Solstice Studio',
    location: 'Le Panier, Marseille',
    tagline: 'Botanical-Dyed Resort Couture & Sculptural Raw Flax Linens',
    ethos: 'Mediterranean warmth, untreated sea-breeze linens, and sun-ripened organic dye baths.',
    accentColor: '#c27d53',
    heroImage: '/src/assets/images/partner_solstice_1793028965344.jpg',
    founded: 2017,
    leadDesigner: 'Camille Laurent',
    specialty: 'Artisanal Trench Coats & Raffia-Accented Evening Robes',
    bannerText: 'Biodynamic Flax Certified by the Mediterranean Textile Guild',
    story: 'Solstice Studio produces zero-synthetic resort apparel along the southern French coast. Every garment is dried naturally under Mediterranean sunlight for distinctive organic gradient textures.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-aurum-01',
    partnerId: 'maison-aurum',
    partnerName: 'Maison Aurum',
    title: 'Solis Gilded Silk Brocade Gown',
    category: 'Eveningwear',
    price: 6850,
    currency: 'EUR',
    image: '/src/assets/images/partner_aurum_1793028924779.jpg',
    description: 'An architectural evening gown woven with 24k gold leaf wrapped silk thread. Features a sculpted sweetheart corset and cascading draped silk taffeta train.',
    details: [
      '24-carat gold-leaf wrapped metallic silk weft',
      'Hand-boned internal silk duchesse corset',
      'Floor-sweeping structured train with horsehair hem',
      'Handcrafted in Paris atelier'
    ],
    materials: ['85% Lyon Silk Duchesse', '15% Gold Metallic Filaments'],
    sizes: ['FR 34 (US 2)', 'FR 36 (US 4)', 'FR 38 (US 6)', 'FR 40 (US 8)', 'Bespoke Custom Measurements'],
    leadTime: '3 to 5 weeks handcrafting',
    featured: true
  },
  {
    id: 'prod-aurum-02',
    partnerId: 'maison-aurum',
    partnerName: 'Maison Aurum',
    title: 'Aurelia Hand-Beaded Capelet Ensemble',
    category: 'Eveningwear',
    price: 4920,
    currency: 'EUR',
    image: '/src/assets/images/partner_aurum_1793028924779.jpg',
    description: 'A cropped opera capelet covered in over 4,000 vintage micro-beads and brushed bronze embroidery, paired with high-waisted silk crepe trousers.',
    details: [
      'Micro-beading hand-applied by Paris embroiderers',
      'Mother-of-pearl hook closure',
      'Silk chiffon lining'
    ],
    materials: ['100% Silk Crepe de Chine', 'Glass Micro-beads', 'Brass Bullion'],
    sizes: ['FR 36 (US 4)', 'FR 38 (US 6)', 'FR 40 (US 8)'],
    leadTime: '2 to 4 weeks',
    featured: false
  },
  {
    id: 'prod-veloce-01',
    partnerId: 'atelier-veloce',
    partnerName: 'Atelier Veloce',
    title: 'Brera Virgin Wool & Leather Overcoat',
    category: 'Outerwear',
    price: 3450,
    currency: 'EUR',
    image: '/src/assets/images/partner_veloce_1793028938130.jpg',
    description: 'Double-breasted structured coat tailored from 600g Tuscan virgin wool with hand-stitched nappa leather peak lapel piping and horn buttons.',
    details: [
      'Floating canvas chest construction',
      'Hand-burnished Tuscan nappa leather trims',
      'Real buffalo horn buttons',
      'Cupro breathable interior lining'
    ],
    materials: ['92% Tuscan Virgin Wool', '8% Calfskin Nappa Trim'],
    sizes: ['IT 46 (US 36)', 'IT 48 (US 38)', 'IT 50 (US 40)', 'IT 52 (US 42)', 'Bespoke Fit'],
    leadTime: '10 to 14 business days',
    featured: true
  },
  {
    id: 'prod-veloce-02',
    partnerId: 'atelier-veloce',
    partnerName: 'Atelier Veloce',
    title: 'Navigli Architectural Structured Blazer',
    category: 'Tailoring',
    price: 2650,
    currency: 'EUR',
    image: '/src/assets/images/partner_veloce_1793028938130.jpg',
    description: 'A sharp, roped-shoulder single-breasted jacket sculpted from high-twist charcoal barathea wool. Designed for effortless transitions between boardroom and gallery openings.',
    details: [
      'Milanese roped shoulder (con rollino)',
      'Hand-sewn Milanese buttonhole on lapel',
      'Interior dual passport and pen pockets'
    ],
    materials: ['100% Super 150s Barathea Wool'],
    sizes: ['IT 48 (US 38)', 'IT 50 (US 40)', 'IT 52 (US 42)'],
    leadTime: '2 weeks',
    featured: false
  },
  {
    id: 'prod-serenite-01',
    partnerId: 'serenite-noir',
    partnerName: 'Sérénité Noir',
    title: 'Wabi Draped Charcoal Raw Silk Kimono Coat',
    category: 'Artisanal Silk',
    price: 2980,
    currency: 'EUR',
    image: '/src/assets/images/partner_serenite_1793028949941.jpg',
    description: 'Asymmetric enveloping coat fashioned from raw, slubbed mulberry silk steeped in natural charcoal ash. Drapes organically around the body without fasteners.',
    details: [
      'Kyoto charcoal ash immersion dye',
      'Frayed organic selvedge hemline',
      'Modular interior tie options',
      'Zero synthetic fibers or petroleum dyes'
    ],
    materials: ['100% Handloom Mulberry Silk'],
    sizes: ['Size 1 (Loose S-M)', 'Size 2 (Relaxed L-XL)', 'Custom Drape'],
    leadTime: '14 days',
    featured: true
  },
  {
    id: 'prod-serenite-02',
    partnerId: 'serenite-noir',
    partnerName: 'Sérénité Noir',
    title: 'Kuro Raw Cashmere Deconstructed Tunic',
    category: 'Outerwear',
    price: 2150,
    currency: 'EUR',
    image: '/src/assets/images/partner_serenite_1793028949941.jpg',
    description: 'A featherlight yet exceptionally warm turtleneck tunic spun from uncombed Mongolian cashmere with raw-edge cuff details and asymmetric split vents.',
    details: [
      'Grown and harvested cruelty-free in inner Mongolia',
      'Spun on 1950s shuttle looms in Kyoto',
      'Pre-washed in mountain mineral springs'
    ],
    materials: ['100% Organic Mongolian Cashmere'],
    sizes: ['Size 1', 'Size 2', 'Size 3'],
    leadTime: '10 days',
    featured: false
  },
  {
    id: 'prod-solstice-01',
    partnerId: 'solstice-studio',
    partnerName: 'Solstice Studio',
    title: 'Calanque Terracotta Botanical Linen Trench',
    category: 'Resort',
    price: 2420,
    currency: 'EUR',
    image: '/src/assets/images/partner_solstice_1793028965344.jpg',
    description: 'An unlined summer trench tailored from heavy biodynamic French flax linen, accented with natural madder root terracotta lapel paneling and hand-plaited raffia belt.',
    details: [
      'Normandy heavy flax linen (380 gsm)',
      'Dyed with Provence madder root (Rubia tinctorum)',
      'Hand-woven raffia cinch belt with brass buckle',
      'Water-resistant natural beeswax coating'
    ],
    materials: ['90% Normandy Biodynamic Linen', '10% Madagascar Raffia'],
    sizes: ['EU 36 (US 4)', 'EU 38 (US 6)', 'EU 40 (US 8)', 'EU 42 (US 10)'],
    leadTime: '7 to 10 days',
    featured: true
  },
  {
    id: 'prod-solstice-02',
    partnerId: 'solstice-studio',
    partnerName: 'Solstice Studio',
    title: 'Roussillon Sculptural Raffia Evening Vest',
    category: 'Resort',
    price: 1840,
    currency: 'EUR',
    image: '/src/assets/images/partner_solstice_1793028965344.jpg',
    description: 'Structured longline vest featuring openwork crochet raffia side panels and hand-hammered Provence olive wood toggle buttons.',
    details: [
      'Open weave breathable summer construction',
      'Salvaged olive wood toggles',
      'Contrast ecru piping'
    ],
    materials: ['60% Organic Flax Linen', '40% Hand-Dyed Raffia'],
    sizes: ['Small', 'Medium', 'Large'],
    leadTime: '1 week',
    featured: false
  }
];

export const INITIAL_FILES: PartnerFile[] = [
  // Maison Aurum Files
  {
    id: 'file-aurum-01',
    partnerId: 'maison-aurum',
    fileName: 'MA-2026-GoldThread-TechPack-v4.pdf',
    fileType: 'techpack',
    fileSize: '14.8 MB',
    uploadedAt: '2026-10-18',
    classification: 'Confidential - Atelier Internal',
    uploadedBy: 'Elena Vance',
    notes: 'Proprietary tension parameters for weaving 24k gold leaf filigree onto silk warp. Restricted to master weavers.'
  },
  {
    id: 'file-aurum-02',
    partnerId: 'maison-aurum',
    fileName: 'MA-Haussmann-Runway-CAD-Schematics.cad',
    fileType: 'cad',
    fileSize: '32.1 MB',
    uploadedAt: '2026-10-21',
    classification: 'Tech Spec',
    uploadedBy: 'Elena Vance',
    notes: '3D structural stress simulations for crinoline support frames on Solis Brocade Gown.'
  },
  {
    id: 'file-aurum-03',
    partnerId: 'maison-aurum',
    fileName: 'MA-Lyon-Silk-Consortium-Certification.pdf',
    fileType: 'certification',
    fileSize: '3.4 MB',
    uploadedAt: '2026-09-30',
    classification: 'Material Audit',
    uploadedBy: 'Elena Vance',
    notes: 'Certified heritage silk source verification from the Rhone Valley textile registry.'
  },

  // Atelier Veloce Files
  {
    id: 'file-veloce-01',
    partnerId: 'atelier-veloce',
    fileName: 'AV-Milan-Bespoke-Barathea-PatternBook.pdf',
    fileType: 'techpack',
    fileSize: '18.2 MB',
    uploadedAt: '2026-10-12',
    classification: 'Confidential - Atelier Internal',
    uploadedBy: 'Marco Rossi',
    notes: 'Bespoke measurement matrix and shoulder-drop geometric formulas for IT 46-54 suiting.'
  },
  {
    id: 'file-veloce-02',
    partnerId: 'atelier-veloce',
    fileName: 'AV-Tuscan-Leather-Tannery-Audit-Q3.pdf',
    fileType: 'certification',
    fileSize: '5.9 MB',
    uploadedAt: '2026-10-15',
    classification: 'Material Audit',
    uploadedBy: 'Marco Rossi',
    notes: 'Pelle Conciata al Vegetale in Toscana certification and eco-tanning compliance report.'
  },

  // Sérénité Noir Files
  {
    id: 'file-serenite-01',
    partnerId: 'serenite-noir',
    fileName: 'SN-Kyoto-Botanical-Ash-Formulas.pdf',
    fileType: 'techpack',
    fileSize: '8.4 MB',
    uploadedAt: '2026-10-04',
    classification: 'Confidential - Atelier Internal',
    uploadedBy: 'Aya Tanaka',
    notes: 'Secret pH and thermal balance curves for unbleached silk immersion in pine charcoal ash.'
  },
  {
    id: 'file-serenite-02',
    partnerId: 'serenite-noir',
    fileName: 'SN-Lookbook-HighRes-GionCollection.pdf',
    fileType: 'lookbook',
    fileSize: '45.0 MB',
    uploadedAt: '2026-10-22',
    classification: 'Wholesale Tier',
    uploadedBy: 'Aya Tanaka',
    notes: 'Private lookbook for curated Tokyo and Zurich boutique buyers.'
  },

  // Solstice Studio Files
  {
    id: 'file-solstice-01',
    partnerId: 'solstice-studio',
    fileName: 'SS-Normandy-Flax-BioTrace-Contract.pdf',
    fileType: 'certification',
    fileSize: '4.1 MB',
    uploadedAt: '2026-09-15',
    classification: 'Material Audit',
    uploadedBy: 'Camille Laurent',
    notes: 'Regenerative farming certification from Normandy linen grower guild.'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-client-sophia',
    name: 'Sophia Chen',
    email: 'sophia.chen@geneva-curator.ch',
    role: 'client',
    avatar: 'SC',
    title: 'Private Haute Couture Collector (Geneva)'
  },
  {
    id: 'user-partner-aurum',
    name: 'Elena Vance',
    email: 'elena@maisonaurum.paris',
    role: 'partner',
    partnerId: 'maison-aurum',
    partnerName: 'Maison Aurum',
    avatar: 'EV',
    title: 'Creative Director & Founder (Maison Aurum)'
  },
  {
    id: 'user-partner-veloce',
    name: 'Marco Rossi',
    email: 'marco@atelierveloce.it',
    role: 'partner',
    partnerId: 'atelier-veloce',
    partnerName: 'Atelier Veloce',
    avatar: 'MR',
    title: 'Master Tailor & Partner (Atelier Veloce)'
  },
  {
    id: 'user-partner-serenite',
    name: 'Aya Tanaka',
    email: 'aya@serenitenoir.jp',
    role: 'partner',
    partnerId: 'serenite-noir',
    partnerName: 'Sérénité Noir',
    avatar: 'AT',
    title: 'Lead Designer & Atelier Lead (Sérénité Noir)'
  },
  {
    id: 'user-admin-alexander',
    name: 'Alexander Wright',
    email: 'director@ateliercollective.luxury',
    role: 'admin',
    avatar: 'AW',
    title: 'Global Platform Executive & Chief Curator'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-AURUM-8921',
    clientId: 'user-client-sophia',
    clientName: 'Sophia Chen',
    clientEmail: 'sophia.chen@geneva-curator.ch',
    partnerId: 'maison-aurum',
    partnerName: 'Maison Aurum',
    productId: 'prod-aurum-01',
    productTitle: 'Solis Gilded Silk Brocade Gown',
    productPrice: 6850,
    productImage: '/src/assets/images/partner_aurum_1793028924779.jpg',
    selectedSize: 'Bespoke Custom Measurements',
    shippingAddress: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    notes: 'Required for Geneva Red Cross Ball. Height 178cm with 9cm heels.',
    status: 'In Production',
    createdAt: '2026-10-24 14:32',
    chatThreadId: 'thread-sophia-aurum',
    confidentialLock: true
  }
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'thread-sophia-aurum',
    partnerId: 'maison-aurum',
    partnerName: 'Maison Aurum',
    clientId: 'user-client-sophia',
    clientName: 'Sophia Chen',
    clientEmail: 'sophia.chen@geneva-curator.ch',
    productId: 'prod-aurum-01',
    productTitle: 'Solis Gilded Silk Brocade Gown',
    productImage: '/src/assets/images/partner_aurum_1793028924779.jpg',
    createdAt: '2026-10-24 11:15',
    lastMessageAt: '2026-10-25 09:40',
    hasPurchase: true,
    orderId: 'ORD-AURUM-8921',
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-client-sophia',
        senderName: 'Sophia Chen',
        senderRole: 'client',
        content: 'Greetings Elena. I am reviewing the Solis Gilded Gown. Could you confirm if the 24k gold filigree remains supple across the waistline for seated gala dinners?',
        timestamp: 'Oct 24, 11:15'
      },
      {
        id: 'msg-2',
        senderId: 'user-partner-aurum',
        senderName: 'Elena Vance (Maison Aurum)',
        senderRole: 'partner',
        content: 'Chère Madame Chen, delightful to connect with you. Yes, we interweave the gold filaments over an elasticated silk warp at the diaphragm to ensure total ergonomic comfort while seated.',
        timestamp: 'Oct 24, 11:38'
      },
      {
        id: 'msg-3',
        senderId: 'system',
        senderName: 'Atelier Security Protocol',
        senderRole: 'admin',
        content: 'PURCHASE CONFIRMED: Order #ORD-AURUM-8921 placed. This communication thread is now strictly sealed between Sophia Chen and Maison Aurum. Access is quarantined from all other partner houses and accessible exclusively by Platform Admins.',
        timestamp: 'Oct 24, 14:32',
        isSystemNotice: true
      },
      {
        id: 'msg-4',
        senderId: 'user-partner-aurum',
        senderName: 'Elena Vance (Maison Aurum)',
        senderRole: 'partner',
        content: 'Merci Sophia! We have received your bespoke measurements and height specifics. Master cutter Jean-Pierre is preparing the initial muslin canvas this morning.',
        timestamp: 'Oct 25, 09:40'
      }
    ]
  },
  {
    id: 'thread-sophia-veloce',
    partnerId: 'atelier-veloce',
    partnerName: 'Atelier Veloce',
    clientId: 'user-client-sophia',
    clientName: 'Sophia Chen',
    clientEmail: 'sophia.chen@geneva-curator.ch',
    productId: 'prod-veloce-01',
    productTitle: 'Brera Virgin Wool & Leather Overcoat',
    productImage: '/src/assets/images/partner_veloce_1793028938130.jpg',
    createdAt: '2026-10-25 15:10',
    lastMessageAt: '2026-10-25 16:02',
    hasPurchase: false,
    messages: [
      {
        id: 'msg-v-1',
        senderId: 'user-client-sophia',
        senderName: 'Sophia Chen',
        senderRole: 'client',
        content: 'Good afternoon Signor Rossi. Do you recommend sizing up on the Brera overcoat if I intend to drape it over chunky cashmere knitwear?',
        timestamp: 'Oct 25, 15:10'
      },
      {
        id: 'msg-v-2',
        senderId: 'user-partner-veloce',
        senderName: 'Marco Rossi (Atelier Veloce)',
        senderRole: 'partner',
        content: 'Buonasera Signora Chen. The Brera is cut with a generous Italian armhole drop specifically calibrated for thick winter layering. Your standard size IT 46 will fit with regal grace.',
        timestamp: 'Oct 25, 16:02'
      }
    ]
  }
];

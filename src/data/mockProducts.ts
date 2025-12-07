import { Product } from '@/lib/supabase'

export const mockProducts: Product[] = [
  {
    id: 'mock-1',
    name: 'Kollagen Komplex Premium',
    price: 599,
    description: 'Högkoncentrerat kollagen med hyaluronsyra och vitamin C. Stödjer hudens elasticitet och minimerar fina linjer. 60 kapslar för 30 dagar.',
    category: 'Anti-aging',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20collagen%20supplement%20bottle%20with%20golden%20label%20elegant%20design%20luxury%20packaging%20autumn%20colors&image_size=square'
  },
  {
    id: 'mock-2',
    name: 'Niacinamide Serum 10%',
    price: 399,
    description: 'Kraftfullt serum med 10% niacinamide som minimerar porer, jämnar ut hudtonen och ger lyster. Perfekt för mogen hud. 30ml.',
    category: 'Hudvård',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Luxury%20niacinamide%20serum%20bottle%20amber%20glass%20dropper%20elegant%20minimalist%20design%20spring%20colors&image_size=square'
  },
  {
    id: 'mock-3',
    name: 'Retinol Komplex 0.5%',
    price: 499,
    description: 'Avancerad retinolformula som stimulerar cellförnyelsen, reducerar rynkor och förbättrar hudstrukturen. Kapslade för långsam frisättning.',
    category: 'Anti-aging',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20retinol%20capsules%20luxury%20packaging%20gold%20and%20white%20design%20anti-aging%20autumn%20theme&image_size=square'
  },
  {
    id: 'mock-4',
    name: 'Vitamin D3+K2 Komplex',
    price: 299,
    description: 'Högdos vitamin D3 4000 IU tillsammans med K2 för optimal upptagning. Stödjer immunförsvar, benhälsa och hormonbalans. 90 kapslar.',
    category: 'Hälsa',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Vitamin%20D3%20K2%20supplement%20bottle%20sunshine%20design%20orange%20and%20yellow%20colors%20health%20autumn%20theme&image_size=square'
  },
  {
    id: 'mock-5',
    name: 'Hyaluronsyra Intensiv',
    price: 449,
    description: 'Multi-molekylär hyaluronsyra som återfuktar på djupet, fyller ut fina linjer och ger omedelbar spänst. 50ml med pump.',
    category: 'Hudvård',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hyaluronic%20acid%20serum%20bottle%20premium%20design%20blue%20and%20silver%20elegant%20minimalist%20spring%20colors&image_size=square'
  },
  {
    id: 'mock-6',
    name: 'Adaptogen Komplex',
    price: 399,
    description: 'Blandning av ashwagandha, rodhiola och ginseng som hjälper kroppen hantera stress, balanserar hormoner och ökar energin. 60 kapslar.',
    category: 'Hälsa',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Adaptogen%20supplement%20bottle%20natural%20herbs%20design%20green%20and%20brown%20colors%20organic%20autumn%20theme&image_size=square'
  },
  {
    id: 'mock-7',
    name: 'Omega-3 EPA/DHA 2000mg',
    price: 349,
    description: 'Högdoserad omega-3 från ren fiskolja som stödjer hjärthälsa, minne och minskar inflammation. Molekylärt destillerad. 120 kapslar.',
    category: 'Hälsa',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Omega%203%20fish%20oil%20supplements%20premium%20bottle%20blue%20design%20ocean%20theme%20spring%20colors&image_size=square'
  },
  {
    id: 'mock-8',
    name: 'C-Vitamin Liposomal 1000mg',
    price: 299,
    description: 'Högupptagligt liposomalt C-vitamin som stärker immunförsvaret, skyddar cellerna och ökar kollagenproduktionen. 60 kapslar.',
    category: 'Hälsa',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Vitamin%20C%20liposomal%20supplement%20orange%20bottle%20immune%20support%20design%20fresh%20and%20clean%20autumn%20theme&image_size=square'
  }
]
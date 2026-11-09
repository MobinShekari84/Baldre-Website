export type Lang = 'fa' | 'en';

export interface BaldrCategory {
  id: number;
  slug: string;
  name_fa: string;
  name_en: string;
  subtitle_fa: string;
  subtitle_en: string;
  product_count: number;
  image_url: string;
  order: number;
}

export interface BaldrVariant {
  name_fa: string;
  name_en: string;
  sku: string;
  finish_color_fa: string;
  finish_color_en: string;
  hex: string;
  hero_image_url: string;
}

export interface BaldrProduct {
  id: number;
  slug: string;
  sku: string;
  category_slug: string;
  identity: {
    name_en: string;
    name_fa: string;
    sku: string;
    slug: string;
    category: string;
    category_fa: string;
    category_slug: string;
    designer_en: string;
    designer_fa: string;
    year: number;
    short_description_en: string;
    short_description_fa: string;
    long_description_en: string;
    long_description_fa: string;
  };
  physical_specs: {
    materials_en: string[];
    materials_fa: string[];
    finish_color_en: string;
    finish_color_fa: string;
    dimensions: {
      length_mm: number;
      width_mm: number;
      height_mm: number;
    };
    weight_kg: number;
    suspension_cable_max_mm: number;
    mounting_type_en: string;
    mounting_type_fa: string;
  };
  electrical_and_lighting: {
    light_source_en: string;
    light_source_fa: string;
    wattage_w: number;
    luminous_flux_lm: number;
    color_temperature_cct_en: string;
    color_temperature_cct_fa: string;
    color_rendering_index_cri: string;
    beam_angle_degrees: number;
    dimmability_en: string;
    dimmability_fa: string;
    input_voltage: string;
    driver_location_en: string;
    driver_location_fa: string;
  };
  compliance: {
    ip_rating: string;
    insulation_class_en: string;
    insulation_class_fa: string;
    energy_class: string;
  };
  media: {
    hero_image_url: string;
    gallery_images: string[];
    dimension_diagram_url: string;
  };
  professional_downloads: {
    data_sheet_pdf: string;
    installation_manual_pdf_fa: string;
    installation_manual_pdf_en: string;
    photometric_ies_file: string;
    cad_3d_file: string;
  };
  variants: BaldrVariant[];
}

export interface BaldrProject {
  id: number;
  slug: string;
  code: string;
  title_fa: string;
  title_en: string;
  location_fa: string;
  location_en: string;
  architect_fa: string;
  architect_en: string;
  sector_fa: string;
  sector_en: string;
  year: number;
  summary_fa: string;
  summary_en: string;
  description_fa?: string;
  description_en?: string;
  challenge_fa?: string;
  challenge_en?: string;
  solution_fa?: string;
  solution_en?: string;
  image_url: string;
  gallery_images?: string[];
  luminaires_used: string[];
  metrics_json: {
    area_sqm: number;
    cri: string;
    cct: string;
    control: string;
  };
}

export interface BaldrNews {
  id: number;
  slug: string;
  category_fa: string;
  category_en: string;
  date_fa: string;
  date_en: string;
  title_fa: string;
  title_en: string;
  excerpt_fa: string;
  excerpt_en: string;
  image_url: string;
  location_badge_fa: string;
  location_badge_en: string;
}

export interface HomepagePayload {
  brand: {
    name_en: string;
    name_fa: string;
    origin_en: string;
    origin_fa: string;
    catalog_total_count: number;
    cri_standard: string;
    warranty_years: number;
    motto_en?: string;
    motto_fa?: string;
    house_of_light_en?: string;
    house_of_light_fa?: string;
    origin_manifesto_en?: string;
    origin_manifesto_fa?: string;
    guarantee_stat_en?: string;
    guarantee_stat_fa?: string;
  };
  categories: BaldrCategory[];
  products: BaldrProduct[];
  projects: BaldrProject[];
  news: BaldrNews[];
}

export interface FlosHeroSlide {
  id: string;
  tag_fa: string;
  tag_en: string;
  title_fa: string;
  title_en: string;
  subtitle_fa: string;
  subtitle_en: string;
  designer_fa: string;
  designer_en: string;
  day_image: string;
  night_image: string;
  featured_sku: string;
}

export interface FlosCategoryCard {
  slug: string;
  filterSlug: string;
  name_fa: string;
  name_en: string;
  desc_fa: string;
  desc_en: string;
  count: number;
  image_url: string;
}

export interface FlosRoomSpace {
  id: string;
  name_fa: string;
  name_en: string;
  caption_fa: string;
  caption_en: string;
  description_fa: string;
  description_en: string;
  image_url: string;
  featured_skus: string[];
}

export const FLOS_HERO_SLIDES: FlosHeroSlide[] = [
  {
    id: 'slide-01',
    tag_fa: 'کالکشن ۲۰۲۶',
    tag_en: '2026 COLLECTION',
    title_fa: 'تندیس‌های نور در معماری',
    title_en: 'Sculpting Space With Light',
    subtitle_fa: 'هم‌نشینی برنج، مرمر و شیشه اپال در روشنایی روز و آرامش شب.',
    subtitle_en: 'Brushed brass, honed marble, and opal glass in daylight and dusk.',
    designer_fa: 'استودیو بالدر',
    designer_en: 'Baldr Studio',
    day_image: '/images/flos-hero-daylight.webp',
    night_image: '/images/hero-architectural-lighting.webp',
    featured_sku: 'BAL-VEC-SUS-01',
  },
];

export const FLOS_CATEGORY_STRIP: FlosCategoryCard[] = [
  {
    slug: 'pendant-strip',
    filterSlug: 'pendant',
    name_fa: 'چراغ‌های آویز و خطی',
    name_en: 'Pendant & Linear',
    desc_fa: 'خطوط نوری معلق با اپتیک ضد خیرگی (UGR <16).',
    desc_en: 'Weightless suspended lines with glare-free optics.',
    count: 86,
    image_url: '/images/baldr-wide-pendant.webp',
  },
  {
    slug: 'table-strip',
    filterSlug: 'sculptural',
    name_fa: 'چراغ‌های رومیزی',
    name_en: 'Table Lamps',
    desc_fa: 'ترکیب شیشه اپال دست‌ساز و برنج تراش‌خورده.',
    desc_en: 'Hand-blown opal glass and machined brass.',
    count: 42,
    image_url: '/images/baldr-wide-table.webp',
  },
  {
    slug: 'floor-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های ایستاده',
    name_en: 'Floor Lamps',
    desc_fa: 'تندیس‌های ایستاده با پایه سنگ مرمر طبیعی.',
    desc_en: 'Monolithic floor luminaires anchored in marble.',
    count: 34,
    image_url: '/images/baldr-wide-floor.webp',
  },
  {
    slug: 'wall-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های دیواری',
    name_en: 'Wall Lamps',
    desc_fa: 'نورپردازی غیرمستقیم و بازوهای متحرک معماری.',
    desc_en: 'Indirect wall washers and kinetic swing arms.',
    count: 48,
    image_url: '/images/baldr-wide-wall.webp',
  },
  {
    slug: 'ceiling-strip',
    filterSlug: 'magnetic',
    name_fa: 'سقفی و مگنتی ۴۸ ولت',
    name_en: 'Ceiling & 48V Track',
    desc_fa: 'سیستم‌های ماژولار ۴۸ ولت با کنترل هوشمند DALI-2.',
    desc_en: 'Modular 48V low-voltage tracks with DALI-2 control.',
    count: 64,
    image_url: '/images/baldr-wide-systems.webp',
  },
  {
    slug: 'portable-strip',
    filterSlug: 'outdoor',
    name_fa: 'پرتابل و فضای باز',
    name_en: 'Portable & Outdoor',
    desc_fa: 'چراغ‌های مقاوم IP65 ویژه تراس و محوطه.',
    desc_en: 'Weather-sealed IP65 luminaires for landscapes.',
    count: 38,
    image_url: '/images/baldr-wide-outdoor.webp',
  },
];

export const FLOS_ROOMS: FlosRoomSpace[] = [
  {
    id: 'dining',
    name_fa: 'ناهارخوری',
    name_en: 'Dining',
    caption_fa: 'تمرکز نور گرم بر محور فضا',
    caption_en: 'Warm downward light anchoring the table',
    description_fa: 'آویزهای خطی با نمود رنگ CRI >95 و بدون خیرگی.',
    description_en: 'Glare-free suspended optics with CRI >95 clarity.',
    image_url: '/images/flos-room-dining.webp',
    featured_skus: ['BAL-LS-01-BRS', 'BAL-SC-08-SKG'],
  },
  {
    id: 'living',
    name_fa: 'نشیمن',
    name_en: 'Living',
    caption_fa: 'لایه‌بندی نور غیرمستقیم',
    caption_en: 'Layered indirect architectural ambiance',
    description_fa: 'ترکیب نور محیطی نرم و چراغ‌های بازویی متحرک.',
    description_en: 'Soft indirect diffusers paired with kinetic wall arms.',
    image_url: '/images/flos-room-living.webp',
    featured_skus: ['BAL-TB-09-SLV', 'BAL-WL-265-BLK'],
  },
  {
    id: 'bedroom',
    name_fa: 'اتاق خواب',
    name_en: 'Bedroom',
    caption_fa: 'آرامش نوری ۲۷۰۰ کلوین',
    caption_en: 'Serene 2700K opal glass glow',
    description_fa: 'گوی‌های شیشه‌ای اپال با دیمر ملایم شبانه.',
    description_en: 'Mouth-blown opal spheres with warm dimming.',
    image_url: '/images/flos-room-bedroom.webp',
    featured_skus: ['BAL-FL-04-MRB', 'BAL-MG-48-WHT'],
  },
];

export const FALLBACK_HOMEPAGE_DATA: HomepagePayload = {
  brand: {
    name_en: 'BALDR',
    name_fa: 'بالدر',
    origin_en: 'Tehran Architectural Lighting Studio',
    origin_fa: 'استودیو طراحی و مهندسی روشنایی معماری تهران',
    catalog_total_count: 284,
    cri_standard: 'CRI >95',
    warranty_years: 5,
    motto_en: 'Where light lives',
    motto_fa: 'جایی که نور زندگی می‌کند',
    house_of_light_en: 'Baldr — House of Light',
    house_of_light_fa: 'بالدر — خانه نور',
    origin_manifesto_en: 'Origin of the future',
    origin_manifesto_fa: 'خاستگاه آینده',
    guarantee_stat_en: '5 Years Guarantee (1,825 Days / 43,800 Hours)',
    guarantee_stat_fa: '۵ سال گارانتی رسمی تعویض (۱,۸۲۵ روز / ۴۳,۸۰۰ ساعت)',
  },
  categories: [
    {
      id: 1,
      slug: 'pendant',
      name_fa: 'چراغ‌های آویز و خطی',
      name_en: 'Pendant & Linear',
      subtitle_fa: 'خطوط خالص نور معلق در فضا با خیرگی صفر (UGR <16)',
      subtitle_en: 'Weightless suspended lines of glare-free architectural light',
      product_count: 86,
      image_url: '/images/baldr-wide-pendant.webp',
      order: 1,
    },
    {
      id: 2,
      slug: 'magnetic',
      name_fa: 'سقفی و مگنتی ۴۸ ولت',
      name_en: 'Ceiling & 48V Magnetic',
      subtitle_fa: 'معماری ماژولار با لنزهای دقیق اپتیکال و کنترل هوشمند DALI',
      subtitle_en: 'Modular 48V low-voltage precision optics with DALI-2 control',
      product_count: 64,
      image_url: '/images/baldr-wide-systems.webp',
      order: 2,
    },
    {
      id: 3,
      slug: 'sculptural',
      name_fa: 'چراغ‌های رومیزی و دکوراتیو',
      name_en: 'Table & Sculptural Glass',
      subtitle_fa: 'ترکیب شیشه دمیده‌شده و برنز تراش‌خورده با گرمای ۲۷۰۰ کلوین',
      subtitle_en: 'Artisanal blown glass & machined bronze statement pieces',
      product_count: 42,
      image_url: '/images/baldr-wide-table.webp',
      order: 3,
    },
    {
      id: 4,
      slug: 'wall-floor',
      name_fa: 'چراغ‌های ایستاده و دیواری',
      name_en: 'Floor & Wall Luminaires',
      subtitle_fa: 'تراش‌های سنگ مرمر، آلباستر و آلومینیوم آنودایز شده با نور غیرمستقیم',
      subtitle_en: 'Carrara marble, alabaster & anodized aluminum indirect luminaires',
      product_count: 54,
      image_url: '/images/baldr-wide-floor.webp',
      order: 4,
    },
    {
      id: 5,
      slug: 'outdoor',
      name_fa: 'پرتابل و فضای باز (IP65)',
      name_en: 'Portable & Outdoor (IP65)',
      subtitle_fa: 'چراغ‌های پرتابل شارژی و بولاردهای مقاوم در برابر اقلیم',
      subtitle_en: 'Architectural portable lamps & weather-sealed landscape bollards',
      product_count: 38,
      image_url: '/images/baldr-wide-outdoor.webp',
      order: 5,
    },
  ],
  products: [
    {
      id: 1,
      slug: 'vector-linear-suspension',
      sku: 'BAL-VEC-SUS-01',
      category_slug: 'pendant',
      identity: {
        name_en: 'Vector Linear Suspension',
        name_fa: 'چراغ آویز خطی وکتور',
        sku: 'BAL-VEC-SUS-01',
        slug: 'vector-linear-suspension',
        category: 'Pendant & Linear',
        category_fa: 'چراغ‌های آویز و خطی',
        category_slug: 'pendant',
        designer_en: 'Baldr Architectural Studio',
        designer_fa: 'استودیو معماری بالدر',
        year: 2026,
        short_description_en: 'Architectural linear suspension fixture delivering uniform, glare-free downward illumination with precision micro-prismatic optics.',
        short_description_fa: 'چراغ آویز خطی معماری با پخش نور یکنواخت و ضد خیرگی کامل (UGR <16) برای فضاهای اداری مدرن، سالن‌های کنفرانس و میزهای ناهارخوری.',
        long_description_en: 'Engineered from precision-extruded architectural aluminum, the Vector Linear Suspension represents the purest expression of form following function. Its ultra-slim profile and recessed optical chamber eliminate all visible glare while maintaining class-leading luminous efficacy.',
        long_description_fa: 'طراحی‌شده با اکستروژن دقیق آلومینیوم معماری، چراغ آویز وکتور نهایت خلوص فرم در خدمت نور را به نمایش می‌گذارد. ضخامت بسیار کم و محفظه اپتیکال مقعر، هرگونه خیرگی مستقیم را مهار کرده و جلوه‌ای سبک و معلق به فضا می‌بخشد.',
      },
      physical_specs: {
        materials_en: ['Extruded Aluminum 6063-T6', 'Optical Micro-Prismatic PMMA', 'Braided Steel Cables'],
        materials_fa: ['آلومینیوم اکسترود 6063-T6', 'دیفیوزر میکروپریزماتیک اپتیکال', 'کابل‌های معلق فولادی بافته‌شده'],
        finish_color_en: 'Anodized Champagne Brass',
        finish_color_fa: 'برنج شامپاینی آنودایز شده',
        dimensions: { length_mm: 1200, width_mm: 35, height_mm: 40 },
        weight_kg: 2.5,
        suspension_cable_max_mm: 2000,
        mounting_type_en: 'Suspended Architectural Canopy',
        mounting_type_fa: 'نصب آویز با رزت سقفی یکپارچه',
      },
      electrical_and_lighting: {
        light_source_en: 'Linear LED Array (Nichia)',
        light_source_fa: 'ماژول خطی ال‌ای‌دی ژاپنی (Nichia)',
        wattage_w: 36,
        luminous_flux_lm: 3200,
        color_temperature_cct_en: '3000K Warm White',
        color_temperature_cct_fa: '3000K سفید گرم',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 90,
        dimmability_en: 'DALI-2 / Push Dim / 1-10V',
        dimmability_fa: 'دالی ۲ / پوش دیم / کنترل ۱-۱۰ ولت',
        input_voltage: '220-240V AC 50/60Hz',
        driver_location_en: 'Integrated in Ceiling Canopy',
        driver_location_fa: 'تعبیه‌شده داخل رزت سقفی',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class I',
        insulation_class_fa: 'کلاس یک (Class I)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-pendant-studio.webp',
        gallery_images: [
          '/images/baldr-prod-pendant-arch.webp',
          '/images/baldr-wide-pendant.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'برنج شامپاینی',
          name_en: 'Champagne Brass',
          sku: 'BAL-VEC-SUS-01-BRS',
          finish_color_fa: 'شامپاینی برس‌خورده',
          finish_color_en: 'Brushed Champagne',
          hex: '#C5A059',
          hero_image_url: '/images/baldr-prod-pendant-studio.webp',
        },
        {
          name_fa: 'مشکی مات پودری',
          name_en: 'Matte Black',
          sku: 'BAL-VEC-SUS-01-BLK',
          finish_color_fa: 'مشکی بافت‌دار',
          finish_color_en: 'Textured Black',
          hex: '#1A1A1A',
          hero_image_url: '/images/baldr-prod-pendant-studio.webp',
        },
        {
          name_fa: 'سفید مات گچی',
          name_en: 'Pure White',
          sku: 'BAL-VEC-SUS-01-WHT',
          finish_color_fa: 'سفید مات پودری',
          finish_color_en: 'Powder White',
          hex: '#F2F2F0',
          hero_image_url: '/images/baldr-prod-pendant-studio.webp',
        },
      ],
    },
    {
      id: 2,
      slug: 'vector-r-recessed-downlight',
      sku: 'BAL-VEC-REC-02',
      category_slug: 'magnetic',
      identity: {
        name_en: 'Vector R Recessed Downlight',
        name_fa: 'چراغ سقفی توکار وکتور R',
        sku: 'BAL-VEC-REC-02',
        slug: 'vector-r-recessed-downlight',
        category: 'Ceiling & 48V Magnetic',
        category_fa: 'سقفی و مگنتی ۴۸ ولت',
        category_slug: 'magnetic',
        designer_en: 'Baldr Technical Optics',
        designer_fa: 'بخش اپتیک فنی بالدر',
        year: 2026,
        short_description_en: 'Precision deep recessed downlight with zero glare and dark light technology for museums, galleries, and high-end residences.',
        short_description_fa: 'چراغ توکار مقعر با فناوری دارک لایت (Dark Light) و خیرگی نامحسوس، ایده‌آل برای گالری‌ها، موزه‌ها و فضاهای لوکس مسکونی.',
        long_description_en: 'Featuring high-purity aluminum faceted reflectors and deep-set COB chip architecture, Vector R casts an impeccably controlled cone of architectural light without ever exposing the source to the eye.',
        long_description_fa: 'مجهز به رفلکتورهای چندوجهی با خلوص بالا و معماری چیپ COB در عمق فریم، وکتور R مخروطی از نور خالص را با کنترل شدید تابش بدون ایجاد هرگونه زنندگی به فضا می‌تاباند.',
      },
      physical_specs: {
        materials_en: ['Die-cast Aluminum ADC12', 'Specular Faceted Facet Reflector', 'Thermal Heatsink'],
        materials_fa: ['آلومینیوم دایکست ADC12', 'رفلکتور فاست متالایز براق', 'هیت‌سینک آلومینیومی فورج سرد'],
        finish_color_en: 'Matte Black Baffle & White Flange',
        finish_color_fa: 'بافل داخلی مشکی مات و فریم سفید',
        dimensions: { length_mm: 95, width_mm: 95, height_mm: 85 },
        weight_kg: 0.65,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'Ceiling Recessed (Trim / Trimless)',
        mounting_type_fa: 'توکار سقفی (با لبه یا بدون لبه گچی)',
      },
      electrical_and_lighting: {
        light_source_en: 'Bridgelux V-Series COB LED',
        light_source_fa: 'ال‌ای‌دی بریج‌لوکس نسل جدید (Bridgelux COB)',
        wattage_w: 15,
        luminous_flux_lm: 1450,
        color_temperature_cct_en: '3000K Warm White',
        color_temperature_cct_fa: '3000K سفید گرم',
        color_rendering_index_cri: '>97',
        beam_angle_degrees: 36,
        dimmability_en: 'DALI-2 / Phase Dim',
        dimmability_fa: 'دالی ۲ / دیم فازی تری‌اک',
        input_voltage: '220-240V AC',
        driver_location_en: 'Remote SELV Driver Included',
        driver_location_fa: 'درایور مجزای SELV داخل سقف کاذب',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class II',
        insulation_class_fa: 'کلاس دو (Class II)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-ceiling-studio.webp',
        gallery_images: [
          '/images/baldr-prod-ceiling-arch.webp',
          '/images/baldr-wide-ceiling.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-r-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مشکی عمیق ضد خیرگی',
          name_en: 'Deep Matte Black',
          sku: 'BAL-VEC-REC-02-BLK',
          finish_color_fa: 'مشکی مات',
          finish_color_en: 'Matte Black',
          hex: '#111111',
          hero_image_url: '/images/baldr-prod-ceiling-studio.webp',
        },
        {
          name_fa: 'سفید مات یکپارچه',
          name_en: 'Matte White',
          sku: 'BAL-VEC-REC-02-WHT',
          finish_color_fa: 'سفید مات',
          finish_color_en: 'Matte White',
          hex: '#F5F5F3',
          hero_image_url: '/images/baldr-prod-ceiling-studio.webp',
        },
      ],
    },
    {
      id: 3,
      slug: 'vector-sm-surface-mounted',
      sku: 'BAL-VEC-SM-03',
      category_slug: 'magnetic',
      identity: {
        name_en: 'Vector SM Surface Mounted',
        name_fa: 'چراغ خطی روکار وکتور SM',
        sku: 'BAL-VEC-SM-03',
        slug: 'vector-sm-surface-mounted',
        category: 'Ceiling & 48V Magnetic',
        category_fa: 'سقفی و مگنتی ۴۸ ولت',
        category_slug: 'magnetic',
        designer_en: 'Baldr Design Studio',
        designer_fa: 'استودیو طراحی بالدر',
        year: 2026,
        short_description_en: 'Direct surface-mounted architectural luminaire with high lumen package and continuous seamless light output.',
        short_description_fa: 'چراغ خطی روکار معماری با توان نوری بالا و اتصال پیوسته بدون درز جهت فضاهای تجاری، دفاتر مدرن و کریدورها.',
        long_description_en: 'Crafted for spaces without accessible ceiling plenums, Vector SM installs directly onto concrete or solid substrates while maintaining the ultra-refined architectural visual language of the Vector family.',
        long_description_fa: 'طراحی‌شده برای فضاهای با سقف بتنی یا فاقد سقف کاذب، وکتور SM مستقیماً بر روی سطوح سازه‌ای نصب شده و در عین حال زبان بصری تمیز و مینیمال بالدر را حفظ می‌کند.',
      },
      physical_specs: {
        materials_en: ['Extruded Aluminum Profile', 'Opal Satin Diffuser', 'Die-cast Endcaps'],
        materials_fa: ['پروفیل آلومینیوم آنودایز', 'دیفیوزر ساتن اپال', 'درپوش‌های آلومینیوم دایکست'],
        finish_color_en: 'Matte Black & White',
        finish_color_fa: 'مشکی و سفید مات پودری',
        dimensions: { length_mm: 1500, width_mm: 46, height_mm: 67 },
        weight_kg: 2.8,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'Direct Ceiling Surface Mounted',
        mounting_type_fa: 'نصب روکار مستقیم به سقف',
      },
      electrical_and_lighting: {
        light_source_en: 'High-Density LED Board',
        light_source_fa: 'برد پرقدرت ال‌ای‌دی سامسونگ (Samsung LED)',
        wattage_w: 42,
        luminous_flux_lm: 3800,
        color_temperature_cct_en: '3000K Warm White',
        color_temperature_cct_fa: '3000K سفید گرم',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 90,
        dimmability_en: 'DALI-2 / Push Dim',
        dimmability_fa: 'دالی ۲ / پوش دیم',
        input_voltage: '220-240V AC',
        driver_location_en: 'Internal Electronic Driver',
        driver_location_fa: 'درایور الکترونیکی تعبیه‌شده داخل بدنه',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class I',
        insulation_class_fa: 'کلاس یک (Class I)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-surface-studio.webp',
        gallery_images: [
          '/images/baldr-prod-surface-arch.webp',
          '/images/baldr-wide-surface.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مشکی مات آنودایز',
          name_en: 'Anodized Black',
          sku: 'BAL-VEC-SM-03-BLK',
          finish_color_fa: 'مشکی مات',
          finish_color_en: 'Anodized Black',
          hex: '#181818',
          hero_image_url: '/images/baldr-prod-surface-studio.webp',
        },
        {
          name_fa: 'سفید آلباستر',
          name_en: 'Alabaster White',
          sku: 'BAL-VEC-SM-03-WHT',
          finish_color_fa: 'سفید مات',
          finish_color_en: 'Alabaster White',
          hex: '#F8F8F6',
          hero_image_url: '/images/baldr-prod-surface-studio.webp',
        },
      ],
    },
    {
      id: 4,
      slug: 'tracking-magnet-48v-system',
      sku: 'BAL-TRK-MAG-04',
      category_slug: 'magnetic',
      identity: {
        name_en: 'Tracking Magnet 48V Architectural Track',
        name_fa: 'سیستم مگنتی هوشمند ۴۸ ولت بالدر',
        sku: 'BAL-TRK-MAG-04',
        slug: 'tracking-magnet-48v-system',
        category: 'Ceiling & 48V Magnetic',
        category_fa: 'سقفی و مگنتی ۴۸ ولت',
        category_slug: 'magnetic',
        designer_en: 'Baldr Engineering Labs',
        designer_fa: 'آزمایشگاه مهندسی بالدر',
        year: 2026,
        short_description_en: 'Ultra-thin 48V low-voltage magnetic track system with tool-less luminaire insertion and independent DALI-2 addressing.',
        short_description_fa: 'سیستم ریل مگنتی ولتاژ پایین ۴۸ ولت با جابجایی آهنربایی بدون ابزار و کنترل هوشمند مستقل برای هر اسپات نوری.',
        long_description_en: 'The Tracking Magnet system allows architects and lighting designers to sculpt dynamic light environments with unmatched flexibility. Spotlights, linear diffusers, and pendant elements click mechanically and magnetically into place along the continuous 48V bus.',
        long_description_fa: 'سیستم ترکینگ مگنت به معماران و طراحان اجازه می‌دهد تا سناریوهای نوری متغیر و انعطاف‌پذیر خلق کنند. چراغ‌های نقطه‌ای، خطی و آویز تنها با یک کلیک مکانیکی-مغناطیسی در ریل قرار می‌گیرند.',
      },
      physical_specs: {
        materials_en: ['Extruded Structural Aluminum', 'Copper 48V Busbars', 'Neodymium Magnets'],
        materials_fa: ['آلومینیوم سازه‌ای اکسترود', 'باس‌بارهای مسی ۴۸ ولت', 'آهنرباهای نئودیمیوم پرقدرت'],
        finish_color_en: 'Deep Carbon Black',
        finish_color_fa: 'مشکی کربن بافت‌دار',
        dimensions: { length_mm: 2000, width_mm: 30, height_mm: 45 },
        weight_kg: 3.2,
        suspension_cable_max_mm: 2500,
        mounting_type_en: 'Recessed / Surface / Suspended',
        mounting_type_fa: 'توکار، روکار و آویز معلق',
      },
      electrical_and_lighting: {
        light_source_en: 'Modular 48V LED Inserts',
        light_source_fa: 'ماژول‌های مجزای ۴۸ ولت ال‌ای‌دی',
        wattage_w: 48,
        luminous_flux_lm: 4100,
        color_temperature_cct_en: '3000K Warm White (Tunable 2700-5000K)',
        color_temperature_cct_fa: '3000K سفید گرم (تیونبل سفید)',
        color_rendering_index_cri: '>97',
        beam_angle_degrees: 30,
        dimmability_en: 'DALI-2 / Casambi BLE',
        dimmability_fa: 'دالی ۲ / بلوتوث کزامبی (Casambi)',
        input_voltage: '48V DC Low Voltage',
        driver_location_en: 'Remote 48V Constant Voltage Power Supply',
        driver_location_fa: 'منبع تغذیه مجزای ۴۸ ولت در تابلو یا سقف کاذب',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class III (SELV)',
        insulation_class_fa: 'کلاس سه فوق‌ایمن (SELV)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-systems-studio.webp',
        gallery_images: [
          '/images/baldr-prod-systems-arch.webp',
          '/images/baldr-wide-systems.webp',
          '/images/baldr-inspiration-magnet-system.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-r-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مشکی کربن معماری',
          name_en: 'Carbon Black',
          sku: 'BAL-TRK-MAG-04-BLK',
          finish_color_fa: 'مشکی کربن',
          finish_color_en: 'Carbon Black',
          hex: '#141414',
          hero_image_url: '/images/baldr-prod-systems-studio.webp',
        },
        {
          name_fa: 'سفید پیور گالری',
          name_en: 'Pure White',
          sku: 'BAL-TRK-MAG-04-WHT',
          finish_color_fa: 'سفید خالص',
          finish_color_en: 'Pure White',
          hex: '#F9F9F8',
          hero_image_url: '/images/baldr-prod-systems-studio.webp',
        },
      ],
    },
    {
      id: 5,
      slug: 'aurelia-sculptural-table-lamp',
      sku: 'BAL-AUR-TAB-05',
      category_slug: 'sculptural',
      identity: {
        name_en: 'Aurelia Sculptural Table Luminaire',
        name_fa: 'چراغ رومیزی تندیس‌گون آرلیا',
        sku: 'BAL-AUR-TAB-05',
        slug: 'aurelia-sculptural-table-lamp',
        category: 'Table & Sculptural Glass',
        category_fa: 'چراغ‌های رومیزی و دکوراتیو',
        category_slug: 'sculptural',
        designer_en: 'Baldr Artisanal Foundry',
        designer_fa: 'کارگاه طراحی هنری بالدر',
        year: 2026,
        short_description_en: 'Sculptural table luminaire marrying hand-blown Venetian opal glass with a solid machined brushed bronze pedestal.',
        short_description_fa: 'چراغ رومیزی تندیس‌گون حاصل پیوند شیشه اوپال دمیده‌شده دستی و پایه سنگین برنز تراش‌خورده با دیمر لمسی.',
        long_description_en: 'A poetic balance of gravitational mass and ethereal light. Aurelia casts a soft, enveloping 2700K ambient radiance that transforms credenzas, reading alcoves, and bedside settings.',
        long_description_fa: 'تعادلی شاعرانه از جرم فیزیکی و لطافت نور. آرلیا هاله‌ای گرم با دمای ۲۷۰۰ کلوین می‌تاباند که فضای میزهای مطالعه، کتابخانه‌ها و اتاق‌های خواب لوکس را دگرگون می‌سازد.',
      },
      physical_specs: {
        materials_en: ['Solid Machined Brass', 'Hand-Blown Triplex Opal Glass', 'Braided Textile Cord'],
        materials_fa: ['برنج سنگین تراش‌خورده', 'شیشه اوپال سه لایه دمیده‌شده دست‌ساز', 'کابل پارچه‌ای بافته‌شده'],
        finish_color_en: 'Natural Brushed Brass',
        finish_color_fa: 'برنج طبیعی برس‌خورده',
        dimensions: { length_mm: 260, width_mm: 260, height_mm: 340 },
        weight_kg: 3.8,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'Tabletop Freestanding',
        mounting_type_fa: 'رومیزی مستقل با کفی ضد لغزش',
      },
      electrical_and_lighting: {
        light_source_en: 'Warm Dim LED Core (2700K - 1800K)',
        light_source_fa: 'ال‌ای‌دی وارم دیم (Warm-Dim 2700K - 1800K)',
        wattage_w: 12,
        luminous_flux_lm: 950,
        color_temperature_cct_en: '2700K Warm Ambient',
        color_temperature_cct_fa: '2700K نور گرم آرامش‌بخش',
        color_rendering_index_cri: '>96',
        beam_angle_degrees: 360,
        dimmability_en: 'Integrated Stepless Touch Dimmer',
        dimmability_fa: 'دیمر لمسی یکپارچه بدون پله',
        input_voltage: '100-240V AC 50/60Hz',
        driver_location_en: 'Internal Miniature Driver',
        driver_location_fa: 'درایور مینیاتوری تعبیه‌شده در پایه برنجی',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class II',
        insulation_class_fa: 'کلاس دو (Class II)',
        energy_class: 'A+',
      },
      media: {
        hero_image_url: '/images/baldr-prod-table-studio.webp',
        gallery_images: [
          '/images/baldr-prod-table-arch.webp',
          '/images/baldr-wide-table.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'برنج طبیعی با شیشه اوپال',
          name_en: 'Brushed Brass & Opal',
          sku: 'BAL-AUR-TAB-05-BRS',
          finish_color_fa: 'برنج برس‌خورده',
          finish_color_en: 'Brushed Brass',
          hex: '#C5A059',
          hero_image_url: '/images/baldr-prod-table-studio.webp',
        },
        {
          name_fa: 'برنز اکسیدشده دودی',
          name_en: 'Oxidized Bronze & Smoked Glass',
          sku: 'BAL-AUR-TAB-05-BRZ',
          finish_color_fa: 'برنز تیره',
          finish_color_en: 'Oxidized Bronze',
          hex: '#3D3126',
          hero_image_url: '/images/baldr-prod-table-studio.webp',
        },
      ],
    },
    {
      id: 6,
      slug: 'monolith-architectural-floor-lamp',
      sku: 'BAL-MON-FLR-06',
      category_slug: 'wall-floor',
      identity: {
        name_en: 'Monolith Architectural Floor Luminaire',
        name_fa: 'چراغ ایستاده تندیس‌گون مونولیت',
        sku: 'BAL-MON-FLR-06',
        slug: 'monolith-architectural-floor-lamp',
        category: 'Floor & Wall Luminaires',
        category_fa: 'چراغ‌های ایستاده و دیواری',
        category_slug: 'wall-floor',
        designer_en: 'Baldr Stone & Metal Lab',
        designer_fa: 'لابراتوار سنگ و فلز بالدر',
        year: 2026,
        short_description_en: 'A monolithic pillar of solid Iranian travertine stone and slender anodized aluminum, casting warm indirect upward light.',
        short_description_fa: 'ستون تندیس‌گون تراش‌خورده از سنگ تراورتن طبیعی ایران و بازوی آلومینیومی، بازتاب‌دهنده نور غیرمستقیم سقف.',
        long_description_en: 'Grounding spaces with quiet mineral strength, Monolith is a celebration of authentic Iranian stones. Its upward indirect light bounces naturally from ceilings without requiring any visible fixtures overhead.',
        long_description_fa: 'مونولیت تجلی قدرت باوقار سنگ‌های طبیعی ایران است. بازتاب نرم و بدون خیرگی نور غیرمستقیم از سقف، ارتفاع بصری فضا را افزایش داده و بدون نیاز به چراغ‌های متعدد سقفی، روشنایی کامل ایجاد می‌کند.',
      },
      physical_specs: {
        materials_en: ['Honed Persian Travertine Stone', 'Anodized Champagne Aluminum', 'Optical Reflector'],
        materials_fa: ['سنگ تراورتن طبیعی مات', 'آلومینیوم آنودایز شامپاینی', 'رفلکتور اپتیکال مقعر'],
        finish_color_en: 'Natural Warm Travertine & Champagne',
        finish_color_fa: 'تراورتن گرم طبیعی و شامپاینی',
        dimensions: { length_mm: 280, width_mm: 280, height_mm: 1750 },
        weight_kg: 14.5,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'Freestanding Architectural Floor Lamp',
        mounting_type_fa: 'ایستاده زمینی با پایه تعادلی سنگین',
      },
      electrical_and_lighting: {
        light_source_en: 'High-Power Uplight LED Engine',
        light_source_fa: 'موتور ال‌ای‌دی آپ‌لایت پرقدرت بریج‌لوکس',
        wattage_w: 30,
        luminous_flux_lm: 2600,
        color_temperature_cct_en: '2700K Warm Ambient',
        color_temperature_cct_fa: '2700K نور گرم غیرمستقیم',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 110,
        dimmability_en: 'Foot Pedal Slider + Casambi Wireless',
        dimmability_fa: 'دیمر پدالی خطی + کنترل بی‌سیم Casambi',
        input_voltage: '220-240V AC',
        driver_location_en: 'Concealed in Travertine Base',
        driver_location_fa: 'تعبیه‌شده داخل پایه سنگی تراورتن',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class I',
        insulation_class_fa: 'کلاس یک (Class I)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-floor-studio.webp',
        gallery_images: [
          '/images/baldr-prod-floor-arch.webp',
          '/images/baldr-wide-floor.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'سنگ تراورتن گرم و شامپاینی',
          name_en: 'Warm Travertine & Champagne',
          sku: 'BAL-MON-FLR-06-TRV',
          finish_color_fa: 'تراورتن طبیعی',
          finish_color_en: 'Warm Travertine',
          hex: '#D1C7B7',
          hero_image_url: '/images/baldr-prod-floor-studio.webp',
        },
        {
          name_fa: 'سنگ مرمریت مشکی نجف‌آباد',
          name_en: 'Nero Black Marble',
          sku: 'BAL-MON-FLR-06-MRB',
          finish_color_fa: 'مرمر سیاه با رگه‌های سفید',
          finish_color_en: 'Nero Black Marble',
          hex: '#1E1E1E',
          hero_image_url: '/images/baldr-prod-floor-studio.webp',
        },
      ],
    },
    {
      id: 7,
      slug: 'eclipse-architectural-wall-sconce',
      sku: 'BAL-ECL-WAL-07',
      category_slug: 'wall-floor',
      identity: {
        name_en: 'Eclipse Indirect Architectural Wall Sconce',
        name_fa: 'چراغ دیواری نور غیرمستقیم اکلیپس',
        sku: 'BAL-ECL-WAL-07',
        slug: 'eclipse-architectural-wall-sconce',
        category: 'Floor & Wall Luminaires',
        category_fa: 'چراغ‌های ایستاده و دیواری',
        category_slug: 'wall-floor',
        designer_en: 'Baldr Architectural Studio',
        designer_fa: 'استودیو معماری بالدر',
        year: 2026,
        short_description_en: 'Circular architectural wall luminaire casting a halo of soft, warm indirect light against vertical surfaces.',
        short_description_fa: 'چراغ دیواری دایره‌ای با هاله‌ای از نور گرم غیرمستقیم بر روی بافت دیوارها برای راهروها، لابی‌ها و مستر روم‌ها.',
        long_description_en: 'Inspired by lunar occultations, Eclipse hides its high-efficiency light engine behind a minimal floating disk, transforming the wall itself into the primary luminous element.',
        long_description_fa: 'الهام‌گرفته از خسوف ماه، اکلیپس منبع نوری با بازده بالا را در پشت دیسکی معلق پنهان کرده و خود سطح دیوار را به بوم اصلی نور تبدیل می‌کند.',
      },
      physical_specs: {
        materials_en: ['Curved Spun Aluminum', 'Alabaster Core Diffuser', 'Mounting Bracket'],
        materials_fa: ['آلومینیوم اسپانینگ منحنی', 'صفحه نیمه‌شفاف آلباستر', 'براکت نصب مخفی دیواری'],
        finish_color_en: 'Matte Deep Charcoal',
        finish_color_fa: 'زغالی مات عمیق',
        dimensions: { length_mm: 320, width_mm: 320, height_mm: 48 },
        weight_kg: 2.1,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'Concealed Wall Mounting',
        mounting_type_fa: 'نصب مخفی دیواری بدون پیچ نمایان',
      },
      electrical_and_lighting: {
        light_source_en: 'Circular Perimeter LED Board',
        light_source_fa: 'ماژول ال‌ای‌دی محیطی دورتا دور',
        wattage_w: 18,
        luminous_flux_lm: 1600,
        color_temperature_cct_en: '2700K Warm White',
        color_temperature_cct_fa: '2700K سفید گرم',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 140,
        dimmability_en: 'Phase Dim (Triac) / DALI-2',
        dimmability_fa: 'دیم فازی تری‌اک / دالی ۲',
        input_voltage: '220-240V AC',
        driver_location_en: 'Integrated in Wall Rose Base',
        driver_location_fa: 'تعبیه‌شده در کاسه پشت چراغ',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_en: 'Class I',
        insulation_class_fa: 'کلاس یک (Class I)',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/baldr-prod-wall-studio.webp',
        gallery_images: [
          '/images/baldr-prod-wall-arch.webp',
          '/images/baldr-wide-wall.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مشکی زغالی بافت‌دار',
          name_en: 'Textured Charcoal',
          sku: 'BAL-ECL-WAL-07-BLK',
          finish_color_fa: 'زغالی مات',
          finish_color_en: 'Textured Charcoal',
          hex: '#212121',
          hero_image_url: '/images/baldr-prod-wall-studio.webp',
        },
        {
          name_fa: 'سنگ آلباستر طبیعی',
          name_en: 'Translucent Alabaster',
          sku: 'BAL-ECL-WAL-07-ALB',
          finish_color_fa: 'آلباستر شفاف',
          finish_color_en: 'Translucent Alabaster',
          hex: '#EBE7DE',
          hero_image_url: '/images/baldr-prod-wall-studio.webp',
        },
      ],
    },
    {
      id: 8,
      slug: 'terra-landscape-bollard-ip65',
      sku: 'BAL-TER-OUT-08',
      category_slug: 'outdoor',
      identity: {
        name_en: 'Terra Landscape Architectural Bollard IP65',
        name_fa: 'بولارد فضای باز و محوطه ترا (IP65)',
        sku: 'BAL-TER-OUT-08',
        slug: 'terra-landscape-bollard-ip65',
        category: 'Portable & Outdoor (IP65)',
        category_fa: 'پرتابل و فضای باز (IP65)',
        category_slug: 'outdoor',
        designer_en: 'Baldr Landscape Optics',
        designer_fa: 'بخش نورپردازی لنداسکیپ بالدر',
        year: 2026,
        short_description_en: 'Weatherproof architectural landscape bollard with 180-degree glare-shielded asymmetric ground-wash illumination.',
        short_description_fa: 'بولارد محوطه با استاندارد نفوذناپذیری IP65 و پرتو نامتقارن ۱۸۰ درجه رو به پایین، ایده‌آل برای مسیرهای ویلایی، باغ و فضاهای سبز.',
        long_description_en: 'Built to withstand severe climatic conditions, the Terra bollard directs 100% of its luminous flux downward to pathways and vegetation, completely protecting the nocturnal sky from light pollution.',
        long_description_fa: 'مقاوم در برابر باد، باران و رطوبت شدید (IP65 و IK08)، بولارد ترا صد در صد نور خود را بدون هیچ‌گونه آلودگی نوری به سمت آسمان، مستقیماً بر روی کف مسیرها و پوشش گیاهی هدایت می‌کند.',
      },
      physical_specs: {
        materials_en: ['Corrosion-Resistant Cast Aluminum', 'Tempered Glass Shield', 'Stainless Fasteners'],
        materials_fa: ['آلومینیوم اکسترود ضدخوردگی گرید دریایی', 'شیشه سکوریت ضد ضربه', 'اتصالات استیل ضدزنگ 316'],
        finish_color_en: 'Anodized Forest Bronze',
        finish_color_fa: 'برنز اکسیدشده محوطه',
        dimensions: { length_mm: 160, width_mm: 160, height_mm: 800 },
        weight_kg: 6.2,
        suspension_cable_max_mm: 0,
        mounting_type_en: 'In-Ground Concrete Anchor Plate',
        mounting_type_fa: 'نصب با پلیت انکربولت در فونداسیون بتنی',
      },
      electrical_and_lighting: {
        light_source_en: 'High-Output Sealed LED Module (Cree)',
        light_source_fa: 'ماژول ال‌ای‌دی آب‌بند پرقدرت Cree',
        wattage_w: 22,
        luminous_flux_lm: 1900,
        color_temperature_cct_en: '3000K Warm White',
        color_temperature_cct_fa: '3000K سفید گرم',
        color_rendering_index_cri: '>90',
        beam_angle_degrees: 180,
        dimmability_en: 'Non-Dimmable / DALI-2 Outdoor',
        dimmability_fa: 'دالی ۲ بیرونی / کنترل فوتوسل',
        input_voltage: '220-240V AC 50/60Hz',
        driver_location_en: 'Internal IP67 Encapsulated Driver',
        driver_location_fa: 'درایور ضدآب رزین‌شده IP67 داخل پایه',
      },
      compliance: {
        ip_rating: 'IP65 / IK08',
        insulation_class_en: 'Class I',
        insulation_class_fa: 'کلاس یک (Class I)',
        energy_class: 'A+',
      },
      media: {
        hero_image_url: '/images/baldr-prod-outdoor-studio.webp',
        gallery_images: [
          '/images/baldr-prod-outdoor-arch.webp',
          '/images/baldr-wide-outdoor.webp',
        ],
        dimension_diagram_url: '/diagrams/baldr-vector-sm-profile.webp',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_fa: '/downloads/Baldr-2026-Catalogue.pdf',
        installation_manual_pdf_en: '/downloads/Baldr-2026-Catalogue.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'برنز طبیعی محوطه',
          name_en: 'Forest Bronze',
          sku: 'BAL-TER-OUT-08-BRZ',
          finish_color_fa: 'برنز آنودایز',
          finish_color_en: 'Forest Bronze',
          hex: '#4A3B2C',
          hero_image_url: '/images/baldr-prod-outdoor-studio.webp',
        },
        {
          name_fa: 'مشکی آنتراسیت',
          name_en: 'Anthracite Black',
          sku: 'BAL-TER-OUT-08-ANT',
          finish_color_fa: 'آنتراسیت مات',
          finish_color_en: 'Anthracite Black',
          hex: '#1E2022',
          hero_image_url: '/images/baldr-prod-outdoor-studio.webp',
        },
      ],
    },
  ],
    projects: [
    {
      id: 1,
      slug: 'niavaran-daylight-residence',
      code: 'PRJ-TEH-01',
      title_fa: 'پنت‌هاوس روشن نیاوران',
      title_en: 'Niavaran Residence',
      location_fa: 'تهران، نیاوران',
      location_en: 'Niavaran, Tehran',
      architect_fa: 'دفتر معماری استودیو چهار',
      architect_en: 'Chahar Architectural Studio',
      sector_fa: 'مسکونی مدرن',
      sector_en: 'Contemporary Residential',
      year: 2026,
      summary_fa: 'طراحی روشنایی روز و شب برای فضای ناهارخوری و نشیمن ۳۸۰ متری با استفاده از آویزهای خطی متقاطع بالدر و چراغ‌های ایستاده مرمرین.',
      summary_en: 'Harmonizing natural daylight and warm 2700K evening scenes across a sunlit travertine dining hall and minimalist living space.',
      description_fa: 'پروژه پنت‌هاوس نیاوران بر پایه تعامل نور طبیعی کوهپایه‌های شمالی تهران و نورپردازی معماری بالدر شکل گرفته است. هدف بنیادین تیم طراحی، پنهان‌سازی منابع نوری تند و دستیابی به سطوحی پیوسته از درخشش نرم بود که بافت سنگ‌های تراورتن کرم و پنل‌های چوب بلوط را بدون خیرگی چشم برجسته سازد.',
      description_en: 'The Niavaran Penthouse was conceived around the dialogue between the natural northern mountain light of Tehran and precision architectural lighting by Baldr. The primary design intent was to eliminate intrusive glare and deliver continuous soft luminance that reveals the honed travertine and raw oak surfaces.',
      challenge_fa: 'سقف‌های با ارتفاع بلند (۴.۲ متر) و پنجره‌های سرتاسری جنوبی نیازمند سامانه نوری بود که در طول روز با ورود نور خورشید هماهنگ بوده و در هنگام غروب، بدون افتادن سایه‌های تیز، نوری گرم و صمیمی ایجاد کند.',
      challenge_en: 'High 4.2m ceilings and south-facing floor-to-ceiling glass required a responsive lighting scheme that balances bright daytime sunlight and transitions into warm evening intimacy without casting harsh shadows.',
      solution_fa: 'نصب سامانه‌های آویز خطی با پخش‌کننده میکروپرینت و کنترل زاویه تابش ۳۵ درجه به همراه چراغ‌های مونوپات مرمرین در گوشه‌ها با پروتکل DALI-2 و Casambi که امکان تنظیم سناریوی نوری متناسب با ساعت بیولوژیک روز را فراهم می‌آورد.',
      solution_en: 'Suspended micro-prismatic linear profiles with 35-degree beam cut-off paired with corner marble floor monoliths managed through DALI-2 and Casambi wireless mesh for seamless circadian tuning.',
      image_url: '/images/flos-room-dining.webp',
      gallery_images: ['/images/flos-room-dining.webp', '/images/project-tehran-penthouse.webp', '/images/flos-hero-daylight.webp'],
      luminaires_used: ['BAL-LS-01-BRS', 'BAL-FL-04-MRB', 'BAL-WL-265-BLK'],
      metrics_json: { area_sqm: 640, cri: '>97', cct: '2700K - 3000K', control: 'DALI-2 / Casambi' },
    },
    {
      id: 2,
      slug: 'fereshteh-gallery-villa',
      code: 'PRJ-TEH-02',
      title_fa: 'آپارتمان کلکسیونی الهیه',
      title_en: 'Elahiyeh Collector’s Apartment',
      location_fa: 'تهران، الهیه — فرشته',
      location_en: 'Elahiyeh, Tehran',
      architect_fa: 'گروه معماری فضای سفید',
      architect_en: 'White Space Architects',
      sector_fa: 'مسکونی و گالری شخصی',
      sector_en: 'Private Gallery & Residence',
      year: 2026,
      summary_fa: 'استفاده از چراغ‌های رومیزی و ایستاده با پخش نور غیرمستقیم بر روی دیوارهای گچی سفید برای ایجاد اتمسفری آرام و موزه‌ای.',
      summary_en: 'Soft diffused luminance across lime-washed plaster walls utilizing indirect table and floor luminaires.',
      description_fa: 'آپارتمان و گالری اختصاصی فرشته برای نمایش مجموعه‌ای از نقاشی‌ها و مجسمه‌های معاصر ایرانی طراحی شده است. نورپردازی در این پروژه نقشی فراتر از روشنایی عمومی ایفا می‌کند؛ هر منبع نوری همچون یک اثر هنری مجزا با بدنه برنجی دست‌ساز و شیشه‌های دمیده‌شده عمل می‌کند.',
      description_en: 'The Fereshteh Private Gallery was crafted to showcase an exquisite private collection of modern Iranian sculptures and paintings. Lighting serves beyond mere illumination; each fixture acts as an independent art piece sculpted from hand-finished brass and mouth-blown glass.',
      challenge_fa: 'حفظ سلامت تابلوهای نقاشی در برابر اشعه‌های مخرب UV/IR و لزوم شاخص تفکیک رنگ فوق‌العاده بالا (CRI >97) بدون ایجاد بازتاب نور روی شیشه‌های قاب آثار هنری.',
      challenge_en: 'Protecting fragile oil paintings against UV/IR radiation while achieving ultra-high color fidelity (CRI >97, R9 >90) without disturbing specular reflections on artwork glass.',
      solution_fa: 'به‌کارگیری ماژول‌های LED فاقد فتوآسیب بیولوژیکی (RG0 Exempt) با دیفیوزرهای شیشه‌ای اپال دولایه و چراغ‌های ایستاده سنگین مرمر مشکی برای روشن‌سازی غیرمستقیم سقف و دیوارها.',
      solution_en: 'Employing photobiologically safe RG0 LED modules with dual-layer opal diffusers and black marble monolith floor fixtures to bounce indirect light across lime-plaster surfaces.',
      image_url: '/images/flos-room-living.webp',
      gallery_images: ['/images/flos-room-living.webp', '/images/project-art-gallery.webp', '/images/hero-architectural-lighting.webp'],
      luminaires_used: ['BAL-TB-09-SLV', 'BAL-FL-04-MRB'],
      metrics_json: { area_sqm: 480, cri: '>97', cct: '2700K Warm', control: 'Casambi Wireless' },
    },
    {
      id: 3,
      slug: 'lavasan-sanctuary-pavilion',
      code: 'PRJ-LAV-03',
      title_fa: 'ویلای مدرن لواسان',
      title_en: 'Lavasan Minimalist Villa',
      location_fa: 'لواسان، تهران',
      location_en: 'Lavasan, Tehran',
      architect_fa: 'مهندسان مشاور خط و فضا',
      architect_en: 'Line & Void Architecture',
      sector_fa: 'ویلای اختصاصی',
      sector_en: 'Private Architectural Villa',
      year: 2026,
      summary_fa: 'ترکیب گوی‌های شیشه‌ای اپال با سیستم کنترل هوشمند Dim-to-Warm برای تطبیق دمای رنگ نور با ساعت بیولوژیک بدن.',
      summary_en: 'Opal glass spheres with circadian Dim-to-Warm optics tailored for serene architectural interiors.',
      description_fa: 'ویلای لواسان در دل طبیعت کوهستانی با تاکید بر آرامش، سکوت بصری و پیوند با مناظر طبیعی پیرامون خلق شده است. نورپردازی فضاهای خصوصی و نشیمن این ویلا با مفهوم «نور نامرئی و آرامش‌بخش» طراحی شده است.',
      description_en: 'Nestled within mountainous terrain, Lavasan Villa emphasizes sensory serenity and uninterrupted connection with nature. The lighting scheme embodies the philosophy of invisible, calming illumination.',
      challenge_fa: 'ایجاد تعادل نوری در فضاهای با دهانه‌های وسیع شیشه‌ای در شب که معمولاً باعث ایجاد حس سیاهی و پوچی بیرون پنجره‌ها می‌شود.',
      challenge_en: 'Counteracting the cold black void created by expansive glass facades at night while maintaining internal privacy and warmth.',
      solution_fa: 'استفاده از گوی‌های دکوراتیو معلق در ارتفاع‌های متغیر، اسپات‌لایت‌های مگنتی ۴۸ ولت بر روی پروفیل‌های مینیمال مشکی و سناریوی نوری Dim-to-Warm تا دمای ۲۴۰۰ کلوین که گرمای آتش را تداعی می‌کند.',
      solution_en: 'Layering suspended opal glass spheres at varying heights with 48V magnetic spotlights on ultra-slim tracks and 2400K Dim-to-Warm circadian dimming resembling hearth fire.',
      image_url: '/images/flos-room-bedroom.webp',
      gallery_images: ['/images/flos-room-bedroom.webp', '/images/flos-hero-seki.webp', '/images/flos-hero-maap.webp'],
      luminaires_used: ['BAL-FL-04-MRB', 'BAL-SC-08-SKG', 'BAL-MG-48-WHT'],
      metrics_json: { area_sqm: 1150, cri: '>95', cct: '2400K - 3000K', control: 'KNX / DALI-2' },
    },
  ],
  news: [
    {
      id: 1,
      slug: 'baldr-2026-architectural-catalogue',
      category_fa: 'کالکشن ۲۰۲۶',
      category_en: '2026 Collection',
      date_fa: 'مهر ۱۴۰۵',
      date_en: 'Oct 2026',
      title_fa: 'رونمایی از کالکشن معماری ۲۰۲۶ بالدر',
      title_en: 'The 2026 Baldr Architectural Collection',
      excerpt_fa: 'ترکیب شیشه اپال، مرمر و برنج همراه با کتابخانه کامل BIM.',
      excerpt_en: 'Opal glass, honed marble, and brass with full BIM files.',
      image_url: '/images/flos-hero-ic.webp',
      location_badge_fa: 'شوروم تهران',
      location_badge_en: 'Tehran Studio',
    },
    {
      id: 2,
      slug: 'philosophy-of-invisible-light-workshop',
      category_fa: 'فرهنگ نور',
      category_en: 'Culture of Light',
      date_fa: 'آبان ۱۴۰۵',
      date_en: 'Nov 2026',
      title_fa: 'تاثیر طیف ۲۷۰۰ کلوین و CRI >97 در معماری',
      title_en: 'Warm 2700K Spectrums & CRI >97 in Architecture',
      excerpt_fa: 'نمایش طبیعی بافت چوب و سنگ بدون خیرگی.',
      excerpt_en: 'Rendering natural stone and timber with zero glare.',
      image_url: '/images/flos-hero-maap.webp',
      location_badge_fa: 'پژوهش نوری',
      location_badge_en: 'Design Essay',
    },
    {
      id: 3,
      slug: 'dali2-casambi-smart-integration',
      category_fa: 'مهندسی اپتیک',
      category_en: 'Smart Optics',
      date_fa: 'آذر ۱۴۰۵',
      date_en: 'Dec 2026',
      title_fa: 'یکپارچه‌سازی پروتکل‌های DALI-2 و Casambi',
      title_en: 'Seamless DALI-2 & Casambi Integration',
      excerpt_fa: 'تعریف سناریوهای نوری روز و شب بدون سیم‌کشی پیچیده.',
      excerpt_en: 'Wireless daylight and evening scene programming.',
      image_url: '/images/flos-hero-seki.webp',
      location_badge_fa: 'ویژه معماران',
      location_badge_en: 'Architects Guide',
    },
  ],
};

export const UI_TEXT = {
  fa: {
    brandSubtitle: 'طراحی و معماری روشنایی — تهران',
    nav: {
      products: 'محصولات',
      projects: 'پروژه‌ها',
      professionals: 'معماران و متخصصان',
      about: 'درباره ما',
      contact: 'تماس با ما',
    },
    hero: {
      exploreBtn: 'مشاهده کاتالوگ',
      inspectBtn: 'شناسنامه فنی',
      sceneModeLabel: 'حالت نمایش:',
      dayMode: 'نمای روز',
      nightMode: 'نمای شب',
      slidePrev: 'قبلی',
      slideNext: 'بعدی',
    },
    categoryStrip: {
      eyebrow: 'PRODUCT CATEGORIES • 01',
      title: 'دسته‌بندی محصولات',
      subtitle: '',
      viewAll: 'همه محصولات',
      moreProductsBtn: 'محصولات بیشتر',
    },
    productsSection: {
      eyebrow: 'FLAGSHIP COLLECTION • 02',
      title: 'گزیده محصولات',
      subtitle: '',
      filterAll: 'همه',
      inspectSpecs: 'شناسنامه فنی',
      hoverHint: 'نمای روشن',
      wattage: 'توان',
      lumens: 'شار نوری',
      cct: 'دمای رنگ',
      cri: 'نمود رنگ',
      beam: 'زاویه تابش',
    },
    roomsSection: {
      eyebrow: 'ARCHITECTURAL SPACES • 03',
      title: 'نور در فضای معماری',
      subtitle: '',
      featuredInRoom: 'چراغ‌های این فضا:',
      inspectProduct: 'مشخصات فنی',
    },
    projectsSection: {
      eyebrow: 'SELECTED PROJECTS • 04',
      title: 'پروژه‌های منتخب',
      subtitle: '',
      architectLabel: 'معمار:',
      locationLabel: 'موقعیت:',
      areaLabel: 'متراژ:',
      controlLabel: 'کنترل:',
      usedLuminaires: 'کدهای اجراشده:',
    },
    professionalsSection: {
      eyebrow: 'PROFESSIONALS',
      title: 'معماران و متخصصان',
      subtitle: '',
      cards: [],
    },
    opticsSection: {
      eyebrow: 'PHOTOMETRIC SIMULATOR',
      title: 'آزمایشگاه اپتیک',
      subtitle: '',
      selectBeam: 'زاویه تابش:',
      selectKelvin: 'دمای رنگ:',
      luxAt2m: 'لوکس در ۲ متر:',
      recommendedUse: 'کاربرد:',
    },
    catalogueSection: {
      title: 'کاتالوگ جامع بالدر ۲۰۲۶',
      description:
        'مجموعه کامل ۲۸۴ چراغ معماری و دکوراتیو، نقشه‌های فنی میلی‌متری، منحنی‌های فتومتریک و راهنمای سیستم‌های مگنتی ۴۸ ولت در قالب یک مجله مرجع ۳۲۰ صفحه‌ای.',
      specs: '۳۲۰ صفحه • ۲۸۴ محصول • نسخه چاپی و دیجیتال (PDF)',
      downloadPdfBtn: 'دانلود فایل PDF کاتالوگ',
      viewPdfBtn: 'مشاهده آنلاین PDF',
      pdfUrl: '/downloads/Baldr-2026-Catalogue.pdf',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDR STUDIO • 06',
      title: 'درباره ما',
      description:
        'استودیو طراحی و مهندسی روشنایی بالدر با تلفیق متریال‌های اصیل برنج، سنگ مرمر و شیشه اپال دست‌ساز به همراه تکنولوژی اپتیکال موزه‌ای (CRI >97) و استاندارد ضد خیرگی (UGR <16)، چراغ‌هایی ماندگار برای معماری معاصر خلق می‌کند.',
      philosophySecond: '',
      ctaPrimary: 'شوروم تهران',
      ctaSecondary: 'دانلود کاتالوگ ۲۰۲۶',
      cultureTitle: 'جستارهای نوری',
      cultureSubtitle: '',
    },
    showroomSection: {
      eyebrow: 'TEHRAN FLAGSHIP SHOWROOM • 07',
      title: 'شوروم فرشته تهران',
      subtitle: '',
      highlights: [],
      addressTitle: 'آدرس:',
      addressText: 'تهران، الهیه، خیابان فرشته، پلاک ۱۴۲، ساختمان آرک، طبقه سوم',
      hoursTitle: 'ساعات بازدید:',
      hoursText: 'شنبه تا پنجشنبه — ۱۰:۰۰ الی ۲۰:۰۰',
      bookBtn: 'رزرو بازدید شوروم',
    },
    contactSection: {
      eyebrow: 'CONTACT US • 08',
      title: 'اطلاعات تماس با ما',
      formTitle: 'ارسال درخواست برای رزرو شوروم',
      subtitle: '',
      phoneTitle: 'شماره تلفن:',
      emailTitle: 'ایمیل:',
      addressTitle: 'آدرس:',
      addressText: 'تهران، الهیه، خیابان فرشته، پلاک ۱۴۲، ساختمان آرک، طبقه سوم',
      studioHoursTitle: 'ساعات پاسخگویی:',
      studioHoursText: 'شنبه تا پنجشنبه — ۰۹:۰۰ الی ۲۰:۰۰',
      formName: 'نام و نام خانوادگی',
      formStudio: 'دفتر معماری / کارفرما',
      formContact: 'شماره تلفن یا ایمیل',
      formProjectType: 'زمان بازدید / نوع پروژه',
      formMessage: 'توضیحات کوتاه',
      formSubmit: 'ارسال درخواست رزرو شوروم',
      formSubmitting: 'در حال ارسال...',
    },
    modal: {
      close: 'بستن',
      identityTab: 'مشخصات فیزیکی',
      electricalTab: 'مشخصات نوری',
      downloadsTitle: 'دانلود فایل‌های فنی (CAD / IES)',
      blueprintTitle: 'ابعاد مهندسی (mm)',
      selectVariant: 'فینیش:',
      datasheetBtn: 'دیتاشیت (PDF)',
      manualBtn: 'راهنمای نصب',
      iesBtn: 'فایل IES',
      cadBtn: 'مدل سه‌بعدی CAD',
    },
    productsPage: {
      heroTitle: 'کالکشن محصولات بالدر',
      heroSubtitle: 'مجموعه چراغ‌های معماری، دکوراتیو و سیستم‌های مگنتی ۴۸ ولت با اپتیک موزه‌ای CRI >97.',
      searchPlaceholder: 'جستجو در نام، کد فنی (SKU) یا متریال...',
      filterCategory: 'دسته‌بندی',
      filterEnvironment: 'محیط نصب',
      filterCct: 'دمای رنگ',
      filterControl: 'پروتکل کنترل',
      filterMounting: 'نحوه نصب',
      allOption: 'همه',
      envIndoor: 'داخلی (IP20)',
      envOutdoor: 'فضای باز (IP65)',
      cct2700: '2700K گرم',
      cct3000: '3000K گالری',
      ctrlDali: 'DALI-2 / Casambi',
      ctrlDimmer: 'دیمر / لمسی',
      mountSuspended: 'آویز و سقفی',
      mountWallFloor: 'دیواری و ایستاده',
      mountTable: 'رومیزی و پرتابل',
      mountTrack: 'ریل ۴۸ ولت',
      clearFilters: 'حذف فیلترها',
      resultsCountSuffix: 'محصول',
      noResultsTitle: 'محصولی با این فیلترها یافت نشد.',
      noResultsReset: 'نمایش همه محصولات',
      inspectSpecsBtn: 'شناسنامه فنی',
      cadIesBadge: 'CAD / IES',
    },
    footer: {
      aboutText:
        'استودیو طراحی و مهندسی روشنایی معماری بالدر؛ خلق راهکارهای نوری مینیمال و ماندگار.',
      quickLinksTitle: 'دسترسی سریع',
      resourcesTitle: 'کالکشن‌ها',
      contactTitle: 'تماس',
      addressLabel: 'آدرس:',
      addressValue: 'تهران، الهیه، خیابان فرشته، پلاک ۱۴۲، طبقه سوم',
      phoneLabel: 'تلفن:',
      phoneValue: '+98 (21) 2620 4800',
      emailLabel: 'ایمیل:',
      emailValue: 'info@baldr.ir',
      copyright: '© ۱۴۰۵ استودیو روشنایی بالدر — تهران.',
      resourceLinks: [
        { label: 'چراغ‌های آویز و خطی', href: '/products?category=pendant' },
        { label: 'چراغ‌های ایستاده و دیواری', href: '/products?category=wall-floor' },
        { label: 'سیستم‌های مگنتی ۴۸ ولت', href: '/products?category=magnetic' },
        { label: 'پروژه‌های معماری', href: '/projects' },
      ],
    },
  },
  en: {
    brandSubtitle: 'Architectural Lighting Studio — Tehran',
    nav: {
      products: 'Products',
      projects: 'Projects',
      professionals: 'Professionals',
      about: 'About Us',
      contact: 'Contact',
    },
    hero: {
      exploreBtn: 'View Catalog',
      inspectBtn: 'Technical Specs',
      sceneModeLabel: 'Scene Mode:',
      dayMode: 'Daylight',
      nightMode: 'Evening',
      slidePrev: 'Prev',
      slideNext: 'Next',
    },
    categoryStrip: {
      eyebrow: 'PRODUCT CATEGORIES • 01',
      title: 'Product Categories',
      subtitle: '',
      viewAll: 'All Luminaires',
      moreProductsBtn: 'More Products',
    },
    productsSection: {
      eyebrow: 'FLAGSHIP COLLECTION • 02',
      title: 'Featured Luminaires',
      subtitle: '',
      filterAll: 'All',
      inspectSpecs: 'Technical Specs',
      hoverHint: 'Evening View',
      wattage: 'Power',
      lumens: 'Flux',
      cct: 'CCT',
      cri: 'CRI',
      beam: 'Beam',
    },
    roomsSection: {
      eyebrow: 'ARCHITECTURAL SPACES • 03',
      title: 'Light in Space',
      subtitle: '',
      featuredInRoom: 'Luminaires in this space:',
      inspectProduct: 'Technical Specs',
    },
    projectsSection: {
      eyebrow: 'SELECTED PROJECTS • 04',
      title: 'Selected Projects',
      subtitle: '',
      architectLabel: 'Architect:',
      locationLabel: 'Location:',
      areaLabel: 'Area:',
      controlLabel: 'Control:',
      usedLuminaires: 'Luminaires:',
    },
    professionalsSection: {
      eyebrow: 'PROFESSIONALS',
      title: 'Professionals',
      subtitle: '',
      cards: [],
    },
    opticsSection: {
      eyebrow: 'PHOTOMETRIC SIMULATOR',
      title: 'Optics Lab',
      subtitle: '',
      selectBeam: 'Beam Angle:',
      selectKelvin: 'CCT:',
      luxAt2m: 'Lux @ 2m:',
      recommendedUse: 'Application:',
    },
    catalogueSection: {
      title: 'Baldr 2026 Master Catalogue',
      description:
        'The complete 320-page reference magazine featuring 284 architectural and decorative luminaires, millimeter blueprints, photometric curves, and 48V magnetic track guides.',
      specs: '320 Pages • 284 Luminaires • Print & Digital Edition (PDF)',
      downloadPdfBtn: 'Download Catalogue PDF',
      viewPdfBtn: 'View PDF Online',
      pdfUrl: '/downloads/Baldr-2026-Catalogue.pdf',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDR STUDIO • 06',
      title: 'About Us',
      description:
        'Baldr Architectural Lighting Studio blends brushed brass, honed marble, and hand-blown opal glass with museum-grade CRI >97 and glare-free UGR <16 optics for contemporary architecture.',
      philosophySecond: '',
      ctaPrimary: 'Tehran Showroom',
      ctaSecondary: '2026 Catalogue (PDF)',
      cultureTitle: 'Journal',
      cultureSubtitle: '',
    },
    showroomSection: {
      eyebrow: 'TEHRAN FLAGSHIP SHOWROOM • 07',
      title: 'Fereshteh Showroom',
      subtitle: '',
      highlights: [],
      addressTitle: 'Address:',
      addressText: 'Level 3, Ark Bldg, No. 142 Fereshteh St., Elahiyeh, Tehran',
      hoursTitle: 'Hours:',
      hoursText: 'Sat to Thu — 10:00 AM to 8:00 PM',
      bookBtn: 'Book Showroom Visit',
    },
    contactSection: {
      eyebrow: 'CONTACT US • 08',
      title: 'Contact Information',
      formTitle: 'Request Showroom Appointment',
      subtitle: '',
      phoneTitle: 'Phone:',
      emailTitle: 'Email:',
      addressTitle: 'Address:',
      addressText: 'Level 3, Ark Bldg, No. 142 Fereshteh St., Elahiyeh, Tehran',
      studioHoursTitle: 'Hours:',
      studioHoursText: 'Sat to Thu — 9:00 AM to 8:00 PM',
      formName: 'Full Name',
      formStudio: 'Architecture Studio',
      formContact: 'Phone or Email',
      formProjectType: 'Visit Time / Project Type',
      formMessage: 'Short Note',
      formSubmit: 'Send Showroom Request',
      formSubmitting: 'Sending...',
    },
    modal: {
      close: 'Close',
      identityTab: 'Physical Specs',
      electricalTab: 'Photometrics',
      downloadsTitle: 'B2B Downloads (CAD / IES)',
      blueprintTitle: 'Dimensions (mm)',
      selectVariant: 'Finish:',
      datasheetBtn: 'Datasheet (PDF)',
      manualBtn: 'Manual (PDF)',
      iesBtn: 'IES File',
      cadBtn: '3D CAD (.STEP)',
    },
    productsPage: {
      heroTitle: 'Baldr Luminaire Collection',
      heroSubtitle: 'Architectural, sculptural, and 48V magnetic lighting engineered with museum-grade CRI >97 optics.',
      searchPlaceholder: 'Search by name, SKU, or material...',
      filterCategory: 'Category',
      filterEnvironment: 'Environment',
      filterCct: 'Color Temp (CCT)',
      filterControl: 'Control Protocol',
      filterMounting: 'Installation',
      allOption: 'All',
      envIndoor: 'Indoor (IP20)',
      envOutdoor: 'Outdoor (IP65)',
      cct2700: '2700K Warm',
      cct3000: '3000K Gallery',
      ctrlDali: 'DALI-2 / Casambi',
      ctrlDimmer: 'Dimmer / Touch',
      mountSuspended: 'Pendant & Ceiling',
      mountWallFloor: 'Wall & Floor',
      mountTable: 'Table & Portable',
      mountTrack: '48V Magnetic Track',
      clearFilters: 'Reset Filters',
      resultsCountSuffix: 'Luminaires',
      noResultsTitle: 'No luminaires match the selected filters.',
      noResultsReset: 'Show All Luminaires',
      inspectSpecsBtn: 'Technical Specs',
      cadIesBadge: 'CAD / IES',
    },
    footer: {
      aboutText:
        'Baldr Architectural Lighting Studio — crafting minimalist, glare-free illumination in Tehran.',
      quickLinksTitle: 'Quick Links',
      resourcesTitle: 'Collections',
      contactTitle: 'Contact',
      addressLabel: 'Address:',
      addressValue: 'Level 3, Ark Bldg, No. 142 Fereshteh St., Tehran',
      phoneLabel: 'Phone:',
      phoneValue: '+98 (21) 2620 4800',
      emailLabel: 'Email:',
      emailValue: 'info@baldr.ir',
      copyright: '© 2026 Baldr Lighting Studio — Tehran.',
      resourceLinks: [
        { label: 'Pendant & Linear', href: '/products?category=pendant' },
        { label: 'Floor & Wall', href: '/products?category=wall-floor' },
        { label: '48V Magnetic Track', href: '/products?category=magnetic' },
        { label: 'Selected Projects', href: '/en/projects' },
      ],
    },
  },
};


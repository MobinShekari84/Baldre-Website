export type Lang = 'fa' | 'en';

export interface BaldreCategory {
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

export interface BaldreVariant {
  name_fa: string;
  name_en: string;
  sku: string;
  finish_color_fa: string;
  finish_color_en: string;
  hex: string;
  hero_image_url: string;
}

export interface BaldreProduct {
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
  variants: BaldreVariant[];
}

export interface BaldreProject {
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
  image_url: string;
  luminaires_used: string[];
  metrics_json: {
    area_sqm: number;
    cri: string;
    cct: string;
    control: string;
  };
}

export interface BaldreNews {
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
  };
  categories: BaldreCategory[];
  products: BaldreProduct[];
  projects: BaldreProject[];
  news: BaldreNews[];
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
    designer_en: 'Baldre Studio',
    day_image: '/images/flos-hero-daylight.jpg',
    night_image: '/images/hero-architectural-lighting.jpg',
    featured_sku: 'BAL-LS-01-BRS',
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
    image_url: '/images/flos-cat-pendant.jpg',
  },
  {
    slug: 'table-strip',
    filterSlug: 'sculptural',
    name_fa: 'چراغ‌های رومیزی',
    name_en: 'Table Lamps',
    desc_fa: 'ترکیب شیشه اپال دست‌ساز و برنج تراش‌خورده.',
    desc_en: 'Hand-blown opal glass and machined brass.',
    count: 42,
    image_url: '/images/flos-cat-table.jpg',
  },
  {
    slug: 'floor-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های ایستاده',
    name_en: 'Floor Lamps',
    desc_fa: 'تندیس‌های ایستاده با پایه سنگ مرمر طبیعی.',
    desc_en: 'Monolithic floor luminaires anchored in marble.',
    count: 34,
    image_url: '/images/flos-cat-floor.jpg',
  },
  {
    slug: 'wall-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های دیواری',
    name_en: 'Wall Lamps',
    desc_fa: 'نورپردازی غیرمستقیم و بازوهای متحرک معماری.',
    desc_en: 'Indirect wall washers and kinetic swing arms.',
    count: 48,
    image_url: '/images/flos-cat-wall.jpg',
  },
  {
    slug: 'ceiling-strip',
    filterSlug: 'magnetic',
    name_fa: 'سقفی و مگنتی ۴۸ ولت',
    name_en: 'Ceiling & 48V Track',
    desc_fa: 'سیستم‌های ماژولار ۴۸ ولت با کنترل هوشمند DALI-2.',
    desc_en: 'Modular 48V low-voltage tracks with DALI-2 control.',
    count: 64,
    image_url: '/images/flos-cat-ceiling.jpg',
  },
  {
    slug: 'portable-strip',
    filterSlug: 'outdoor',
    name_fa: 'پرتابل و فضای باز',
    name_en: 'Portable & Outdoor',
    desc_fa: 'چراغ‌های مقاوم IP65 ویژه تراس و محوطه.',
    desc_en: 'Weather-sealed IP65 luminaires for landscapes.',
    count: 38,
    image_url: '/images/flos-cat-portable.jpg',
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
    image_url: '/images/flos-room-dining.jpg',
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
    image_url: '/images/flos-room-living.jpg',
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
    image_url: '/images/flos-room-bedroom.jpg',
    featured_skus: ['BAL-FL-04-MRB', 'BAL-MG-48-WHT'],
  },
];

export const FALLBACK_HOMEPAGE_DATA: HomepagePayload = {
  brand: {
    name_en: 'BALDRE',
    name_fa: 'بالدر',
    origin_en: 'Tehran Architectural Lighting Studio',
    origin_fa: 'استودیو طراحی و مهندسی روشنایی معماری تهران',
    catalog_total_count: 284,
    cri_standard: 'CRI >95',
    warranty_years: 5,
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
      image_url: '/images/flos-cat-pendant.jpg',
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
      image_url: '/images/flos-cat-ceiling.jpg',
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
      image_url: '/images/flos-cat-table.jpg',
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
      image_url: '/images/flos-cat-floor.jpg',
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
      image_url: '/images/flos-cat-portable.jpg',
      order: 5,
    },
  ],
  products: [
    {
      id: 1,
      slug: 'linear-suspension-01',
      sku: 'BAL-LS-01-BRS',
      category_slug: 'pendant',
      identity: {
        name_fa: 'آویز خطی و شیشه‌ای سری ۰۱ (Crux Linear)',
        name_en: 'Crux Linear Suspension 01',
        sku: 'BAL-LS-01-BRS',
        slug: 'linear-suspension-01',
        category: 'Pendant & Linear',
        category_fa: 'چراغ‌های آویز و خطی',
        category_slug: 'pendant',
        designer_fa: 'استودیو طراحی بالدر — تهران',
        designer_en: 'Baldre Design Studio',
        year: 2026,
        short_description_fa: 'چراغ آویز خطی مینیمال با پروفیل برنج برس‌خورده و دیفیوزر شیشه‌ای موج‌دار بدون خیرگی.',
        short_description_en: 'Minimalist architectural linear pendant in brushed champagne brass with hand-formed optical glass.',
        long_description_fa: 'ساخته شده از آلومینیوم اکسترود شده و برنج برس‌خورده، چراغ آویز خطی ۰۱ نوری یکنواخت و فاقد خیرگی (UGR <16) در فضاهای مدرن، میزهای ناهارخوری سنگی و دفاتر مدیریت خلق می‌کند.',
        long_description_en: 'Engineered from precision-extruded aluminum and brushed champagne brass, Crux Linear Suspension 01 delivers uniform, glare-free downward and ambient illumination.',
      },
      physical_specs: {
        materials_fa: ['برنج برس‌خورده شامپاینی', 'شیشه اپتیکال دست‌ساز', 'آلومینیوم آنودایز مشکی'],
        materials_en: ['Brushed Champagne Brass', 'Hand-Formed Optical Glass', 'Anodized Aluminum'],
        finish_color_fa: 'برنج شامپاینی و مشکی مات',
        finish_color_en: 'Champagne Brass & Matte Black',
        dimensions: { length_mm: 1200, width_mm: 35, height_mm: 40 },
        weight_kg: 2.5,
        suspension_cable_max_mm: 2400,
        mounting_type_fa: 'آویز سقفی با رزت مینیمال',
        mounting_type_en: 'Suspended / Minimal Ceiling Rose',
      },
      electrical_and_lighting: {
        light_source_fa: 'ال‌ای‌دی یکپارچه نسل جدید (Osram SMD)',
        light_source_en: 'Integrated High-Efficiency LED',
        wattage_w: 36,
        luminous_flux_lm: 3200,
        color_temperature_cct_fa: '3000K (سفید گرم معماری)',
        color_temperature_cct_en: '3000K (Warm Architectural White)',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 90,
        dimmability_fa: 'دالی ۲ / پوش دیم (DALI-2 / Push)',
        dimmability_en: 'DALI-2 / Push Dim',
        input_voltage: '220-240V AC',
        driver_location_fa: 'تعبیه‌شده درون رزت سقفی',
        driver_location_en: 'Integrated in ceiling canopy',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس یک (Class I)',
        insulation_class_en: 'Class I',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/flos-prod-pendant.jpg',
        gallery_images: ['/images/product-linear-suspension.jpg', '/images/flos-hero-daylight.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-LS-01-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-LS-01-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-LS-01-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-LS-01-Photometric.ies',
        cad_3d_file: '/downloads/BAL-LS-01-3DModel.step',
      },
      variants: [
        {
          name_fa: 'برنز شامپاینی برس‌خورده',
          name_en: 'Brushed Champagne Brass',
          sku: 'BAL-LS-01-BRS',
          finish_color_fa: 'برنج شامپاینی',
          finish_color_en: 'Champagne Brass',
          hex: '#C5A059',
          hero_image_url: '/images/flos-prod-pendant.jpg',
        },
        {
          name_fa: 'مشکی مات ابریشمی (نمای شب)',
          name_en: 'Obsidian Matte Black (Lit View)',
          sku: 'BAL-LS-01-BLK',
          finish_color_fa: 'مشکی مات',
          finish_color_en: 'Matte Black',
          hex: '#181818',
          hero_image_url: '/images/product-linear-suspension.jpg',
        },
        {
          name_fa: 'سفید گچی معماری',
          name_en: 'Architectural Chalk White',
          sku: 'BAL-LS-01-WHT',
          finish_color_fa: 'سفید مات',
          finish_color_en: 'Chalk White',
          hex: '#ECECE8',
          hero_image_url: '/images/flos-prod-pendant.jpg',
        },
      ],
    },
    {
      id: 2,
      slug: 'monolith-travertine-floor-lamp',
      sku: 'BAL-FL-04-MRB',
      category_slug: 'wall-floor',
      identity: {
        name_fa: 'چراغ ایستاده لونا با پایه مرمر سفید (Luna Sphere)',
        name_en: 'Luna Marble & Opal Sphere Floor Lamp',
        sku: 'BAL-FL-04-MRB',
        slug: 'monolith-travertine-floor-lamp',
        category: 'Floor & Wall Luminaires',
        category_fa: 'چراغ‌های ایستاده و دیواری',
        category_slug: 'wall-floor',
        designer_fa: 'استودیو طراحی بالدر',
        designer_en: 'Baldre Design Studio',
        year: 2026,
        short_description_fa: 'ستون برنجی ظریف بر روی پایه سنگ مرمر سفید یکپارچه با گوی شیشه‌ای اپال دست‌ساز.',
        short_description_en: 'Slender brushed brass stem anchored in honed white Carrara marble with a glowing opal glass sphere.',
        long_description_fa: 'با الهام از شاهکارهای طراحی مدرن ایتالیا، چراغ ایستاده لونا تعادلی شاعرانه میان سنگ مرمر سفید تراش‌خورده و گوی شیشه‌ای اپال دوپوسته‌ای ایجاد می‌کند که نوری ۳۶۰ درجه و مخملی در فضا می‌پراکند.',
        long_description_en: 'Anchored by a solid cylinder of honed white marble, the slender brushed brass stem supports a mouth-blown opal glass sphere that diffuses soft 360-degree ambient light.',
      },
      physical_specs: {
        materials_fa: ['سنگ مرمر سفید طبیعی', 'برنج برس‌خورده', 'شیشه اپال دمیده‌شده'],
        materials_en: ['Honed White Carrara Marble', 'Brushed Brass', 'Mouth-Blown Opal Glass'],
        finish_color_fa: 'مرمر سفید و برنج مات',
        finish_color_en: 'White Marble & Brushed Brass',
        dimensions: { length_mm: 240, width_mm: 240, height_mm: 1780 },
        weight_kg: 9.2,
        suspension_cable_max_mm: 2500,
        mounting_type_fa: 'ایستاده زمین‌قرار با دیمر روی کابل',
        mounting_type_en: 'Free-standing with inline optical dimmer',
      },
      electrical_and_lighting: {
        light_source_fa: 'ماژول LED با پخش نور ۳۶۰ درجه یکنواخت',
        light_source_en: '360° Diffused Warm-Dim LED Core',
        wattage_w: 24,
        luminous_flux_lm: 2250,
        color_temperature_cct_fa: '2700K (سفید گرم ابریشمی)',
        color_temperature_cct_en: '2700K (Warm Diffused Opal)',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 360,
        dimmability_fa: 'دیمر پیوسته (Dim-to-Warm)',
        dimmability_en: 'Integrated Foot Dimmer (Dim-to-Warm)',
        input_voltage: '220-240V AC',
        driver_location_fa: 'آداپتور خطی روی کابل ابریشمی',
        driver_location_en: 'Inline driver on braided cord',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس دو (Class II)',
        insulation_class_en: 'Class II',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/flos-prod-floor.jpg',
        gallery_images: ['/images/product-floor-monolith.jpg', '/images/flos-room-bedroom.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-FL-04-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-FL-04-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-FL-04-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-FL-04-Photometric.ies',
        cad_3d_file: '/downloads/BAL-FL-04-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مرمر سفید و برنج برس‌خورده',
          name_en: 'White Marble & Brass',
          sku: 'BAL-FL-04-MRB',
          finish_color_fa: 'مرمر سفید / برنج',
          finish_color_en: 'White Marble / Brass',
          hex: '#EAE6DF',
          hero_image_url: '/images/flos-prod-floor.jpg',
        },
        {
          name_fa: 'تراورتن تیره و مشکی (نمای شب)',
          name_en: 'Dark Travertine & Black (Lit View)',
          sku: 'BAL-FL-04-TRV',
          finish_color_fa: 'تراورتن / مشکی',
          finish_color_en: 'Travertine / Black',
          hex: '#2A2826',
          hero_image_url: '/images/product-floor-monolith.jpg',
        },
      ],
    },
    {
      id: 3,
      slug: 'aurelia-blown-glass-cluster',
      sku: 'BAL-SC-08-SKG',
      category_slug: 'pendant',
      identity: {
        name_fa: 'آویز گنبدی گچبری و شیشه اسکای‌گاردن (Skygarden Dome)',
        name_en: 'Skygarden Architectural Dome Pendant',
        sku: 'BAL-SC-08-SKG',
        slug: 'aurelia-blown-glass-cluster',
        category: 'Pendant & Linear',
        category_fa: 'چراغ‌های آویز و خطی',
        category_slug: 'pendant',
        designer_fa: 'استودیو طراحی بالدر',
        designer_en: 'Baldre Design Studio',
        year: 2026,
        short_description_fa: 'نیم‌کره مینیمال با سطح بیرونی مات و نقش‌برجسته‌های گچی دست‌ساز در سطح درونی.',
        short_description_en: 'Hemispherical architectural pendant with a minimalist exterior and sculpted plaster interior diffuser.',
        long_description_fa: 'ترکیبی از ظاهر بیرونی کاملاً مینیمال و مدرن با جزئیات مجسمه‌وار در داخل کاسه چراغ که نور را بدون هیچ‌گونه خیرگی مستقیم بازتاب می‌دهد.',
        long_description_en: 'Combining an ultra-clean spun aluminum exterior with an intricate cast-plaster interior relief that reflects warm, glare-free downward light.',
      },
      physical_specs: {
        materials_fa: ['آلومینیوم فرم‌دهی شده', 'گچ معماری قالب‌گیری شده', 'دیفیوزر شیشه‌ای اپال'],
        materials_en: ['Spun Aluminum', 'Cast Architectural Plaster', 'Opal Glass Diffuser'],
        finish_color_fa: 'سفید گچی و برنز مات',
        finish_color_en: 'Matte Plaster White & Warm Bronze',
        dimensions: { length_mm: 600, width_mm: 600, height_mm: 300 },
        weight_kg: 6.8,
        suspension_cable_max_mm: 2700,
        mounting_type_fa: 'آویز سقفی مرکزی',
        mounting_type_en: 'Central Ceiling Canopy',
      },
      electrical_and_lighting: {
        light_source_fa: 'ماژول LED با دیفیوزر استوانه‌ای داخلی',
        light_source_en: 'Internal Opal Cylinder LED Array',
        wattage_w: 28,
        luminous_flux_lm: 2100,
        color_temperature_cct_fa: '2700K (سفید گرم دلنشین)',
        color_temperature_cct_en: '2700K (Warm Ambient)',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 110,
        dimmability_fa: 'فازکات و دالی (Triac / DALI)',
        dimmability_en: 'Phase-Cut Triac / DALI',
        input_voltage: '220-240V AC',
        driver_location_fa: 'داخل رزت سقفی',
        driver_location_en: 'Concealed in ceiling rose',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس یک (Class I)',
        insulation_class_en: 'Class I',
        energy_class: 'A+',
      },
      media: {
        hero_image_url: '/images/flos-cat-pendant.jpg',
        gallery_images: ['/images/product-sculptural-pendant.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-SC-08-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-SC-08-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-SC-08-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-SC-08-Photometric.ies',
        cad_3d_file: '/downloads/BAL-SC-08-3DModel.step',
      },
      variants: [
        {
          name_fa: 'سفید گچی مات',
          name_en: 'Matte Plaster White',
          sku: 'BAL-SC-08-SKG',
          finish_color_fa: 'سفید مات',
          finish_color_en: 'Matte White',
          hex: '#F0EFEA',
          hero_image_url: '/images/flos-cat-pendant.jpg',
        },
        {
          name_fa: 'شیشه دودی و برنز (نمای شب)',
          name_en: 'Smoked Glass & Bronze (Lit View)',
          sku: 'BAL-SC-08-SMK',
          finish_color_fa: 'دودی / برنز',
          finish_color_en: 'Smoked / Bronze',
          hex: '#7A6348',
          hero_image_url: '/images/product-sculptural-pendant.jpg',
        },
      ],
    },
    {
      id: 4,
      slug: 'eclipse-alabaster-wall-sconce',
      sku: 'BAL-WL-265-BLK',
      category_slug: 'wall-floor',
      identity: {
        name_fa: 'چراغ دیواری بازویی متحرک ۲۶۵ (Swing Arm 265)',
        name_en: '265 Architectural Counterweight Wall Lamp',
        sku: 'BAL-WL-265-BLK',
        slug: 'eclipse-alabaster-wall-sconce',
        category: 'Floor & Wall Luminaires',
        category_fa: 'چراغ‌های ایستاده و دیواری',
        category_slug: 'wall-floor',
        designer_fa: 'استودیو طراحی بالدر',
        designer_en: 'Baldre Design Studio',
        year: 2026,
        short_description_fa: 'چراغ دیواری بازویی با وزنه تعادلی چدنی و قابلیت چرخش ۳۶۰ درجه بر فراز فضای نشیمن و میز کار.',
        short_description_en: 'Precision balanced counterweight wall luminaire with adjustable steel arm and directional reflector.',
        long_description_fa: 'طراحی مهندسی‌شده بر پایه تعادل مکانیکی؛ بازوی بلند فولادی این چراغ دیواری به کمک وزنه مخروطی انتهایی، امکان هدایت دقیق نور را به هر نقطه از فضای نشیمن یا میز ناهارخوری بدون نیاز به آویز سقفی فراهم می‌سازد.',
        long_description_en: 'An icon of kinetic architectural lighting. The adjustable steel arm and cast-iron counterweight allow effortless positioning of warm task and ambient illumination.',
      },
      physical_specs: {
        materials_fa: ['فولاد رنگ الکترواستاتیک', 'رفلکتور آلومینیوم چرخشی', 'وزنه تعادلی چدن'],
        materials_en: ['Powder-Coated Steel', 'Spun Aluminum Reflector', 'Cast-Iron Counterweight'],
        finish_color_fa: 'مشکی مات و سفید گالری',
        finish_color_en: 'Matte Black & Gallery White',
        dimensions: { length_mm: 2050, width_mm: 350, height_mm: 850 },
        weight_kg: 5.8,
        suspension_cable_max_mm: 0,
        mounting_type_fa: 'نصب دیواری با براکت چرخشی',
        mounting_type_en: 'Wall-mounted articulating bracket',
      },
      electrical_and_lighting: {
        light_source_fa: 'ماژول LED با زاویه قابل تنظیم',
        light_source_en: 'Directional High-CRI LED Module',
        wattage_w: 18,
        luminous_flux_lm: 1450,
        color_temperature_cct_fa: '2700K (گرم معماری)',
        color_temperature_cct_en: '2700K (Warm Architectural)',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 60,
        dimmability_fa: 'دیمر روی کابل (Inline Dimmer)',
        dimmability_en: 'Inline Cord Dimmer',
        input_voltage: '220-240V AC',
        driver_location_fa: 'مستقیم ۲۲۰ ولت',
        driver_location_en: 'Mains Voltage Integrated',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس یک (Class I)',
        insulation_class_en: 'Class I',
        energy_class: 'A+',
      },
      media: {
        hero_image_url: '/images/flos-cat-wall.jpg',
        gallery_images: ['/images/product-wall-sconce.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-WL-265-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-WL-265-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-WL-265-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-WL-265-Photometric.ies',
        cad_3d_file: '/downloads/BAL-WL-265-3DModel.step',
      },
      variants: [
        {
          name_fa: 'مشکی گرافیتی مات',
          name_en: 'Graphite Matte Black',
          sku: 'BAL-WL-265-BLK',
          finish_color_fa: 'مشکی مات',
          finish_color_en: 'Matte Black',
          hex: '#1C1C1C',
          hero_image_url: '/images/flos-cat-wall.jpg',
        },
        {
          name_fa: 'دیسک سنگ مرمر آلباستر (نمای شب)',
          name_en: 'Alabaster Halo Edition (Lit View)',
          sku: 'BAL-WL-02-ALB',
          finish_color_fa: 'مرمر آلباستر',
          finish_color_en: 'Alabaster Stone',
          hex: '#E8DEC8',
          hero_image_url: '/images/product-wall-sconce.jpg',
        },
      ],
    },
    {
      id: 5,
      slug: 'taccia-architectural-table-lamp',
      sku: 'BAL-TB-09-SLV',
      category_slug: 'sculptural',
      identity: {
        name_fa: 'چراغ رومیزی کاسه شیشه‌ای تاچیا (Taccia Indirect)',
        name_en: 'Taccia Indirect Glass Bowl Table Lamp',
        sku: 'BAL-TB-09-SLV',
        slug: 'taccia-architectural-table-lamp',
        category: 'Table & Sculptural Glass',
        category_fa: 'چراغ‌های رومیزی و دکوراتیو',
        category_slug: 'sculptural',
        designer_fa: 'استودیو طراحی بالدر',
        designer_en: 'Baldre Design Studio',
        year: 2026,
        short_description_fa: 'چراغ رومیزی نمادین با پایه ستونی آلومینیوم شیاردار و کاسه شیشه‌ای شفاف برای بازتاب غیرمستقیم نور.',
        short_description_en: 'Iconic indirect table luminaire with extruded fluted aluminum column and adjustable blown-glass bowl.',
        long_description_fa: 'نور از درون پایه ستونی شیاردار به سمت بالا تابیده و پس از برخورد به صفحه رفلکتور سفید، از طریق کاسه شیشه‌ای کریستال قابل چرخش در فضا پخش می‌شود.',
        long_description_en: 'Projecting light upward from a fluted anodized aluminum base onto a concave white reflector, Taccia offers glare-free, adjustable indirect illumination.',
      },
      physical_specs: {
        materials_fa: ['آلومینیوم اکسترود شیاردار', 'شیشه کریستال دمیده‌شده', 'رفلکتور آلومینیومی سفید'],
        materials_en: ['Fluted Anodized Aluminum', 'Mouth-Blown Crystal Glass', 'Concave Spun Aluminum'],
        finish_color_fa: 'نقره‌ای آنودایز و برنز',
        finish_color_en: 'Anodized Silver & Warm Bronze',
        dimensions: { length_mm: 495, width_mm: 495, height_mm: 645 },
        weight_kg: 7.4,
        suspension_cable_max_mm: 0,
        mounting_type_fa: 'رومیزی / زمین‌قرار دکوراتیو',
        mounting_type_en: 'Table / Low Credenza Luminaire',
      },
      electrical_and_lighting: {
        light_source_fa: 'ماژول COB با رفلکتور غیرمستقیم',
        light_source_en: 'Indirect COB Optical Reflector',
        wattage_w: 28,
        luminous_flux_lm: 2050,
        color_temperature_cct_fa: '2700K (گرم طبیعی)',
        color_temperature_cct_en: '2700K (Warm Natural)',
        color_rendering_index_cri: '>95',
        beam_angle_degrees: 120,
        dimmability_fa: 'دیمر ولومی ۱۰ تا ۱۰۰ درصد',
        dimmability_en: '10–100% Electronic Cord Dimmer',
        input_voltage: '220-240V AC',
        driver_location_fa: 'آداپتور دیمردار روی کابل',
        driver_location_en: 'Electronic dimmer on cord',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس سه (Class III)',
        insulation_class_en: 'Class III',
        energy_class: 'A+',
      },
      media: {
        hero_image_url: '/images/flos-cat-table.jpg',
        gallery_images: ['/images/flos-room-living.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-TB-09-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-TB-09-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-TB-09-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-TB-09-Photometric.ies',
        cad_3d_file: '/downloads/BAL-TB-09-3DModel.step',
      },
      variants: [
        {
          name_fa: 'نقره‌ای آنودایز',
          name_en: 'Anodized Silver',
          sku: 'BAL-TB-09-SLV',
          finish_color_fa: 'نقره‌ای مات',
          finish_color_en: 'Anodized Silver',
          hex: '#D0D2D4',
          hero_image_url: '/images/flos-cat-table.jpg',
        },
        {
          name_fa: 'برنز آنودایز تیره',
          name_en: 'Anodized Bronze',
          sku: 'BAL-TB-09-BRZ',
          finish_color_fa: 'برنز تیره',
          finish_color_en: 'Dark Bronze',
          hex: '#5C4B3B',
          hero_image_url: '/images/flos-cat-table.jpg',
        },
      ],
    },
    {
      id: 6,
      slug: 'helios-magnetic-spot-48v',
      sku: 'BAL-MG-48-WHT',
      category_slug: 'magnetic',
      identity: {
        name_fa: 'پنل و سیستم سقفی دیفیوزری آریا (Aria Soft Diffuser)',
        name_en: 'Aria Architectural Fabric & Magnetic System',
        sku: 'BAL-MG-48-WHT',
        slug: 'helios-magnetic-spot-48v',
        category: 'Ceiling & 48V Magnetic',
        category_fa: 'سقفی و مگنتی ۴۸ ولت',
        category_slug: 'magnetic',
        designer_fa: 'بخش مهندسی اپتیک بالدر',
        designer_en: 'Baldre Optical Engineering',
        year: 2026,
        short_description_fa: 'سیستم روشنایی سقفی و دیواری با بافت پارچه‌ای نسوز و اسپات‌های مگنتی ۴۸ ولت با CRI >97.',
        short_description_en: 'Soft architectural diffused surface luminaire paired with precision 48V magnetic accent optics.',
        long_description_fa: 'ترکیب منحصر‌به‌فرد نور عمومی بسیار نرم و بدون سایه (مانند نور روز از پشت پرده) به همراه اسپات‌لایت‌های مگنتی ۴۸ ولت برای تامین هم‌زمان روشنایی محیطی و تاکیدی.',
        long_description_en: 'Combining diffused ambient surface illumination with precision 48V magnetic track optics for galleries and contemporary residences.',
      },
      physical_specs: {
        materials_fa: ['بافت فایبرگلاس دیفیوزری', 'فریم آلومینیوم و برنج CNC'],
        materials_en: ['Acoustic Diffusing Fabric', 'CNC Aluminum & Brass Frame'],
        finish_color_fa: 'سفید گرم گالری و برنج مات',
        finish_color_en: 'Gallery Warm White & Brass',
        dimensions: { length_mm: 800, width_mm: 800, height_mm: 120 },
        weight_kg: 2.9,
        suspension_cable_max_mm: 0,
        mounting_type_fa: 'سقفی / دیواری و ریل ۴۸ ولت',
        mounting_type_en: 'Ceiling / Wall & 48V Track',
      },
      electrical_and_lighting: {
        light_source_fa: 'چیپ COB و آرایه SMD با CRI >97',
        light_source_en: 'High-CRI >97 Optical Array',
        wattage_w: 32,
        luminous_flux_lm: 2680,
        color_temperature_cct_fa: '2700K / 3000K (قابل انتخاب)',
        color_temperature_cct_en: '2700K / 3000K Warm Museum Grade',
        color_rendering_index_cri: '>97',
        beam_angle_degrees: 120,
        dimmability_fa: 'دالی ۲ و کازمبی (DALI-2 / Casambi)',
        dimmability_en: 'DALI-2 / Casambi Bluetooth',
        input_voltage: '48V DC / 220V AC',
        driver_location_fa: 'داخل باکس سقفی',
        driver_location_en: 'Integrated driver box',
      },
      compliance: {
        ip_rating: 'IP20',
        insulation_class_fa: 'کلاس دو (Class II)',
        insulation_class_en: 'Class II',
        energy_class: 'A++',
      },
      media: {
        hero_image_url: '/images/flos-cat-ceiling.jpg',
        gallery_images: ['/images/product-magnetic-spot.jpg'],
        dimension_diagram_url: '/diagrams/linear-01.svg',
      },
      professional_downloads: {
        data_sheet_pdf: '/downloads/BAL-MG-48-Datasheet.pdf',
        installation_manual_pdf_fa: '/downloads/BAL-MG-48-Manual-FA.pdf',
        installation_manual_pdf_en: '/downloads/BAL-MG-48-Manual-EN.pdf',
        photometric_ies_file: '/downloads/BAL-MG-48-Photometric.ies',
        cad_3d_file: '/downloads/BAL-MG-48-3DModel.step',
      },
      variants: [
        {
          name_fa: 'سفید دیفیوزری گرم',
          name_en: 'Warm Diffused White',
          sku: 'BAL-MG-48-WHT',
          finish_color_fa: 'سفید گرم',
          finish_color_en: 'Warm White',
          hex: '#F5F2EB',
          hero_image_url: '/images/flos-cat-ceiling.jpg',
        },
        {
          name_fa: 'برنج برس‌خورده و مشکی (اسپات)',
          name_en: 'Brushed Brass & Black Spot',
          sku: 'BAL-MG-48-BRS',
          finish_color_fa: 'برنج و مشکی',
          finish_color_en: 'Brass & Black',
          hex: '#C5A059',
          hero_image_url: '/images/product-magnetic-spot.jpg',
        },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      slug: 'niavaran-daylight-residence',
      code: 'PRJ-TEH-01',
      title_fa: 'پنت‌هاوس نیاوران',
      title_en: 'Niavaran Penthouse',
      location_fa: 'تهران، نیاوران',
      location_en: 'Niavaran, Tehran',
      architect_fa: 'استودیو چهار',
      architect_en: 'Chahar Studio',
      sector_fa: 'مسکونی',
      sector_en: 'Residential',
      year: 2026,
      summary_fa: 'نورپردازی خطی و دکوراتیو هماهنگ با سنگ تراورتن.',
      summary_en: 'Linear and sculptural lighting across travertine interiors.',
      image_url: '/images/flos-room-dining.jpg',
      luminaires_used: ['BAL-LS-01-BRS', 'BAL-FL-04-MRB', 'BAL-WL-265-BLK'],
      metrics_json: { area_sqm: 640, cri: '>97', cct: '2700K - 3000K', control: 'DALI-2' },
    },
    {
      id: 2,
      slug: 'fereshteh-gallery-villa',
      code: 'PRJ-TEH-02',
      title_fa: 'رزیدنس الهیه',
      title_en: 'Elahiyeh Residence',
      location_fa: 'تهران، الهیه',
      location_en: 'Elahiyeh, Tehran',
      architect_fa: 'معماران فضای سفید',
      architect_en: 'White Space Architects',
      sector_fa: 'گالری و مسکونی',
      sector_en: 'Gallery & Residence',
      year: 2026,
      summary_fa: 'نور غیرمستقیم موزه‌ای بر دیوارهای مینیمال.',
      summary_en: 'Soft indirect gallery illumination on minimalist walls.',
      image_url: '/images/flos-room-living.jpg',
      luminaires_used: ['BAL-TB-09-SLV', 'BAL-FL-04-MRB'],
      metrics_json: { area_sqm: 480, cri: '>97', cct: '2700K', control: 'Casambi' },
    },
    {
      id: 3,
      slug: 'lavasan-sanctuary-pavilion',
      code: 'PRJ-LAV-03',
      title_fa: 'ویلای لواسان',
      title_en: 'Lavasan Villa',
      location_fa: 'لواسان',
      location_en: 'Lavasan',
      architect_fa: 'خط و فضا',
      architect_en: 'Line & Void',
      sector_fa: 'ویلای اختصاصی',
      sector_en: 'Private Villa',
      year: 2026,
      summary_fa: 'گوی‌های اپال با فناوری Dim-to-Warm شبانه.',
      summary_en: 'Opal spheres with circadian Dim-to-Warm optics.',
      image_url: '/images/flos-room-bedroom.jpg',
      luminaires_used: ['BAL-FL-04-MRB', 'BAL-SC-08-SKG', 'BAL-MG-48-WHT'],
      metrics_json: { area_sqm: 1150, cri: '>95', cct: '2400K - 3000K', control: 'KNX / DALI-2' },
    },
  ],
  news: [
    {
      id: 1,
      slug: 'baldre-2026-architectural-catalogue',
      category_fa: 'کالکشن ۲۰۲۶',
      category_en: '2026 Collection',
      date_fa: 'مهر ۱۴۰۵',
      date_en: 'Oct 2026',
      title_fa: 'رونمایی از کالکشن معماری ۲۰۲۶ بالدر',
      title_en: 'The 2026 Baldre Architectural Collection',
      excerpt_fa: 'ترکیب شیشه اپال، مرمر و برنج همراه با کتابخانه کامل BIM.',
      excerpt_en: 'Opal glass, honed marble, and brass with full BIM files.',
      image_url: '/images/flos-hero-ic.jpg',
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
      image_url: '/images/flos-hero-maap.jpg',
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
      image_url: '/images/flos-hero-seki.jpg',
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
      about: 'درباره ما و شوروم',
      contact: 'تماس با ما',
    },
    hero: {
      exploreBtn: 'مشاهده محصولات',
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
      pdfUrl: '/downloads/Baldre-2026-Catalogue.pdf',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDRE STUDIO • 06',
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
      emailValue: 'info@baldre.ir',
      copyright: '© ۱۴۰۵ استودیو روشنایی بالدر — تهران.',
      resourceLinks: [
        { label: 'چراغ‌های آویز و خطی', href: '#products' },
        { label: 'چراغ‌های ایستاده و دیواری', href: '#products' },
        { label: 'سیستم‌های مگنتی ۴۸ ولت', href: '#products' },
        { label: 'پروژه‌های معماری', href: '#projects' },
      ],
    },
  },
  en: {
    brandSubtitle: 'Architectural Lighting Studio — Tehran',
    nav: {
      products: 'Products',
      projects: 'Projects',
      professionals: 'Professionals',
      about: 'About & Showroom',
      contact: 'Contact Us',
    },
    hero: {
      exploreBtn: 'Explore Products',
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
      title: 'Baldre 2026 Master Catalogue',
      description:
        'The complete 320-page reference magazine featuring 284 architectural and decorative luminaires, millimeter blueprints, photometric curves, and 48V magnetic track guides.',
      specs: '320 Pages • 284 Luminaires • Print & Digital Edition (PDF)',
      downloadPdfBtn: 'Download Catalogue PDF',
      viewPdfBtn: 'View PDF Online',
      pdfUrl: '/downloads/Baldre-2026-Catalogue.pdf',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDRE STUDIO • 06',
      title: 'About Us',
      description:
        'Baldre Architectural Lighting Studio blends brushed brass, honed marble, and hand-blown opal glass with museum-grade CRI >97 and glare-free UGR <16 optics for contemporary architecture.',
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
    footer: {
      aboutText:
        'Baldre Architectural Lighting Studio — crafting minimalist, glare-free illumination in Tehran.',
      quickLinksTitle: 'Quick Links',
      resourcesTitle: 'Collections',
      contactTitle: 'Contact',
      addressLabel: 'Address:',
      addressValue: 'Level 3, Ark Bldg, No. 142 Fereshteh St., Tehran',
      phoneLabel: 'Phone:',
      phoneValue: '+98 (21) 2620 4800',
      emailLabel: 'Email:',
      emailValue: 'info@baldre.ir',
      copyright: '© 2026 Baldre Lighting Studio — Tehran.',
      resourceLinks: [
        { label: 'Pendant & Linear', href: '#products' },
        { label: 'Floor & Wall', href: '#products' },
        { label: '48V Magnetic Track', href: '#products' },
        { label: 'Selected Projects', href: '#projects' },
      ],
    },
  },
};


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
    tag_fa: 'کالکشن ۲۰۲۶ • طراحی روز و معماری',
    tag_en: '2026 ARCHITECTURAL MONOGRAPH',
    title_fa: 'تندیس‌های نور در روشناییِ روز',
    title_en: 'Sculpting Space With Pure Daylight & Form',
    subtitle_fa:
      'هم‌نشینی شاعرانه برنج برس‌خورده، شیشه اپال دست‌ساز و سنگ مرمر طبیعی؛ چراغ‌هایی که در روشنایی روز یک اثر هنری مینیمال و در شب سرچشمه آرامش‌اند.',
    subtitle_en:
      'Where Italian-inspired minimalism meets museum-grade CRI >97 optics. Luminaires crafted to command presence in natural daylight and dissolve into warm glow at dusk.',
    designer_fa: 'استودیو طراحی بالدر — تهران',
    designer_en: 'Baldre Design Studio — Tehran',
    day_image: '/images/flos-hero-daylight.jpg',
    night_image: '/images/hero-architectural-lighting.jpg',
    featured_sku: 'BAL-LS-01-BRS',
  },
  {
    id: 'slide-02',
    tag_fa: 'آیکون‌های مدرن • تعادل هندسی',
    tag_en: 'MODERN ICONS • POETIC BALANCE',
    title_fa: 'تعادلِ بی‌وزنِ گوی و برنج در فضا',
    title_en: 'Poetic Equilibrium of Sphere & Brass',
    subtitle_fa:
      'مجموعه لونا (Luna Series) با گوی‌های شیشه‌ای اپال دوپوسته و ستون‌های ظریف برنجی، نوری ۳۶۰ درجه و مخملی بدون کوچک‌ترین خیرگی در فضا پخش می‌کند.',
    subtitle_en:
      'Mouth-blown opal glass spheres poised gently on slender brushed brass stems, diffusing soft 360-degree luminance across serene interiors.',
    designer_fa: 'کالکشن دکوراتیو بالدر',
    designer_en: 'Baldre Decorative Collection',
    day_image: '/images/flos-hero-ic.jpg',
    night_image: '/images/product-floor-monolith.jpg',
    featured_sku: 'BAL-FL-04-MRB',
  },
  {
    id: 'slide-03',
    tag_fa: 'نورِ نرمِ معمارانه • سطوح دیفیوزری',
    tag_en: 'TACTILE LUMINESCENCE • SOFT VOLUME',
    title_fa: 'لطافتِ نورِ طبیعی بر بومِ معماری',
    title_en: 'Tactile Volume & Soft Diffused Light',
    subtitle_fa:
      'الهام‌گرفته از بافت کاغذ و پارچه‌های معماری برای خلق حجم‌های نوری آرامش‌بخش با دمای رنگ ۲۷۰۰ کلوین و کنترل هوشمند DALI-2.',
    subtitle_en:
      'Organic sculptural volumes engineered to wraps walls and ceilings in a warm, shadowless 2700K architectural embrace.',
    designer_fa: 'بخش مهندسی اپتیک بالدر',
    designer_en: 'Baldre Optical Lab',
    day_image: '/images/flos-hero-maap.jpg',
    night_image: '/images/product-sculptural-pendant.jpg',
    featured_sku: 'BAL-MG-48-WHT',
  },
];

export const FLOS_CATEGORY_STRIP: FlosCategoryCard[] = [
  {
    slug: 'pendant-strip',
    filterSlug: 'pendant',
    name_fa: 'چراغ‌های آویز و خطی',
    name_en: 'Pendant Lamps',
    count: 86,
    image_url: '/images/flos-cat-pendant.jpg',
  },
  {
    slug: 'table-strip',
    filterSlug: 'sculptural',
    name_fa: 'چراغ‌های رومیزی',
    name_en: 'Table Lamps',
    count: 42,
    image_url: '/images/flos-cat-table.jpg',
  },
  {
    slug: 'floor-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های ایستاده',
    name_en: 'Floor Lamps',
    count: 34,
    image_url: '/images/flos-cat-floor.jpg',
  },
  {
    slug: 'wall-strip',
    filterSlug: 'wall-floor',
    name_fa: 'چراغ‌های دیواری',
    name_en: 'Wall Lamps',
    count: 48,
    image_url: '/images/flos-cat-wall.jpg',
  },
  {
    slug: 'ceiling-strip',
    filterSlug: 'magnetic',
    name_fa: 'سقفی و مگنتی ۴۸ ولت',
    name_en: 'Ceiling & Track',
    count: 64,
    image_url: '/images/flos-cat-ceiling.jpg',
  },
  {
    slug: 'portable-strip',
    filterSlug: 'outdoor',
    name_fa: 'پرتابل و فضای باز',
    name_en: 'Portable & Outdoor',
    count: 38,
    image_url: '/images/flos-cat-portable.jpg',
  },
];

export const FLOS_ROOMS: FlosRoomSpace[] = [
  {
    id: 'dining',
    name_fa: 'فضای ناهارخوری و پذیرایی',
    name_en: 'Dining Room',
    caption_fa: 'تمرکز نور گرم بر محور گردهمایی و بافت سنگ طبیعی',
    caption_en: 'Sculpted downward illumination anchoring architectural dining tables',
    description_fa:
      'در فضای ناهارخوری، چراغ آویز نقطه کانونی معماری است. استفاده از آویزهای خطی یا گنبدی با شاخص نمود رنگ CRI >95 و خیرگی کنترل‌شده (UGR <16) باعث می‌شود رنگ طبیعی غذا، چوب و سنگ مرمر با وضوح موزه‌ای دیده شود و چهره‌ها در نوری گرم و دلنشین قرار گیرند.',
    description_en:
      'Suspended luminaires define the architectural axis of the dining room. Glare-free downward optics (UGR <16) paired with CRI >95 render natural stone, timber, and gatherings with intimate warmth.',
    image_url: '/images/flos-room-dining.jpg',
    featured_skus: ['BAL-LS-01-BRS', 'BAL-SC-08-SKG'],
  },
  {
    id: 'living',
    name_fa: 'نشیمن مدرن و گالری خانگی',
    name_en: 'Living Space',
    caption_fa: 'لایه‌بندی نور غیرمستقیم، بازوهای متحرک و آرامش بصری',
    caption_en: 'Layered indirect ambiance and kinetic task lighting for refined living',
    description_fa:
      'فضای نشیمن نیازمند انعطاف‌پذیری در طول شبانه‌روز است؛ ترکیب چراغ‌های رومیزی با بازتاب غیرمستقیم (Taccia)، دیوارکوب‌های بازویی متحرک (265) و سیستم‌های مگنتی سقفی، امکان تغییر اتمسفر از روشنایی روزانه به سکوت گرم شبانه را فراهم می‌سازد.',
    description_en:
      'Living spaces demand versatility across the day. Combining indirect glass-bowl table lamps, articulating counterweight wall arms, and soft ceiling diffusers creates effortless spatial depth.',
    image_url: '/images/flos-room-living.jpg',
    featured_skus: ['BAL-TB-09-SLV', 'BAL-WL-265-BLK'],
  },
  {
    id: 'bedroom',
    name_fa: 'اتاق خواب و فضاهای خصوصی',
    name_en: 'Sanctuary & Bedroom',
    caption_fa: 'گوی‌های شیشه‌ای اپال با فناوری Dim-to-Warm (۲۷۰۰ کلوین)',
    caption_en: 'Serene opal spheres with circadian Dim-to-Warm 2700K technology',
    description_fa:
      'برای فضاهای استراحت و خلوت، حذف هرگونه منبع نور نقطه‌ای و تند ضروری است. گوی‌های شیشه‌ای اپال دست‌ساز بالدر با پخش ۳۶۰ درجه و دیمرهای پیوسته، نوری شبیه به غروب آرام خورشید ایجاد می‌کنند.',
    description_en:
      'Private sanctuaries call for zero visual glare. Mouth-blown opal glass diffusers and warm-dimming drivers lower color temperature smoothly as evening settles.',
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
      title_fa: 'پنت‌هاوس روشن نیاوران — هم‌نشینی سنگ تراورتن، چوب بلوط و نور خطی',
      title_en: 'Niavaran Residence — Travertine, Oak & Suspended Light',
      location_fa: 'تهران، نیاوران',
      location_en: 'Niavaran, Tehran',
      architect_fa: 'دفتر معماری استودیو چهار',
      architect_en: 'Chahar Architectural Studio',
      sector_fa: 'مسکونی مدرن (Contemporary Residential)',
      sector_en: 'Contemporary Residential',
      year: 2026,
      summary_fa: 'طراحی روشنایی روز و شب برای فضای ناهارخوری و نشیمن ۳۸۰ متری با استفاده از آویزهای خطی متقاطع بالدر و چراغ‌های ایستاده مرمرین.',
      summary_en: 'Harmonizing natural daylight and warm 2700K evening scenes across a sunlit travertine dining hall and minimalist living space.',
      image_url: '/images/flos-room-dining.jpg',
      luminaires_used: ['BAL-LS-01-BRS', 'BAL-FL-04-MRB', 'BAL-WL-265-BLK'],
      metrics_json: { area_sqm: 640, cri: '>97', cct: '2700K - 3000K', control: 'DALI-2 / Casambi' },
    },
    {
      id: 2,
      slug: 'fereshteh-gallery-villa',
      code: 'PRJ-TEH-02',
      title_fa: 'آپارتمان کلکسیونی الهیه — مجسمه‌های نوری در فضای مینیمال',
      title_en: 'Elahiyeh Collector’s Apartment — Sculptural Luminaires',
      location_fa: 'تهران، الهیه — خیابان فرشته',
      location_en: 'Elahiyeh, Tehran',
      architect_fa: 'گروه معماری فضای سفید',
      architect_en: 'White Space Architects',
      sector_fa: 'مسکونی و گالری شخصی (Private Collection)',
      sector_en: 'Private Gallery & Residence',
      year: 2026,
      summary_fa: 'استفاده از چراغ‌های رومیزی و ایستاده با پخش نور غیرمستقیم بر روی دیوارهای گچی سفید برای ایجاد اتمسفری آرام و موزه‌ای.',
      summary_en: 'Soft diffused luminance across lime-washed plaster walls utilizing indirect table and floor luminaires.',
      image_url: '/images/flos-room-living.jpg',
      luminaires_used: ['BAL-TB-09-SLV', 'BAL-FL-04-MRB'],
      metrics_json: { area_sqm: 480, cri: '>97', cct: '2700K Warm', control: 'Casambi Wireless' },
    },
    {
      id: 3,
      slug: 'lavasan-sanctuary-pavilion',
      code: 'PRJ-LAV-03',
      title_fa: 'ویلای مدرن لواسان — آرامش نور گرم در فضاهای خصوصی',
      title_en: 'Lavasan Minimalist Villa — Poetic Sanctuary Light',
      location_fa: 'لواسان، تهران',
      location_en: 'Lavasan, Tehran',
      architect_fa: 'مهندسان مشاور خط و فضا',
      architect_en: 'Line & Void Architecture',
      sector_fa: 'ویلای اختصاصی (Private Villa)',
      sector_en: 'Private Architectural Villa',
      year: 2026,
      summary_fa: 'ترکیب گوی‌های شیشه‌ای اپال با سیستم کنترل هوشمند Dim-to-Warm برای تطبیق دمای رنگ نور با ساعت بیولوژیک بدن.',
      summary_en: 'Opal glass spheres with circadian Dim-to-Warm optics tailored for serene architectural interiors.',
      image_url: '/images/flos-room-bedroom.jpg',
      luminaires_used: ['BAL-FL-04-MRB', 'BAL-SC-08-SKG', 'BAL-MG-48-WHT'],
      metrics_json: { area_sqm: 1150, cri: '>95', cct: '2400K - 3000K', control: 'KNX / DALI-2' },
    },
  ],
  news: [
    {
      id: 1,
      slug: 'baldre-2026-architectural-catalogue',
      category_fa: 'کالکشن ۲۰۲۶ • طراحی معاصر',
      category_en: '2026 Monograph • New Release',
      date_fa: 'مهر ۱۴۰۵',
      date_en: 'October 2026',
      title_fa: 'رونمایی از کالکشن روشنایی روز و معماری بالدر ۲۰۲۶ به همراه کتابخانه کامل IES و 3D',
      title_en: 'The 2026 Baldre Architectural & Decorative Collection: Poetic Form Meets Optical Precision',
      excerpt_fa: 'مجموعه جدید بالدر با تمرکز بر متریال‌های اصیل همچون شیشه اپال دمیده‌شده، سنگ مرمر سفید، برنج برس‌خورده و آلومینیوم اکسترود شده به همراه فایل‌های BIM/DIALux منتشر شد.',
      excerpt_en: 'Exploring the dialogue between mouth-blown opal glass, honed marble, and ultra-slim linear aluminum profiles.',
      image_url: '/images/flos-hero-ic.jpg',
      location_badge_fa: 'شوروم فرشته تهران',
      location_badge_en: 'Tehran Flagship Studio',
    },
    {
      id: 2,
      slug: 'philosophy-of-invisible-light-workshop',
      category_fa: 'فرهنگ نور • مصاحبه و پژوهش',
      category_en: 'A Culture of Light • Essay',
      date_fa: 'آبان ۱۴۰۵',
      date_en: 'November 2026',
      title_fa: 'فراتر از روشنایی: چگونه نورِ ۲۷۰۰ کلوین و دیفیوزرهای اپال حس آرامش فضا را دگرگون می‌کنند؟',
      title_en: 'Behind the Design: How Diffused Opal & Warm 2700K Spectrums Shape Human Emotion',
      excerpt_fa: 'نگاهی عمیق به مهندسی دیفیوزرهای چندلایه و نقش شاخص نمود رنگ CRI بالای ۹۷ در نمایش طبیعی رنگ‌های گرم چوب، پارچه و سنگ در معماری مدرن.',
      excerpt_en: 'An architectural study on glare-free luminance, tactile materials, and human-centric lighting.',
      image_url: '/images/flos-hero-maap.jpg',
      location_badge_fa: 'مقاله تخصصی',
      location_badge_en: 'Design Monograph',
    },
    {
      id: 3,
      slug: 'dali2-casambi-smart-integration',
      category_fa: 'مهندسی و معماران',
      category_en: 'Architectural Systems',
      date_fa: 'آذر ۱۴۰۵',
      date_en: 'December 2026',
      title_fa: 'راهنمای جامع یکپارچه‌سازی سیستم‌های خطی و دکوراتیو با پروتکل‌های هوشمند DALI-2 و Casambi',
      title_en: 'Seamless Smart Control: Specifying DALI-2 & Casambi Across Residential & Gallery Spaces',
      excerpt_fa: 'امکان کنترل بی‌سیم و تعریف سناریوهای نوری صبح، عصر و شب از طریق اپلیکیشن و کلیدهای هوشمند بدون نیاز به سیم‌کشی پیچیده.',
      excerpt_en: 'Effortless scene programming from bright daylight task clarity to warm evening ambiance.',
      image_url: '/images/flos-hero-seki.jpg',
      location_badge_fa: 'ویژه دفاتر معماری',
      location_badge_en: 'B2B Specification Guide',
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
      showroom: 'شوروم',
    },
    hero: {
      exploreBtn: 'مشاهده محصولات',
      inspectBtn: 'بررسی شناسنامه فنی چراغ',
      sceneModeLabel: 'حالت نمایش صحنه:',
      dayMode: 'نمای روز',
      nightMode: 'نمای شب',
      slidePrev: 'قبلی',
      slideNext: 'بعدی',
    },
    categoryStrip: {
      eyebrow: 'PRODUCT CATEGORIES • 01',
      title: 'دسته‌بندی محصولات روشنایی',
      subtitle:
        'از آویزهای مجسمه‌وار و چراغ‌های رومیزی نمادین تا سیستم‌های خطی و مگنتی معماری، مهندسی‌شده برای فضاهای مدرن و ماندگار.',
      viewAll: 'مشاهده همه ۲۸۴ محصول',
    },
    productsSection: {
      eyebrow: 'FLAGSHIP COLLECTION • 02',
      title: 'گزیده محصولات شاخص بالدر',
      subtitle:
        'طراحی مینیمال، روشن و دقیق بر اساس استانداردهای فتومتریک بین‌المللی. روی هر محصول کلیک کنید تا دیتاشیت فنی، نقشه میلی‌متری و فایل‌های سه‌بعدی (CAD/IES) را دریافت کنید.',
      filterAll: 'همه محصولات',
      inspectSpecs: 'شناسنامه فنی و دانلود CAD / IES',
      hoverHint: 'نگه‌داشتن ماوس: نمای روشن',
      wattage: 'توان',
      lumens: 'شار نوری',
      cct: 'دمای رنگ',
      cri: 'نمود رنگ',
      beam: 'زاویه تابش',
    },
    roomsSection: {
      eyebrow: 'ARCHITECTURAL SPACES • 03',
      title: 'انتخاب چراغ به تفکیک فضای معماری',
      subtitle:
        'ببینید چگونه چراغ‌های بالدر در فضاهای ناهارخوری، نشیمن و اتاق خواب با نور طبیعی روز و آرامش شب هماهنگ می‌شوند.',
      featuredInRoom: 'چراغ‌های به کار رفته در این فضا:',
      inspectProduct: 'مشاهده مشخصات فنی',
    },
    projectsSection: {
      eyebrow: 'SELECTED PROJECTS • 04',
      title: 'پروژه‌های منتخب معماری در تهران و لواسان',
      subtitle:
        'همکاری مستقیم با برجسته‌ترین دفاتر معماری در خلق فضاهای مسکونی لوکس، گالری‌های هنری و ویلاهای مدرن با استانداردهای نوری موزه‌ای.',
      architectLabel: 'دفتر معماری:',
      locationLabel: 'موقعیت:',
      areaLabel: 'متراژ:',
      controlLabel: 'سیستم کنترل:',
      usedLuminaires: 'کدهای چراغ اجراشده در این پروژه:',
    },
    professionalsSection: {
      eyebrow: 'PROFESSIONALS & B2B HUB • 05',
      title: 'پرتال مهندسی ویژه معماران و طراحان روشنایی',
      subtitle:
        'دسترسی مستقیم معماران و طراحان داخلی به فایل‌های فتومتریک استاندارد (.IES / .LDT) برای نرم‌افزار DIALux، آبجکت‌های سه‌بعدی دقیقه میلی‌متری و شبیه‌ساز زاویه تابش.',
      cards: [
        {
          badge: 'IES / LDT PHOTOMETRICS',
          title: 'کتابخانه کامل فایل‌های نورسنجی DIALux',
          desc: 'منحنی‌های فتومتریک تست‌شده جهت محاسبه دقیق لوکس نوری، یکنواختی تابش و کنترل خیرگی در پروژه‌های معماری.',
          action: 'دانلود آرشیو کامل IES (۲۰۲۶)',
        },
        {
          badge: '3D BIM / CAD BLOCKS',
          title: 'مدل‌های سه‌بعدی دقیق (Revit / 3ds Max / STEP)',
          desc: 'آبجکت‌های سه‌بعدی استاندارد با جزئیات دقیق متریال برنج، مرمر و شیشه اپال برای رندرهای معماری و نقشه‌های فاز دو.',
          action: 'دانلود پکیج سه‌بعدی و CAD',
        },
        {
          badge: '2026 MASTER MONOGRAPH',
          title: 'کاتالوگ جامع چاپی و دیجیتال بالدر',
          desc: 'بیش از ۳۲۰ صفحه مشخصات فنی، دیتیل‌های نصب توکار و روکار، راهنمای درایورهای DALI-2 و فهرست کامل ۲۸۴ محصول.',
          action: 'دانلود کاتالوگ جامع (PDF)',
        },
      ],
    },
    opticsSection: {
      eyebrow: 'PHOTOMETRIC SIMULATOR',
      title: 'آزمایشگاه مهندسی زاویه تابش و دمای رنگ (CCT)',
      subtitle:
        'ابزار تعاملی ویژه معماران جهت بررسی دقیق مخروط تابش نور، میزان لوکس در فاصله ۲ متری و تاثیر دمای رنگ کلوین بر متریال‌های سنگ و چوب.',
      selectBeam: 'زاویه پخش نور (Beam Angle):',
      selectKelvin: 'دمای رنگ (Color Temperature):',
      luxAt2m: 'شدت روشنایی در فاصله ۲ متری:',
      recommendedUse: 'کاربرد پیشنهادی در معماری:',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDRE STUDIO • 06',
      title: 'درباره بالدر: پیوند هنر، متریال اصیل و مهندسی اپتیک',
      description:
        'در استودیو طراحی و مهندسی روشنایی بالدر، هر چراغ پیش از آنکه روشن شود، به عنوان یک حجم معماری خالص در روشنایی روز طراحی می‌شود. ما با الهام از مکتب طراحی مدرن ایتالیا و بهره‌گیری از متریال‌های اصیل همچون برنج برس‌خورده، سنگ مرمر سفید، شیشه اپال دست‌ساز و لنزهای اپتیکال بدون خیرگی (UGR <16)، محصولاتی خلق می‌کنیم که کیفیت فضایی معماری معاصر ایران را ارتقا می‌دهند.',
      philosophySecond:
        'تمامی ۲۸۴ محصول کلکسیون بالدر با شاخص نمود رنگ موزه‌ای (CRI >97) و قابلیت یکپارچه‌سازی با پروتکل‌های هوشمند DALI-2 و Casambi مهندسی شده‌اند تا بافت واقعی سنگ، چوب و آثار هنری در طبیعی‌ترین طیف نوری ممکن دیده شود.',
      ctaPrimary: 'مشاهده فضای شوروم تهران',
      ctaSecondary: 'دریافت مونوگراف و کاتالوگ ۲۰۲۶',
      cultureTitle: 'فرهنگِ نور و پژوهش‌های طراحی بالدر',
      cultureSubtitle: 'مقالات تخصصی، رویدادهای معماری و نوآوری‌های اپتیکال استودیو بالدر.',
    },
    showroomSection: {
      eyebrow: 'TEHRAN FLAGSHIP SHOWROOM • 07',
      title: 'شوروم مرکزی بالدر در خیابان فرشته تهران',
      subtitle:
        'در فضای گالری‌گونه شوروم فرشته، می‌توانید کیفیت واقعی تابش چراغ‌ها، بافت متریال‌های برنج و مرمر، و سناریوهای هوشمند روز و شب را از نزدیک تجربه کنید.',
      highlights: [
        {
          title: 'اتاق تست نوری و شبیه‌سازی (Light Lab)',
          desc: 'امکان بررسی زنده زاویه تابش، خیرگی (UGR) و دمای رنگ چراغ‌ها بر روی نمونه‌های سنگ، چوب و بتن پروژه شما.',
        },
        {
          title: 'سرویس ارسال نمونه چراغ به پروژه (On-Site Mock-Up)',
          desc: 'تامین و نصب آزمایشی چراغ‌های منتخب در محل پروژه در حال ساخت شما جهت تایید نهایی معمار و کارفرما.',
        },
        {
          title: 'جلسات اختصاصی ویژه دفاتر معماری (VIP B2B)',
          desc: 'برگزاری جلسات فنی بررسی نقشه‌های اتوکد و محاسبات DIALux با حضور مهندسان اپتیک بالدر.',
        },
      ],
      addressTitle: 'آدرس شوروم فرشته:',
      addressText: 'تهران، الهیه، خیابان فرشته (شهید فیاضی)، پلاک ۱۴۲، ساختمان آرک، طبقه سوم — استودیو و شوروم بالدر',
      hoursTitle: 'ساعات بازدید:',
      hoursText: 'شنبه تا پنجشنبه — ساعت ۱۰:۰۰ الی ۲۰:۰۰ (همراه با پارکینگ اختصاصی مراجعین)',
      bookBtn: 'رزرو وقت بازدید از شوروم',
    },
    contactSection: {
      eyebrow: 'CONTACT US • 08',
      title: 'تماس با ما و درخواست مشاوره مهندسی پروژه',
      subtitle:
        'تیم مهندسی فروش و طراحی روشنایی بالدر آماده پاسخگویی، ارائه لیست قیمت همکاری، محاسبات نوری DIALux و هماهنگی بازدید از شوروم است.',
      phoneTitle: 'تلفن مستقیم مهندسی فروش:',
      emailTitle: 'پست الکترونیک و ارسال نقشه‌ها:',
      studioHoursTitle: 'پاسخگویی دفتر مرکزی:',
      studioHoursText: 'شنبه تا پنجشنبه — ساعت ۰۹:۰۰ الی ۲۰:۰۰',
      formName: 'نام و نام خانوادگی',
      formStudio: 'نام دفتر معماری / کارفرما',
      formContact: 'شماره تماس یا ایمیل',
      formProjectType: 'موضوع درخواست / نوع پروژه',
      formMessage: 'توضیحات درخواست (مشاوره پروژه، رزرو بازدید شوروم یا استعلام کدهای محصول)',
      formSubmit: 'ارسال پیام و ثبت درخواست مشاوره',
      formSubmitting: 'در حال ثبت درخواست شما...',
    },
    modal: {
      close: 'بستن شناسنامه فنی',
      identityTab: 'مشخصات فیزیکی و متریال',
      electricalTab: 'پارامترهای الکتریکی و نوری',
      downloadsTitle: 'فایل‌های فنی و مهندسی (ویژه معماران)',
      blueprintTitle: 'نقشه فنی و ابعاد مهندسی (mm)',
      selectVariant: 'انتخاب فینیش و متریال:',
      datasheetBtn: 'دیتاشیت فنی (PDF)',
      manualBtn: 'راهنمای نصب (PDF)',
      iesBtn: 'فایل نورسنجی (IES)',
      cadBtn: 'مدل سه‌بعدی (STEP/CAD)',
    },
  },
  en: {
    brandSubtitle: 'Architectural Lighting Studio — Tehran',
    nav: {
      products: 'Products',
      projects: 'Projects',
      professionals: 'Professionals',
      about: 'About',
      contact: 'Contact Us',
      showroom: 'Showroom',
    },
    hero: {
      exploreBtn: 'Explore Products',
      inspectBtn: 'Inspect Luminaire Specs',
      sceneModeLabel: 'Atmosphere Mode:',
      dayMode: 'Daylight',
      nightMode: 'Evening',
      slidePrev: 'Prev',
      slideNext: 'Next',
    },
    categoryStrip: {
      eyebrow: 'PRODUCT CATEGORIES • 01',
      title: 'Light by Category',
      subtitle:
        'From poetic blown-glass table icons to ultra-slim architectural linear and 48V magnetic systems crafted for timeless interiors.',
      viewAll: 'View All 284 Luminaires',
    },
    productsSection: {
      eyebrow: 'FLAGSHIP COLLECTION • 02',
      title: 'Signature Architectural & Decorative Luminaires',
      subtitle:
        'Presented in a clean, gallery-lit studio format. Click any luminaire to inspect its full photometric datasheet, millimeter blueprint, and B2B CAD/IES files.',
      filterAll: 'All Luminaires',
      inspectSpecs: 'Technical Datasheet & CAD / IES',
      hoverHint: 'Hover for Evening Lit View',
      wattage: 'Power',
      lumens: 'Flux',
      cct: 'CCT',
      cri: 'CRI',
      beam: 'Beam',
    },
    roomsSection: {
      eyebrow: 'ARCHITECTURAL SPACES • 03',
      title: 'Explore Lighting by Architectural Space',
      subtitle:
        'Discover how Baldre luminaires shape sunlit dining rooms, minimalist living spaces, and serene private sanctuaries.',
      featuredInRoom: 'Luminaires featured in this space:',
      inspectProduct: 'Inspect Technical Specs',
    },
    projectsSection: {
      eyebrow: 'SELECTED PROJECTS • 04',
      title: 'Selected Residential & Gallery Commissions',
      subtitle:
        'Partnering with leading architectural studios across Tehran and Lavasan to craft luminous, minimalist interiors with museum-grade optics.',
      architectLabel: 'Architect:',
      locationLabel: 'Location:',
      areaLabel: 'Area:',
      controlLabel: 'Control:',
      usedLuminaires: 'Specified Luminaires:',
    },
    professionalsSection: {
      eyebrow: 'PROFESSIONALS & B2B HUB • 05',
      title: 'Professionals & B2B Specification Hub',
      subtitle:
        'Direct access for architects and lighting designers to laboratory-verified .IES / .LDT photometric files for DIALux/Relux, 3D BIM/CAD blocks, and our interactive beam simulator.',
      cards: [
        {
          badge: 'IES / LDT PHOTOMETRICS',
          title: 'Complete DIALux & Relux Photometric Library',
          desc: 'Verified photometric distribution curves for accurate lux calculations, uniformity ratios, and UGR glare evaluation.',
          action: 'Download 2026 IES Archive',
        },
        {
          badge: '3D BIM / CAD BLOCKS',
          title: 'Millimeter-Accurate 3D Models (Revit / 3ds Max)',
          desc: 'Clean .STEP, .DWG, and .RFA packages with authentic brass, marble, and opal glass material definitions.',
          action: 'Download 3D & CAD Pack',
        },
        {
          badge: '2026 MASTER MONOGRAPH',
          title: 'Baldre 2026 Architectural Monograph PDF',
          desc: '320+ pages of bilingual technical specifications, recessed cutout details, 48V track schematics, and DALI-2 matrices.',
          action: 'Download Master Monograph',
        },
      ],
    },
    opticsSection: {
      eyebrow: 'PHOTOMETRIC SIMULATOR',
      title: 'Interactive Goniophotometric Beam & CCT Lab',
      subtitle:
        'An engineering specification tool for architects to simulate optical beam angles, center lux illuminance at 2.0m, and Kelvin warmth.',
      selectBeam: 'Optical Beam Angle:',
      selectKelvin: 'Color Temperature (CCT):',
      luxAt2m: 'Center Illuminance @ 2.0m:',
      recommendedUse: 'Recommended Architectural Application:',
    },
    aboutSection: {
      eyebrow: 'ABOUT BALDRE STUDIO • 06',
      title: 'About Baldre: Poetic Form Meets Optical Engineering',
      description:
        'At Baldre Architectural Lighting Studio, every luminaire is conceived first as a pure sculptural object in natural daylight. Inspired by Italian minimalist design heritage and crafted from honed Carrara marble, brushed champagne brass, mouth-blown opal glass, and glare-free UGR <16 optics, our fixtures elevate contemporary architecture.',
      philosophySecond:
        'All 284 luminaires in the Baldre collection are engineered with museum-grade CRI >97 LED cores and native DALI-2 / Casambi smart protocols, rendering natural stone, timber, and fine art with absolute fidelity.',
      ctaPrimary: 'Discover Tehran Showroom',
      ctaSecondary: 'Download 2026 Monograph (PDF)',
      cultureTitle: 'A Culture of Light: Essays & Research',
      cultureSubtitle: 'Editorial dispatches from Baldre Studio on architectural acoustics, blown-glass craft, and circadian lighting.',
    },
    showroomSection: {
      eyebrow: 'TEHRAN FLAGSHIP SHOWROOM • 07',
      title: 'Baldre Flagship Showroom on Fereshteh Street',
      subtitle:
        'Experience the tactile warmth of brushed brass, honed marble, and museum-grade 2700K illumination in person at our gallery showroom in Elahiyeh, Tehran.',
      highlights: [
        {
          title: 'Interactive Dark & Daylight Testing Suite',
          desc: 'Test beam angles, UGR glare comfort, and Kelvin color rendering directly against your project’s stone, wood, and fabric samples.',
        },
        {
          title: 'On-Site Luminaire Mock-Up Service',
          desc: 'We provide physical sample luminaires on your active construction site for final architectural and client sign-off.',
        },
        {
          title: 'Private Architect Specification Sessions',
          desc: 'One-on-one engineering consultations to review AutoCAD reflected ceiling plans and DIALux photometric calculations.',
        },
      ],
      addressTitle: 'Showroom Address:',
      addressText: 'Level 3, Ark Building, No. 142 Fereshteh St. (Elahiyeh), Tehran, Iran — Baldre Lighting Studio',
      hoursTitle: 'Visiting Hours:',
      hoursText: 'Saturday to Thursday — 10:00 AM to 8:00 PM (Dedicated client parking available)',
      bookBtn: 'Schedule a Showroom Visit',
    },
    contactSection: {
      eyebrow: 'CONTACT US • 08',
      title: 'Contact Us & Project Lighting Consultation',
      subtitle:
        'Our lighting engineers and specification specialists are ready to assist with DIALux calculations, B2B trade inquiries, and private showroom appointments.',
      phoneTitle: 'Direct Engineering & Sales Desk:',
      emailTitle: 'Architectural Plans & Inquiries:',
      studioHoursTitle: 'Engineering Office Hours:',
      studioHoursText: 'Saturday to Thursday — 9:00 AM to 8:00 PM',
      formName: 'Full Name',
      formStudio: 'Architecture Firm / Studio',
      formContact: 'Phone Number or Email',
      formProjectType: 'Inquiry Type / Project Sector',
      formMessage: 'Message Details (Project Area, Showroom Appointment, or Requested SKUs)',
      formSubmit: 'Send Message & Request Consultation',
      formSubmitting: 'Submitting Request...',
    },
    modal: {
      close: 'Close Datasheet',
      identityTab: 'Physical & Material Specs',
      electricalTab: 'Electrical & Photometrics',
      downloadsTitle: 'Professional B2B Downloads (Architects)',
      blueprintTitle: 'Millimeter Engineering Blueprint (mm)',
      selectVariant: 'Select Finish & Material:',
      datasheetBtn: 'Technical Datasheet (PDF)',
      manualBtn: 'Installation Manual (PDF)',
      iesBtn: 'Photometric File (.IES)',
      cadBtn: '3D CAD Model (.STEP)',
    },
  },
};

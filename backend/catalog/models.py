from django.db import models


class Category(models.Model):
    slug = models.SlugField(unique=True)
    name_fa = models.CharField(max_length=120)
    name_en = models.CharField(max_length=120)
    subtitle_fa = models.CharField(max_length=255)
    subtitle_en = models.CharField(max_length=255)
    product_count = models.PositiveIntegerField(default=48)
    image_url = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Category (دسته‌بندی)'
        verbose_name_plural = 'Categories (دسته‌بندی‌ها)'

    def __str__(self):
        return f"{self.name_fa} / {self.name_en}"


def default_dimensions():
    return {"length_mm": 600, "width_mm": 60, "height_mm": 80}


def default_materials_fa():
    return ["برنج برس‌خورده", "آلومینیوم آنودایز", "دیفیوزر اپتیکال"]


def default_materials_en():
    return ["Brushed Brass", "Anodized Aluminum", "Optical Diffuser"]


def default_gallery_images():
    return ["/images/flos-prod-pendant.webp"]


def default_professional_downloads():
    return {
        "data_sheet_pdf": "/downloads/Baldr-2026-Catalogue.pdf",
        "installation_manual_pdf_fa": "/downloads/Baldr-2026-Catalogue.pdf",
        "installation_manual_pdf_en": "/downloads/Baldr-2026-Catalogue.pdf",
        "photometric_ies_file": "/downloads/BAL-LS-01-Photometric.ies",
        "cad_3d_file": "/downloads/BAL-LS-01-3DModel.step",
    }


class Product(models.Model):
    # 1. Core Identity & Marketing (Bilingual)
    name_fa = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200)
    sku = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    designer_fa = models.CharField(max_length=120, default='استودیو طراحی بالدر', blank=True)
    designer_en = models.CharField(max_length=120, default='Baldr Design Studio', blank=True)
    year = models.PositiveIntegerField(default=2026)
    short_description_fa = models.TextField()
    short_description_en = models.TextField()
    long_description_fa = models.TextField(blank=True, default='')
    long_description_en = models.TextField(blank=True, default='')

    # 2. Physical & Material Specifications
    materials_fa = models.JSONField(default=default_materials_fa, blank=True)
    materials_en = models.JSONField(default=default_materials_en, blank=True)
    finish_color_fa = models.CharField(max_length=100, default='برنج شامپاینی و مشکی مات', blank=True)
    finish_color_en = models.CharField(max_length=100, default='Champagne Brass & Matte Black', blank=True)
    dimensions = models.JSONField(default=default_dimensions, blank=True)
    weight_kg = models.FloatField(default=2.4)
    suspension_cable_max_mm = models.PositiveIntegerField(default=2000)
    mounting_type_fa = models.CharField(max_length=120, default='سقفی / آویز معماری', blank=True)
    mounting_type_en = models.CharField(max_length=120, default='Suspended / Surface Mounted', blank=True)

    # 3. Electrical & Photometric Specifications
    light_source_fa = models.CharField(max_length=120, default='ال‌ای‌دی یکپارچه (Integrated LED)', blank=True)
    light_source_en = models.CharField(max_length=120, default='Integrated LED', blank=True)
    wattage_w = models.PositiveIntegerField(default=36)
    luminous_flux_lm = models.PositiveIntegerField(default=3200)
    color_temperature_cct_fa = models.CharField(max_length=100, default='3000K (سفید گرم)', blank=True)
    color_temperature_cct_en = models.CharField(max_length=100, default='3000K (Warm White)', blank=True)
    color_rendering_index_cri = models.CharField(max_length=30, default='>95', blank=True)
    beam_angle_degrees = models.PositiveIntegerField(default=90)
    dimmability_fa = models.CharField(max_length=120, default='دالی ۲ / پوش دیم (DALI-2 / Push)', blank=True)
    dimmability_en = models.CharField(max_length=120, default='DALI-2 / Push Dim', blank=True)
    input_voltage = models.CharField(max_length=80, default='220-240V AC', blank=True)
    driver_location_fa = models.CharField(max_length=120, default='تعبیه‌شده در رزت سقفی', blank=True)
    driver_location_en = models.CharField(max_length=120, default='Built into canopy', blank=True)

    # 4. Compliance & Environment
    ip_rating = models.CharField(max_length=30, default='IP20', blank=True)
    insulation_class_fa = models.CharField(max_length=60, default='کلاس یک (Class I)', blank=True)
    insulation_class_en = models.CharField(max_length=60, default='Class I', blank=True)
    energy_class = models.CharField(max_length=20, default='A++', blank=True)

    # 5. Media & Downloads
    hero_image_url = models.CharField(max_length=500, default='/images/flos-prod-pendant.webp')
    gallery_images = models.JSONField(default=default_gallery_images, blank=True)
    dimension_diagram_url = models.CharField(max_length=500, default='/diagrams/linear-01.svg', blank=True)
    professional_downloads = models.JSONField(default=default_professional_downloads, blank=True)
    variants = models.JSONField(default=list, blank=True)

    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Product (محصول روشنایی)'
        verbose_name_plural = 'Products (محصولات روشنایی)'

    def __str__(self):
        return f"{self.sku} — {self.name_fa} ({self.name_en})"


class ArchitecturalProject(models.Model):
    slug = models.SlugField(unique=True)
    code = models.CharField(max_length=40, default='PRJ-TEH-01')
    title_fa = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    location_fa = models.CharField(max_length=120)
    location_en = models.CharField(max_length=120)
    architect_fa = models.CharField(max_length=150)
    architect_en = models.CharField(max_length=150)
    sector_fa = models.CharField(max_length=120)
    sector_en = models.CharField(max_length=120)
    year = models.PositiveIntegerField(default=2026)
    summary_fa = models.TextField()
    summary_en = models.TextField()
    description_fa = models.TextField(blank=True, default='')
    description_en = models.TextField(blank=True, default='')
    challenge_fa = models.TextField(blank=True, default='')
    challenge_en = models.TextField(blank=True, default='')
    solution_fa = models.TextField(blank=True, default='')
    solution_en = models.TextField(blank=True, default='')
    image_url = models.CharField(max_length=500)
    gallery_images = models.JSONField(default=list, blank=True)
    luminaires_used = models.JSONField(default=list)
    metrics_json = models.JSONField(default=dict)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Architectural Project (پروژه معماری)'
        verbose_name_plural = 'Architectural Projects (پروژه‌های معماری)'

    def __str__(self):
        return f"{self.title_fa} / {self.title_en}"


class NewsHighlight(models.Model):
    slug = models.SlugField(unique=True)
    category_fa = models.CharField(max_length=100)
    category_en = models.CharField(max_length=100)
    date_fa = models.CharField(max_length=80)
    date_en = models.CharField(max_length=80)
    title_fa = models.CharField(max_length=220)
    title_en = models.CharField(max_length=220)
    excerpt_fa = models.TextField()
    excerpt_en = models.TextField()
    image_url = models.CharField(max_length=500)
    location_badge_fa = models.CharField(max_length=120, blank=True)
    location_badge_en = models.CharField(max_length=120, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Exhibition & News (رویداد و خبر)'
        verbose_name_plural = 'Exhibitions & News (رویدادها و اخبار)'

    def __str__(self):
        return f"{self.title_fa} / {self.title_en}"


class ConsultationInquiry(models.Model):
    full_name = models.CharField(max_length=150)
    company_or_studio = models.CharField(max_length=150, blank=True)
    phone_or_email = models.CharField(max_length=150)
    project_type = models.CharField(max_length=100, default='Residential / Architectural')
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Consultation Inquiry (درخواست مشاوره)'
        verbose_name_plural = 'Consultation Inquiries (درخواست‌های مشاوره)'

    def __str__(self):
        return f"{self.full_name} ({self.phone_or_email})"

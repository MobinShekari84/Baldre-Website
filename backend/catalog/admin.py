from django.contrib import admin
from .models import Category, Product, ArchitecturalProject, NewsHighlight, ConsultationInquiry


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name_fa', 'name_en', 'slug', 'product_count', 'order')
    prepopulated_fields = {'slug': ('name_en',)}
    list_editable = ('product_count', 'order')
    search_fields = ('name_fa', 'name_en')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'sku', 'name_fa', 'name_en', 'category',
        'wattage_w', 'luminous_flux_lm', 'color_rendering_index_cri',
        'ip_rating', 'is_featured', 'order'
    )
    list_filter = ('category', 'is_featured', 'ip_rating', 'color_rendering_index_cri')
    search_fields = ('sku', 'name_fa', 'name_en', 'short_description_fa', 'short_description_en')
    list_editable = ('is_featured', 'order')
    prepopulated_fields = {'slug': ('name_en',)}
    fieldsets = (
        ('۱. هویت و معرفی محصول (Core Identity - Bilingual)', {
            'fields': (
                ('name_fa', 'name_en'),
                ('sku', 'slug', 'category'),
                ('designer_fa', 'designer_en', 'year'),
                'short_description_fa', 'short_description_en',
                'long_description_fa', 'long_description_en',
                ('is_featured', 'order'),
            )
        }),
        ('۲. مشخصات فیزیکی و متریال (Physical & Material Specs)', {
            'fields': (
                ('finish_color_fa', 'finish_color_en'),
                ('mounting_type_fa', 'mounting_type_en'),
                ('weight_kg', 'suspension_cable_max_mm'),
                'dimensions',
                ('materials_fa', 'materials_en'),
            )
        }),
        ('۳. مشخصات الکتریکی و فتومتریک (Electrical & Photometric)', {
            'fields': (
                ('light_source_fa', 'light_source_en'),
                ('wattage_w', 'luminous_flux_lm', 'beam_angle_degrees'),
                ('color_temperature_cct_fa', 'color_temperature_cct_en', 'color_rendering_index_cri'),
                ('dimmability_fa', 'dimmability_en'),
                ('input_voltage', 'driver_location_fa', 'driver_location_en'),
            )
        }),
        ('۴. استانداردها و محیط نصب (Compliance & IP)', {
            'fields': (
                ('ip_rating', 'energy_class'),
                ('insulation_class_fa', 'insulation_class_en'),
            )
        }),
        ('۵. تصاویر، فایل‌های فنی معماران و واریانت‌ها (Media, IES/CAD & Variants)', {
            'fields': (
                'hero_image_url',
                'gallery_images',
                'dimension_diagram_url',
                'professional_downloads',
                'variants',
            )
        }),
    )


@admin.register(ArchitecturalProject)
class ArchitecturalProjectAdmin(admin.ModelAdmin):
    list_display = ('code', 'title_fa', 'title_en', 'location_fa', 'architect_fa', 'year', 'order')
    list_editable = ('order',)
    search_fields = ('code', 'title_fa', 'title_en', 'location_fa', 'architect_fa')
    prepopulated_fields = {'slug': ('title_en',)}
    fieldsets = (
        ('۱. مشخصات هویتی و مکانی پروژه (Identity & Location)', {
            'fields': (
                ('code', 'slug', 'order'),
                ('title_fa', 'title_en'),
                ('location_fa', 'location_en'),
                ('architect_fa', 'architect_en'),
                ('sector_fa', 'sector_en', 'year'),
            )
        }),
        ('۲. متن معرفی، چالش معماری و راهکار نورپردازی (Editorial Narrative)', {
            'fields': (
                ('summary_fa', 'summary_en'),
                ('description_fa', 'description_en'),
                ('challenge_fa', 'challenge_en'),
                ('solution_fa', 'solution_en'),
            )
        }),
        ('۳. تصاویر، گالری و متریال (Media & Gallery)', {
            'fields': (
                'image_url',
                'gallery_images',
            ),
            'description': 'تمام تصاویر باید با فرمت .webp و در پوشه frontend/public/images/ باشند.'
        }),
        ('۴. چراغ‌های استفاده‌شده و شاخص‌های فنی (Luminaires & Technical Metrics)', {
            'fields': (
                'luminaires_used',
                'metrics_json',
            ),
            'description': 'کدهای SKU چراغ‌های به‌کاررفته در پروژه و شاخص‌های مساحت، CRI، CCT و پروتکل کنترل به صورت JSON.'
        }),
    )


@admin.register(NewsHighlight)
class NewsHighlightAdmin(admin.ModelAdmin):
    list_display = ('title_fa', 'title_en', 'category_fa', 'date_fa', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'slug': ('title_en',)}


@admin.register(ConsultationInquiry)
class ConsultationInquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company_or_studio', 'phone_or_email', 'project_type', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('full_name', 'company_or_studio', 'phone_or_email')

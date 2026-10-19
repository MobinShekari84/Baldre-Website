from rest_framework import serializers
from .models import Category, Product, ArchitecturalProject, NewsHighlight, ConsultationInquiry


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 'slug', 'name_fa', 'name_en',
            'subtitle_fa', 'subtitle_en', 'product_count',
            'image_url', 'order'
        ]


class ProductSerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_name_fa = serializers.CharField(source='category.name_fa', read_only=True)
    category_name_en = serializers.CharField(source='category.name_en', read_only=True)

    def to_representation(self, instance):
        """
        Formats product into the exact structured schema defined in
        data-templates/sample-product-template.json while also providing flat IDs.
        Safely normalizes JSON fields so products created/edited in Django Admin always work cleanly.
        """
        dims = instance.dimensions if isinstance(instance.dimensions, dict) else {}
        downloads = instance.professional_downloads if isinstance(instance.professional_downloads, dict) else {}
        gallery = instance.gallery_images if isinstance(instance.gallery_images, list) and instance.gallery_images else [instance.hero_image_url]
        mats_en = instance.materials_en if isinstance(instance.materials_en, list) and instance.materials_en else ["Brushed Brass", "Anodized Aluminum"]
        mats_fa = instance.materials_fa if isinstance(instance.materials_fa, list) and instance.materials_fa else ["برنج برس‌خورده", "آلومینیوم آنودایز"]
        variants_list = instance.variants if isinstance(instance.variants, list) and instance.variants else [
            {
                "name_fa": instance.finish_color_fa or "فینیش استاندارد",
                "name_en": instance.finish_color_en or "Standard Finish",
                "sku": instance.sku,
                "finish_color_fa": instance.finish_color_fa or "استاندارد",
                "finish_color_en": instance.finish_color_en or "Standard",
                "hex": "#C5A059",
                "hero_image_url": instance.hero_image_url,
            }
        ]

        return {
            "id": instance.id,
            "slug": instance.slug,
            "sku": instance.sku,
            "category_slug": instance.category.slug,
            "identity": {
                "name_en": instance.name_en,
                "name_fa": instance.name_fa,
                "sku": instance.sku,
                "slug": instance.slug,
                "category": instance.category.name_en,
                "category_fa": instance.category.name_fa,
                "category_slug": instance.category.slug,
                "designer_en": instance.designer_en or "Baldre Design Studio",
                "designer_fa": instance.designer_fa or "استودیو طراحی بالدر",
                "year": instance.year or 2026,
                "short_description_en": instance.short_description_en,
                "short_description_fa": instance.short_description_fa,
                "long_description_en": instance.long_description_en or instance.short_description_en,
                "long_description_fa": instance.long_description_fa or instance.short_description_fa,
            },
            "physical_specs": {
                "materials_en": mats_en,
                "materials_fa": mats_fa,
                "finish_color_en": instance.finish_color_en or "Standard Finish",
                "finish_color_fa": instance.finish_color_fa or "فینیش استاندارد",
                "dimensions": {
                    "length_mm": dims.get("length_mm", 600),
                    "width_mm": dims.get("width_mm", 60),
                    "height_mm": dims.get("height_mm", 80),
                },
                "weight_kg": instance.weight_kg,
                "suspension_cable_max_mm": instance.suspension_cable_max_mm,
                "mounting_type_en": instance.mounting_type_en or "Architectural Mounting",
                "mounting_type_fa": instance.mounting_type_fa or "نصب معماری",
            },
            "electrical_and_lighting": {
                "light_source_en": instance.light_source_en or "Integrated LED",
                "light_source_fa": instance.light_source_fa or "ال‌ای‌دی یکپارچه",
                "wattage_w": instance.wattage_w,
                "luminous_flux_lm": instance.luminous_flux_lm,
                "color_temperature_cct_en": instance.color_temperature_cct_en or "3000K Warm White",
                "color_temperature_cct_fa": instance.color_temperature_cct_fa or "3000K سفید گرم",
                "color_rendering_index_cri": instance.color_rendering_index_cri or ">95",
                "beam_angle_degrees": instance.beam_angle_degrees,
                "dimmability_en": instance.dimmability_en or "DALI-2 / Push Dim",
                "dimmability_fa": instance.dimmability_fa or "دالی ۲ / پوش دیم",
                "input_voltage": instance.input_voltage or "220-240V AC",
                "driver_location_en": instance.driver_location_en or "Built into canopy",
                "driver_location_fa": instance.driver_location_fa or "تعبیه‌شده در رزت",
            },
            "compliance": {
                "ip_rating": instance.ip_rating or "IP20",
                "insulation_class_en": instance.insulation_class_en or "Class I",
                "insulation_class_fa": instance.insulation_class_fa or "کلاس یک (Class I)",
                "energy_class": instance.energy_class or "A++",
            },
            "media": {
                "hero_image_url": instance.hero_image_url or "/images/flos-prod-pendant.webp",
                "gallery_images": gallery,
                "dimension_diagram_url": instance.dimension_diagram_url or "/diagrams/linear-01.svg",
            },
            "professional_downloads": {
                "data_sheet_pdf": downloads.get("data_sheet_pdf", "/downloads/Baldre-2026-Catalogue.pdf"),
                "installation_manual_pdf_fa": downloads.get("installation_manual_pdf_fa", "/downloads/Baldre-2026-Catalogue.pdf"),
                "installation_manual_pdf_en": downloads.get("installation_manual_pdf_en", "/downloads/Baldre-2026-Catalogue.pdf"),
                "photometric_ies_file": downloads.get("photometric_ies_file", "/downloads/BAL-LS-01-Photometric.ies"),
                "cad_3d_file": downloads.get("cad_3d_file", "/downloads/BAL-LS-01-3DModel.step"),
            },
            "variants": variants_list,
        }

    class Meta:
        model = Product
        fields = '__all__'


class ArchitecturalProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitecturalProject
        fields = '__all__'


class NewsHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsHighlight
        fields = '__all__'


class ConsultationInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationInquiry
        fields = ['id', 'full_name', 'company_or_studio', 'phone_or_email', 'project_type', 'message', 'created_at']

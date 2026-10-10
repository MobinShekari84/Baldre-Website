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
        """
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
                "designer_en": instance.designer_en,
                "designer_fa": instance.designer_fa,
                "year": instance.year,
                "short_description_en": instance.short_description_en,
                "short_description_fa": instance.short_description_fa,
                "long_description_en": instance.long_description_en,
                "long_description_fa": instance.long_description_fa,
            },
            "physical_specs": {
                "materials_en": instance.materials_en,
                "materials_fa": instance.materials_fa,
                "finish_color_en": instance.finish_color_en,
                "finish_color_fa": instance.finish_color_fa,
                "dimensions": instance.dimensions,
                "weight_kg": instance.weight_kg,
                "suspension_cable_max_mm": instance.suspension_cable_max_mm,
                "mounting_type_en": instance.mounting_type_en,
                "mounting_type_fa": instance.mounting_type_fa,
            },
            "electrical_and_lighting": {
                "light_source_en": instance.light_source_en,
                "light_source_fa": instance.light_source_fa,
                "wattage_w": instance.wattage_w,
                "luminous_flux_lm": instance.luminous_flux_lm,
                "color_temperature_cct_en": instance.color_temperature_cct_en,
                "color_temperature_cct_fa": instance.color_temperature_cct_fa,
                "color_rendering_index_cri": instance.color_rendering_index_cri,
                "beam_angle_degrees": instance.beam_angle_degrees,
                "dimmability_en": instance.dimmability_en,
                "dimmability_fa": instance.dimmability_fa,
                "input_voltage": instance.input_voltage,
                "driver_location_en": instance.driver_location_en,
                "driver_location_fa": instance.driver_location_fa,
            },
            "compliance": {
                "ip_rating": instance.ip_rating,
                "insulation_class_en": instance.insulation_class_en,
                "insulation_class_fa": instance.insulation_class_fa,
                "energy_class": instance.energy_class,
            },
            "media": {
                "hero_image_url": instance.hero_image_url,
                "gallery_images": instance.gallery_images,
                "dimension_diagram_url": instance.dimension_diagram_url,
            },
            "professional_downloads": instance.professional_downloads,
            "variants": instance.variants,
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

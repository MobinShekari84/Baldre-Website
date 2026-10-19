from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Product, ArchitecturalProject, NewsHighlight, ConsultationInquiry
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ArchitecturalProjectSerializer,
    NewsHighlightSerializer,
    ConsultationInquirySerializer,
)


class HomepageDataAPIView(APIView):
    """
    Single consolidated endpoint for the Next.js Homepage.
    Returns Categories, Featured Products (matching sample-product-template.json),
    Architectural Projects, News/Exhibitions, and Catalog Telemetry.
    """
    def get(self, request):
        categories = Category.objects.all()
        products = Product.objects.select_related('category').all()
        projects = ArchitecturalProject.objects.all()
        news = NewsHighlight.objects.all()

        return Response({
            "brand": {
                "name_en": "BALDRE",
                "name_fa": "بالدر",
                "origin_en": "Tehran Architectural Lighting Studio",
                "origin_fa": "استودیو مهندسی و طراحی روشنایی معماری تهران",
                "catalog_total_count": 284,
                "cri_standard": "CRI >95",
                "warranty_years": 5,
            },
            "categories": CategorySerializer(categories, many=True).data,
            "products": ProductSerializer(products, many=True).data,
            "projects": ArchitecturalProjectSerializer(projects, many=True).data,
            "news": NewsHighlightSerializer(news, many=True).data,
        })


class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.select_related('category').all()
        category = self.request.query_params.get('category')
        if category and category != 'all':
            qs = qs.filter(category__slug=category)
        return qs


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


class ProjectListAPIView(generics.ListAPIView):
    queryset = ArchitecturalProject.objects.all()
    serializer_class = ArchitecturalProjectSerializer


class ProjectDetailAPIView(generics.RetrieveAPIView):
    queryset = ArchitecturalProject.objects.all()
    serializer_class = ArchitecturalProjectSerializer
    lookup_field = 'slug'


class NewsListAPIView(generics.ListAPIView):
    queryset = NewsHighlight.objects.all()
    serializer_class = NewsHighlightSerializer


class ConsultationInquiryAPIView(generics.CreateAPIView):
    queryset = ConsultationInquiry.objects.all()
    serializer_class = ConsultationInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "status": "ok",
                "message_fa": "درخواست مشاوره نورپردازی شما با موفقیت در سیستم بالدر ثبت شد.",
                "message_en": "Your architectural lighting consultation request has been registered.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

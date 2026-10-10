from django.contrib import admin
from django.urls import path
from catalog.views import (
    HomepageDataAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    ProjectListAPIView,
    NewsListAPIView,
    ConsultationInquiryAPIView,
)

admin.site.site_header = "Baldre Lighting — پنل مدیریت جامع بالدر"
admin.site.site_title = "Baldre Lighting Admin"
admin.site.index_title = "مدیریت کاتالوگ محصولات، پروژه‌های معماری و اخبار"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/homepage/', HomepageDataAPIView.as_view(), name='api-homepage'),
    path('api/products/', ProductListAPIView.as_view(), name='api-products'),
    path('api/products/<slug:slug>/', ProductDetailAPIView.as_view(), name='api-product-detail'),
    path('api/projects/', ProjectListAPIView.as_view(), name='api-projects'),
    path('api/news/', NewsListAPIView.as_view(), name='api-news'),
    path('api/inquiries/', ConsultationInquiryAPIView.as_view(), name='api-inquiries'),
]

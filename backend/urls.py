from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, RegisterView, logout_view, ProfileView, change_password, forgot_password, VerifyEmailView , ResetPasswordView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    # path('auth/login/', login_view, name='login'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/change-password/', change_password, name='change_password'),
    path('auth/forgot-password/', forgot_password, name='forgot_password'),
    path('auth/verify-email/<str:token>/', VerifyEmailView.as_view(), name='verify_email'),
    path('auth/reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('auth/refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
] 
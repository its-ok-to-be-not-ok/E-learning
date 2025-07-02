from django.conf import settings
from django.urls import reverse
from django.utils import timezone
import uuid

from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Course, User
from .serializers import CourseSerializer, UserSerializer
from django.core.mail import send_mail
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


# Course ViewSet
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer

# Register View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(is_active=False, is_verified=False)

        # Sinh token xác thực và hạn dùng (ví dụ: 24h)
        verification_token = str(uuid.uuid4())
        user.verification_token = verification_token
        user.verification_token_expires_at = timezone.now() + timezone.timedelta(hours=24)
        user.save()

        # Link xác thực email trỏ về frontend
        FRONTEND_URL = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
        verification_url = f"{FRONTEND_URL}/verify-email/{verification_token}"

        send_mail(
            subject=f'[{settings.COMPANY_NAME}] Xác nhận đăng ký tài khoản',
            message=(
                f'Chào {user.username},\n\n'
                f'Vui lòng nhấn vào link sau để xác nhận email:\n{verification_url}\n\n'
                f'Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.\n\n'
                f'Trân trọng,\n{settings.COMPANY_NAME}'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response(
            {
                "detail": "Vui lòng kiểm tra email để xác nhận tài khoản.",
                "access": access_token,
                "refresh": refresh_token
            },
            status=status.HTTP_201_CREATED
        )

# Verify Email View
class VerifyEmailView(APIView):
    def get(self, request, token):
        try:
            user = User.objects.get(verification_token=token)
            # Kiểm tra token hết hạn
            if user.verification_token_expires_at and user.verification_token_expires_at < timezone.now():
                return Response({"detail": "Token đã hết hạn."}, status=400)
            user.is_verified = True
            user.verification_token = None
            user.verification_token_expires_at = None
            user.save()

            # Tạo JWT (access/refresh token) cho user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                "detail": "Xác nhận email thành công. Tài khoản đã được kích hoạt.",
                "access": access_token,
                "refresh": refresh_token
            })
        except User.DoesNotExist:
            return Response({"detail": "Token không hợp lệ hoặc đã được sử dụng."}, status=400)
       


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)

# Profile
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Change Password
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    if user.password_hash != old_password:
        return Response({'error': 'Mật khẩu cũ không đúng.'}, status=status.HTTP_400_BAD_REQUEST)
    user.password_hash = new_password  # Đã hash ở serializer
    user.save()
    return Response({'message': 'Đổi mật khẩu thành công.'}, status=status.HTTP_200_OK)

# Forgot Password (Gửi email reset password)
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        reset_token = str(uuid.uuid4())
        user.reset_password_token = reset_token
        user.reset_password_token_expires_at = timezone.now() + timezone.timedelta(hours=1)
        user.save()

        reset_url = request.build_absolute_uri(
            reverse('reset_password', kwargs={'token': reset_token})
        )

        send_mail(
            subject=f'[{settings.COMPANY_NAME}] Đặt lại mật khẩu',
            message=f'Chào {user.username},\n\nVui lòng nhấn vào link sau để đặt lại mật khẩu (có hiệu lực trong 1 giờ):\n{reset_url}\n\nTrân trọng,\n{settings.COMPANY_NAME}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({'message': 'Đã gửi link đặt lại mật khẩu tới email.'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'Không tìm thấy tài khoản với email này.'}, status=status.HTTP_400_BAD_REQUEST)

# Reset Password View
class ResetPasswordView(APIView):
    def post(self, request, token):
        new_password = request.data.get('new_password')
        if not new_password:
            return Response({'error': 'Thiếu mật khẩu mới.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(reset_password_token=token)
            # Kiểm tra token hết hạn
            if user.reset_password_token_expires_at and user.reset_password_token_expires_at < timezone.now():
                return Response({'error': 'Token đã hết hạn.'}, status=status.HTTP_400_BAD_REQUEST)
            user.password_hash = new_password  # Đã hash ở serializer
            user.reset_password_token = None
            user.reset_password_token_expires_at = None
            user.save()
            return Response({'message': 'Đặt lại mật khẩu thành công.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Token không hợp lệ hoặc đã được sử dụng.'}, status=status.HTTP_400_BAD_REQUEST)

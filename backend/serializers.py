from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import (
    User, Teacher, Course, Enrollment, Assignment, AssignmentResult, Comment, Payment, Invoice, GroupChatRoom, GroupChatMessage, Module,
    Lesson, StudentSubmission, CourseStat, Review, TeacherStats, GroupChatRoom, GroupChatMessage, Module
)
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Kiểm tra trạng thái user
        # if not user.is_active:
        #     raise serializers.ValidationError('Tài khoản đã bị khoá hoặc chưa xác thực email.')
        if not user.is_verified:
            raise serializers.ValidationError('Vui lòng xác thực email trước khi đăng nhập.')

        data['username'] = user.username
        data['email'] = user.email
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email đã được sử dụng.")]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Username đã tồn tại.")]
    )
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'full_name', 'phone',
            'date_of_birth', 'gender', 'avatar_url', 'address', 'role'
        ]

    def create(self, validated_data):
        validated_data['password_hash'] = make_password(validated_data.pop('password'))
        return User.objects.create(**validated_data)



class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class TeacherStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherStats
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseStat
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class AssignmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentResult
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

class GroupChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChatRoom
        fields = '__all__'

class GroupChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupChatMessage
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class StudentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSubmission
        fields = '__all__' 
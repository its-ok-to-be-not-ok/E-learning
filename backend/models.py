from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=50, blank=True)
    avatar_url = models.URLField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    reset_password_token = models.CharField(max_length=255, null=True, blank=True)
    reset_password_token_expires_at = models.DateTimeField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, null=True, blank=True)
    verification_token_expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    introduction = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    result = models.TextField(blank=True)
    category = models.CharField(max_length=255, blank = True)
    level = models.CharField(max_length=255, blank = True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class Enrollment(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    final_score = models.FloatField()
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'course')  # Đảm bảo mỗi user chỉ đăng ký 1 lần cho 1 course

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.title}"

class TeacherStats(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE)
    course_count = models.IntegerField(default=0)
    student_count = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return f"Stats for {self.teacher.name}"

class CourseStat(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    enrollments = models.IntegerField(default=0)

    def __str__(self):
        return f"Stats for {self.course.title}"

class Review(models.Model):
    course_stat = models.ForeignKey(CourseStat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.course_stat.course.title}"


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class AssignmentResult(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    score = models.FloatField()
    teacher_comment = models.TextField(blank=True)
    student_file_url = models.URLField(blank=True)
    submitted_at = models.DateTimeField()

    def __str__(self):
        return f"Result for {self.assignment.name} in {self.enrollment.course.title}"


class Comment(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.assignment.name}"

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=255, blank=True)
    paypal_order_id = models.CharField(max_length=255, blank=True)
    paypal_payer_id = models.CharField(max_length=255, blank=True)
    paypal_payment_time = models.DateTimeField(null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True)
    currency = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment by {self.user.username} - {self.amount} {self.currency}"

class Invoice(models.Model):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE)
    issued_at = models.DateTimeField()
    due_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)
    invoice_url = models.URLField(blank=True)

    def __str__(self):
        return f"Invoice for {self.payment.user.username} - {self.total_amount} {self.payment.currency}"

class GroupChatRoom(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class GroupChatMessage(models.Model):
    room = models.ForeignKey(GroupChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    attachment_url = models.URLField(blank=True)

    def __str__(self):
        return f"Message by {self.user.username} in {self.room.title}"

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    position = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    position = models.IntegerField()
    video_url = models.URLField(blank=True)
    quiz_json = models.TextField(blank=True)
    assignment_doc_url = models.URLField(blank=True)
    weight = models.FloatField()
    open_at = models.DateTimeField()
    due_at = models.DateTimeField()
    duration = models.IntegerField()
    description = models.TextField(blank=True)
    doc_content_json = models.TextField(blank=True)
    max_score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class StudentSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    assignment_file_url = models.URLField(blank=True)
    quiz_answers_json = models.TextField(blank=True)
    score = models.FloatField()
    teacher_comment = models.TextField(blank=True)
    submitted_at = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Submission by {self.user.username} for {self.lesson.title}"

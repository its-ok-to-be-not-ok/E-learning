from django.db import models

# Create your models here.

class Course(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
